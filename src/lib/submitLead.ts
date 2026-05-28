// Lead submission → mCRM (OperateOS) public CRM webhook.
//
// This site is a fully static export (no server, no API routes), so lead
// capture happens with a plain client-side fetch straight to the CRM's own
// public intake function. No third-party form service, no backend to host,
// and the lead lands in the CRM `Lead` pipeline within ~1s with stage "new".
//
// The endpoint is the `crmWebhook` backend function of the Base44 app
// `operate-os` (appId 6948d8853cd6a99247757ec6). It is intentionally public
// (CORS open, open-POST webhook auth) and exposes a `create_lead` action.

const CRM_WEBHOOK_URL =
  "https://base44.app/api/apps/6948d8853cd6a99247757ec6/functions/crmWebhook";

// Discriminator written to the lead's source_channel so APEX website leads
// are filterable in the CRM, and a brand tag so they group under APEX.
const BRAND_ID = "APEX";

export type LeadPayload = {
  /** Full name (required by the CRM unless a phone is given). */
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  /** Maps to the lead's service_type in the CRM. */
  industry?: string;
  monthlyLeads?: string;
  /** source_channel discriminator, e.g. "apex_website" / "apex_diagnostic". */
  source: string;
  /** Extra labelled fields folded into the lead notes, in order. */
  extra?: Array<[label: string, value: string | undefined | null]>;
  /** Free-form trailing note from the visitor. */
  notes?: string;
};

export type LeadResult = { ok: boolean; id?: string; error?: string };

/**
 * Pull marketing attribution from the current URL + document so the CRM can
 * tie the lead back to its campaign. Returns undefined when there's nothing
 * worth sending (no ad params present) — we still always include the landing
 * context when any ad param exists.
 */
function captureAttribution(): Record<string, string> | undefined {
  if (typeof window === "undefined") return undefined;

  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k) || undefined;

  const adFields: Record<string, string | undefined> = {
    gclid: get("gclid"),
    wbraid: get("wbraid"),
    gbraid: get("gbraid"),
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
  };

  const hasAdSignal = Object.values(adFields).some(Boolean);
  if (!hasAdSignal) return undefined;

  const attribution: Record<string, string> = {
    brand_id: BRAND_ID,
    first_touch_channel: adFields.utm_source || "website",
    landing_page_url: window.location.href,
    landing_referrer: document.referrer || "",
    landing_user_agent: navigator.userAgent || "",
  };
  for (const [key, value] of Object.entries(adFields)) {
    if (value) attribution[key] = value;
  }
  return attribution;
}

function buildNotes(lead: LeadPayload): string {
  const lines: string[] = [];
  if (lead.company) lines.push(`Company: ${lead.company}`);
  if (lead.role) lines.push(`Role: ${lead.role}`);
  if (lead.monthlyLeads) lines.push(`Monthly leads (approx): ${lead.monthlyLeads}`);
  if (lead.industry) lines.push(`Industry: ${lead.industry}`);
  for (const [label, value] of lead.extra ?? []) {
    if (value) lines.push(`${label}: ${value}`);
  }
  if (lead.notes) {
    if (lines.length) lines.push("");
    lines.push(lead.notes);
  }
  return lines.join("\n");
}

/**
 * Submit a lead to the CRM. Resolves with { ok: true, id } on success, or
 * { ok: false, error } on any failure — callers should fall back to a mailto:
 * draft so a lead is never silently lost.
 */
export async function submitLead(lead: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_lead",
        name: lead.name,
        email: lead.email,
        phone: lead.phone || "",
        service_needed: lead.industry || "",
        source: lead.source,
        brand_id: BRAND_ID,
        notes: buildNotes(lead),
        google_ads_attribution: captureAttribution(),
      }),
    });

    const json: { success?: boolean; data?: { id?: string }; error?: string } | null =
      await res.json().catch(() => null);

    if (res.ok && json?.success) {
      return { ok: true, id: json.data?.id };
    }
    return { ok: false, error: json?.error || `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
