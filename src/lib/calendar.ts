import { event } from "@/data/event";

const pad = (value: number) => String(value).padStart(2, "0");
const escapeIcs = (value: string) => value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

export function getCountdownTarget() {
  const [year, month, day] = event.date.split("-").map(Number);
  if (event.time) {
    const [hours, minutes] = event.time.split(":").map(Number);
    // Event time is in Cairo. Cairo is UTC+2 on this November date.
    return new Date(Date.UTC(year, month - 1, day, hours - 2, minutes));
  }
  // With no supplied time, count down to the start of the date in Cairo.
  return new Date(Date.UTC(year, month - 1, day, -2));
}

export function downloadCalendar() {
  const day = event.date.replaceAll("-", "");
  const [year, month, date] = event.date.split("-").map(Number);
  const nextDay = new Date(Date.UTC(year, month - 1, date + 1)).toISOString().slice(0, 10).replaceAll("-", "");
  const start = event.time ? `${day}T${event.time.replace(":", "")}00` : day;
  let dateFields: string[];
  if (event.time) {
    const [hours, minutes] = event.time.split(":").map(Number);
    const end = new Date(Date.UTC(year, month - 1, date, hours, minutes + 120));
    const endString = `${end.getUTCFullYear()}${pad(end.getUTCMonth() + 1)}${pad(end.getUTCDate())}T${pad(end.getUTCHours())}${pad(end.getUTCMinutes())}00`;
    dateFields = [`DTSTART;TZID=${event.timeZone}:${start}`, `DTEND;TZID=${event.timeZone}:${endString}`];
  } else {
    dateFields = [`DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${nextDay}`];
  }
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Marwan and Sohila//Engagement Invitation//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    `UID:marwan-sohila-${day}@invitation`, `DTSTAMP:${stamp}`, ...dateFields,
    `SUMMARY:${escapeIcs("Marwan & Sohila Engagement")}`,
    `LOCATION:${escapeIcs(event.venue)}`,
    `DESCRIPTION:${escapeIcs(`${event.closingLine}\n${event.mapsUrl}`)}`,
    `URL:${event.mapsUrl}`, "END:VEVENT", "END:VCALENDAR"
  ];
  const blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "marwan-sohila-engagement.ics";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
