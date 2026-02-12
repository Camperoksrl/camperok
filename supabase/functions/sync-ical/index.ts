import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ICalEvent {
  summary: string;
  dtstart: string;
  dtend: string;
  uid: string;
}

function parseICalDate(val: string): string {
  // Handle VALUE=DATE:YYYYMMDD or YYYYMMDD
  const clean = val.replace(/.*:/g, "").trim();
  if (clean.length === 8) {
    return `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
  }
  // Handle datetime format YYYYMMDDTHHMMSSZ
  return `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
}

function parseICal(text: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  const blocks = text.split("BEGIN:VEVENT");

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split("END:VEVENT")[0];
    const lines = block.split(/\r?\n/);

    let summary = "Yescapa Booking";
    let dtstart = "";
    let dtend = "";
    let uid = "";

    for (const line of lines) {
      if (line.startsWith("SUMMARY")) {
        summary = line.replace(/^SUMMARY[^:]*:/, "").trim();
      } else if (line.startsWith("DTSTART")) {
        dtstart = parseICalDate(line);
      } else if (line.startsWith("DTEND")) {
        dtend = parseICalDate(line);
      } else if (line.startsWith("UID")) {
        uid = line.replace(/^UID[^:]*:/, "").trim();
      }
    }

    if (dtstart && dtend) {
      events.push({ summary, dtstart, dtend, uid });
    }
  }

  return events;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { camper_id, ical_url } = await req.json();

    if (!camper_id || !ical_url) {
      return new Response(
        JSON.stringify({ success: false, error: "camper_id and ical_url required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch iCal feed
    console.log("Fetching iCal from:", ical_url);
    const icalResponse = await fetch(ical_url);
    if (!icalResponse.ok) {
      throw new Error(`Failed to fetch iCal: ${icalResponse.status}`);
    }
    const icalText = await icalResponse.text();
    const events = parseICal(icalText);
    console.log(`Parsed ${events.length} events`);

    // Use service role to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const event of events) {
      // Treat DTEND as exclusive (iCal standard for DATE values)
      // Subtract 1 day from end_date so same-day turnaround is possible
      const endDate = new Date(event.dtend);
      endDate.setDate(endDate.getDate() - 1);
      const adjustedEnd = endDate.toISOString().slice(0, 10);

      // Skip if end <= start after adjustment
      if (adjustedEnd < event.dtstart) {
        skipped++;
        continue;
      }

      // Check if booking already exists for these exact dates
      const { data: existing } = await supabase
        .from("bookings")
        .select("id")
        .eq("camper_id", camper_id)
        .eq("start_date", event.dtstart)
        .eq("end_date", adjustedEnd)
        .neq("status", "cancelled")
        .limit(1);

      if (existing && existing.length > 0) {
        skipped++;
        continue;
      }

      const { error } = await supabase.from("bookings").insert({
        camper_id,
        customer_name: event.summary || "Yescapa",
        customer_email: "yescapa@import",
        start_date: event.dtstart,
        end_date: adjustedEnd,
        total_price: 0,
        status: "confirmed",
      });

      if (error) {
        errors.push(`${event.dtstart}-${adjustedEnd}: ${error.message}`);
        skipped++;
      } else {
        imported++;
      }
    }

    return new Response(
      JSON.stringify({ success: true, imported, skipped, errors, total_events: events.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
