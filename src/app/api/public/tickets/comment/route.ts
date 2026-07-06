import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, logActivity } from "@/lib/supabase";
import { sendEmail, ticketCommentAdminNotificationTemplate } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const body = await req.json();

    const { ticketId, content } = body;

    if (!ticketId || !content || !content.trim()) {
      return NextResponse.json({ error: "Ticket ID and comment content are required" }, { status: 400 });
    }

    // 1. Fetch current ticket
    const { data: ticket, error: fetchErr } = await supabase
      .from("tickets")
      .select("*")
      .eq("ticket_id", ticketId)
      .maybeSingle();

    if (fetchErr || !ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // 2. Append new public comment
    const newComment = {
      id: crypto.randomUUID(),
      content: content.trim(),
      isInternal: false,
      createdBy: "client",
      createdByName: "Client (Chatbot)",
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...((ticket.comments as unknown[]) ?? []), newComment];

    const { data: updatedTicket, error: updateErr } = await supabase
      .from("tickets")
      .update({ comments: updatedComments })
      .eq("id", ticket.id)
      .select()
      .single();

    if (updateErr || !updatedTicket) {
      return NextResponse.json({ error: updateErr?.message || "Failed to add comment" }, { status: 500 });
    }

    // 3. Log Activity
    await logActivity({
      type: "ticket_updated",
      description: `Client added comment on Ticket ${ticketId}: "${content.substring(0, 30)}..."`,
      entityType: "ticket",
      entityId: ticket.id,
      entityName: ticketId,
      performedBy: "client",
      performedByName: "Client (Chatbot)",
    });

    // 4. Send Email Notification to Admin
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
      sendEmail({
        to: process.env.PDF_COMPANY_EMAIL || process.env.MAIL_USER,
        subject: `[ALERT] New Client Comment on Ticket ${ticketId}`,
        html: ticketCommentAdminNotificationTemplate(ticketId, ticket.title, content),
      }).catch((err) => console.error("[tickets/comment] Admin comment notification failed:", err));
    }

    return NextResponse.json({
      success: true,
      comment: newComment,
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
