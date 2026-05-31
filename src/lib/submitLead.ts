// Lead submission → APEX's own GoHighLevel (GHL) CRM.
//
// This site is a fully static export (no server, no API routes), so lead
// capture happens with a plain client-side fetch. We POST straight to a GHL
// **Inbound Webhook** trigger URL — the one CRM intake endpoint that is safe to
// call from public browser code:
//
//   • It is write-only (it can only *start* a workflow, never read data), so
//     unlike a Private Integration Token it is NOT a secret. Shipping it in the
//     static JS bundle leaks nothing sensitive.
//   • No backend to host, no third-party form service, no cost.
//   • Inside GHL, a workflow with the "Inbound Webhook" trigger maps the JSON
//     below onto a Create/Update Contact action, lands the lead in the
//     sub-account, tags it `website-lead`, and can notify / route from there.
//
// GHL account: sub-account (location) `fI4ba5dh9bm1yEkD4ZRn` — "Lead
// Qualification" under Apex Revenue Operations. The PIT token used by the
// Readymode↔GHL bridge is deliberately NOT used here (it must never reach the
// browser).
//
// SETUP — get the URL (one time, GHL UI; workflows can't be made via the API):
//   1. app.gohighlevel.com → the APEX sub-account → Automation → Workflows
//   2. + Create Workflow → Start from Scratch
//   3. Add Trigger → "Inbound Webhook" → Save. Copy the generated URL.
//   4. Paste it into GHL_INBOUND_WEBHOOK_URL below.
//   5. Add action "Create/Update Contact" and map fields from the request, e.g.
//        First Name   = {{inboundWebhookRequest.firstName}}
//        Last Name    = {{inboundWebhookRequest.lastName}}
//        Email        = {{inboundWebhookRequest.email}}
//        Phone        = {{inboundWebhookRequest.phone}}
//        Company Name = {{inboundWebhookRequest.companyName}}
//        Source       = {{inboundWebhookRequest.source}}
//        Tags         = website-lead
//      and write {{inboundWebhookRequest.notes}} to the contact notes/a field.
//   6. Publish the workflow.

// The GHL-generated inbound webhook URL. Looks like:
//   https://services.leadconnectorhq.com/hooks/<locationId>/webhook-trigger/<uuid>
// Empty string = not configured yet → submitLead reports a clean failure and
// the form components fall back to their mailto: draft so no lead is lost.
const GHL_INBOUND_WEBHOOK_URL = "";

// Tag every website lead so they are filterable inside GHL.
const WEBSITE_LEAD_TAG = "website-lead";

export type LeadPayload = {
  /** Full name (required). Split into first/last for GHL. */
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  /** Prospect's industry/vertical. */
  industry?: string;
  monthlyLeads?: string;
  /** Discriminator, e.g. "apex_website" / "apex_diagnostic". */
  source: string;
  /** Extra labelled fields folded into the lead notes, in order. */
  extra?: Array<[label: string, value: string | undefined | null]>;
  /** Free-form trailing note from the visitor. */
  notes?: string;
};

export type LeadResult = { ok: boolean; id?: string; error?: string };

/** Split a free-typed full name into GHL's firstName / lastName. */
function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/**
 * Pull marketing attribution from the current URL + document so GHL can tie the
 * lead back to its campaign. Returns undefined when no ad params are present.
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
    first_touch_channel: adFields.utm_source || "website",
    landing_page_url: window.location.href,
    landing_referrer: document.referrer || "",
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
 * Submit a lead to APEX's GoHighLevel via its inbound webhook. Resolves with
 * { ok: true } on success, or { ok: false, error } on any failure — callers
 * fall back to a mailto: draft so a lead is never silently lost.
 *
 * Note: a GHL inbound webhook returns 200 with no contact id, so on success we
 * resolve { ok: true } without an id (the id lives in GHL).
 */
export async function submitLead(lead: LeadPayload): Promise<LeadResult> {
  if (!GHL_INBOUND_WEBHOOK_URL) {
    return { ok: false, error: "CRM webhook not configured" };
  }

  const { firstName, lastName } = splitName(lead.name);

  try {
    const res = await fetch(GHL_INBOUND_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        fullName: lead.name,
        email: lead.email,
        phone: lead.phone || "",
        companyName: lead.company || "",
        role: lead.role || "",
        industry: lead.industry || "",
        monthlyLeads: lead.monthlyLeads || "",
        source: lead.source,
        tags: WEBSITE_LEAD_TAG,
        notes: buildNotes(lead),
        attribution: captureAttribution(),
      }),
    });

    if (res.ok) {
      return { ok: true };
    }
    return { ok: false, error: `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
