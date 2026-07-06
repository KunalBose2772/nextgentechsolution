import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, nextTicketId, logActivity } from "@/lib/supabase";
import { sendEmail, ticketClientConfirmationTemplate, ticketAdminNotificationTemplate } from "@/lib/email";

export const dynamic = "force-dynamic";

// ── GET /api/public/tickets ──
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get("id")?.trim();

  if (!ticketId) {
    return NextResponse.json({ error: "Ticket ID is required" }, { status: 400 });
  }

  const supabase = getServerSupabase()!;
  const { data: ticket, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("ticket_id", ticketId)
    .maybeSingle();

  if (error || !ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  // Filter out internal comments to protect admin-only discussion
  const publicComments = (ticket.comments || []).filter((c: any) => !c.isInternal);

  return NextResponse.json({
    success: true,
    data: {
      id: ticket.id,
      ticketId: ticket.ticket_id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      category: ticket.category,
      createdAt: ticket.created_at,
      updatedAt: ticket.updated_at,
      comments: publicComments,
    }
  });
}

// ── POST /api/public/tickets ──
export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const body = await req.json();

    const { trackingId, title, description, category } = body;

    if (!trackingId || !title || !description) {
      return NextResponse.json({ error: "Tracking ID, title, and description are required" }, { status: 400 });
    }

    // 1. Resolve lead_id from Project ID, Lead ID, or email
    let leadId: string | null = null;
    let clientName = "Client (Chatbot)";
    let clientEmail = "";

    // Try finding lead directly by lead_id or email
    let leadQuery = supabase.from("leads").select("id, name, email");
    if (trackingId.includes("@")) {
      leadQuery = leadQuery.eq("email", trackingId.trim().toLowerCase());
    } else if (trackingId.startsWith("NGL")) {
      leadQuery = leadQuery.eq("lead_id", trackingId.trim());
    }
    const { data: lead } = await leadQuery.maybeSingle();

    if (lead) {
      leadId = lead.id;
      clientName = lead.name;
      clientEmail = lead.email || "";
    } else {
      // Try finding project by project_id
      const { data: project } = await supabase
        .from("projects")
        .select("lead_id, client")
        .eq("project_id", trackingId.trim())
        .maybeSingle();
      if (project) {
        leadId = project.lead_id;
        clientName = project.client;

        if (project.lead_id) {
          const { data: l } = await supabase
            .from("leads")
            .select("email")
            .eq("id", project.lead_id)
            .maybeSingle();
          if (l) {
            clientEmail = l.email || "";
          }
        }
      }
    }

    if (!leadId) {
      return NextResponse.json({ error: "Invalid Project ID, Lead ID, or Email. Could not link ticket." }, { status: 400 });
    }

    // 2. Generate unique Ticket ID
    const ticketId = await nextTicketId(supabase);

    // 3. Create Ticket
    const { data: ticket, error: insertErr } = await supabase
      .from("tickets")
      .insert({
        ticket_id:   ticketId,
        title:       title,
        description: description,
        status:      "open",
        priority:    "medium",
        category:    category || "general",
        lead_id:     leadId,
        created_by:  "chatbot",
        comments:    [],
      })
      .select()
      .single();

    if (insertErr || !ticket) {
      return NextResponse.json({ error: insertErr?.message || "Failed to create ticket" }, { status: 500 });
    }

    // 4. Log Activity
    await logActivity({
      type: "ticket_created",
      description: `Support Ticket ${ticketId} raised by Client via chatbot: "${title}"`,
      entityType: "ticket",
      entityId: ticket.id,
      entityName: ticketId,
      performedBy: "chatbot",
      performedByName: clientName,
    });

    // 5. Send Email Notifications
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
      // Send confirmation to client
      if (clientEmail) {
        sendEmail({
          to: clientEmail,
          subject: `Support Ticket Created: ${ticketId} - ${title}`,
          html: ticketClientConfirmationTemplate(clientName, ticketId, title, description, category || "general"),
        }).catch((err) => console.error("[tickets] Client confirmation email failed:", err));
      }

      // Send alert to admin
      sendEmail({
        to: process.env.PDF_COMPANY_EMAIL || process.env.MAIL_USER,
        subject: `[ALERT] New Support Ticket Raised: ${ticketId}`,
        html: ticketAdminNotificationTemplate(clientName, clientEmail || trackingId, ticketId, title, description, category || "general"),
      }).catch((err) => console.error("[tickets] Admin ticket alert email failed:", err));
    }

    return NextResponse.json({
      success: true,
      data: {
        ticketId: ticket.ticket_id,
        title: ticket.title,
        status: ticket.status,
      }
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
