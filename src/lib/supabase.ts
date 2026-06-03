import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getStaticUsers } from "@/lib/auth";

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SUPABASE_SRV  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * Server-side admin client (bypasses RLS).
 * Used inside API routes only.
 * Returns null if credentials aren't configured yet — callers should fall back to mock data.
 */
export function getServerSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SRV) return null;
  return createClient(SUPABASE_URL, SUPABASE_SRV, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Browser/anon client — safe to expose. Used from client components if needed.
 */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON);
}

/**
 * Quick check used by API routes to decide between Supabase and mock data.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SRV);
}

/* ── ID generators (UUID-friendly prefixes) ──────────────────────── */
export async function nextLeadId(supabase: SupabaseClient): Promise<string> {
  const { count } = await supabase.from("leads").select("*", { count: "exact", head: true });
  return `NGL${String((count ?? 0) + 1).padStart(5, "0")}`;
}

export async function nextQuotationId(supabase: SupabaseClient): Promise<string> {
  const { count } = await supabase.from("quotations").select("*", { count: "exact", head: true });
  const year = new Date().getFullYear().toString().slice(2);
  return `NGQ${year}${String((count ?? 0) + 1).padStart(4, "0")}`;
}

export async function nextTicketId(supabase: SupabaseClient): Promise<string> {
  const { count } = await supabase.from("tickets").select("*", { count: "exact", head: true });
  return `NGT${String((count ?? 0) + 1).padStart(5, "0")}`;
}

/* ── Auto-assignment ─────────────────────────────────────────────────
   Pick the active telecaller with the fewest currently-open leads.
   Fallback: round-robin by created_at if Supabase unavailable.
   ──────────────────────────────────────────────────────────────────── */
export async function pickNextTelecaller(supabase: SupabaseClient | null): Promise<{ id: string; name: string } | null> {
  const telecallers = getStaticUsers().filter(
    (u) => u.role === "telecaller" && u.isActive
  );
  if (telecallers.length === 0) return null;

  // No Supabase yet — round-robin via current minute
  if (!supabase) {
    const idx = Math.floor(Date.now() / 60_000) % telecallers.length;
    return { id: telecallers[idx]._id, name: telecallers[idx].name };
  }

  // With DB — assign to whoever has fewest open leads
  const counts = await Promise.all(
    telecallers.map(async (tc) => {
      const { count } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("assigned_to", tc._id)
        .in("status", ["new", "assigned", "follow_up", "interested", "negotiation"]);
      return { id: tc._id, name: tc.name, count: count ?? 0 };
    })
  );

  counts.sort((a, b) => a.count - b.count);
  return { id: counts[0].id, name: counts[0].name };
}

/* ── Activity logger ─────────────────────────────────────────────── */
export async function logActivity(data: {
  type: string;
  description: string;
  entityType: "lead" | "quotation" | "ticket" | "user";
  entityId: string;
  entityName?: string;
  performedBy: string;
  performedByName: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const supabase = getServerSupabase();
  if (!supabase) return;
  try {
    await supabase.from("activities").insert({
      type:               data.type,
      description:        data.description,
      entity_type:        data.entityType,
      entity_id:          data.entityId,
      entity_name:        data.entityName ?? "",
      performed_by:       data.performedBy,
      performed_by_name:  data.performedByName,
      metadata:           data.metadata ?? {},
    });
  } catch {
    /* non-critical */
  }
}
