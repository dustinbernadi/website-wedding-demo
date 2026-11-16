export const ATTENDANCE_VALUES = ["HADIR", "TIDAK_HADIR", "RAFGU"] as const;

export const ATTENDANCE_LABELS: Record<string, string> = {
  HADIR: "Hadir",
  TIDAK_HADIR: "Tidak Hadir",
  RAFGU: "Ragu-ragu",
};

export const WISH_STATUS_VALUES = ["APPROVED", "PENDING", "REJECTED"] as const;

export const WISH_STATUS_LABELS: Record<string, string> = {
  APPROVED: "Disetujui",
  PENDING: "Menunggu",
  REJECTED: "Ditolak",
};

export function csvEscape(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
