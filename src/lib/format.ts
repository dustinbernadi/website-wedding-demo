import { formatInTimeZone } from "date-fns-tz";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";

const TIME_ZONE = "Asia/Jakarta";

export function formatDate(date: Date): string {
  return formatInTimeZone(date, TIME_ZONE, "EEEE, d MMMM yyyy", { locale: id });
}

export function formatTime(date: Date): string {
  return formatInTimeZone(date, TIME_ZONE, "HH.mm", { locale: id });
}

export function formatShortDate(date: Date): string {
  return formatInTimeZone(date, TIME_ZONE, "d MMMM yyyy", { locale: id });
}

export function formatRelative(date: Date): string {
  try {
    return formatDistanceToNowStrict(date, { addSuffix: true, locale: id });
  } catch {
    return "";
  }
}
