"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import { GoldDivider, FloralSpray } from "./FlowerOrnament";
import { Reveal } from "./motion";
import { useGuestName } from "@/lib/use-guest-name";

type DemoState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

const ATTENDANCE_OPTIONS = [
  {
    value: "HADIR",
    label: "Hadir",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="square" strokeLinejoin="miter">
        <path d="M6 12l4 4 8-8" />
      </svg>
    ),
  },
  {
    value: "TIDAK_HADIR",
    label: "Tidak Hadir",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="square" strokeLinejoin="miter">
        <path d="M6 6l12 12M6 18L18 6" />
      </svg>
    ),
  },
  {
    value: "RAFGU",
    label: "Ragu-ragu",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4M12 16h0" />
        <circle cx={12} cy={12} r={9} />
      </svg>
    ),
  },
];

const ATTENDANCE_VALUES = ATTENDANCE_OPTIONS.map((option) => option.value);

const inputClass =
  "w-full border-0 border-b border-[var(--accent)]/30 bg-transparent px-1 py-3 text-[var(--ink)] placeholder:text-[var(--ink-muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-0 transition-colors";

export default function RsvpSection() {
  const guestName = useGuestName();
  const [state, setState] = useState<DemoState>({ ok: false });
  const [formKey, setFormKey] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Jebakan bot: perlakukan seolah berhasil tanpa melakukan apa pun.
    if (String(formData.get("website") ?? "").trim()) {
      setState({
        ok: true,
        message: "Terima kasih! Konfirmasi Anda tercatat pada demo ini.",
      });
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const attendance = String(formData.get("attendance") ?? "");
    const guestCountRaw = Number(formData.get("guestCount") ?? "1");
    const phone = String(formData.get("phone") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Nama wajib diisi.";
    else if (name.length > 100) errors.name = "Nama maksimal 100 karakter.";
    if (!ATTENDANCE_VALUES.includes(attendance))
      errors.attendance = "Pilih konfirmasi kehadiran.";
    const guestCount = Number.isInteger(guestCountRaw) ? guestCountRaw : 1;
    if (guestCount < 1 || guestCount > 20)
      errors.guestCount = "Jumlah tamu antara 1–20.";
    if (phone.length > 20) errors.phone = "Nomor maksimal 20 digit.";
    if (note.length > 500) errors.note = "Catatan maksimal 500 karakter.";

    if (Object.keys(errors).length > 0) {
      setState({ ok: false, fieldErrors: errors });
      return;
    }

    setState({
      ok: true,
      message:
        "Terima kasih! Konfirmasi Anda tercatat pada demo ini (tidak dikirim ke server).",
    });
    setFormKey((key) => key + 1);
  }

  return (
    <section className="relative border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-20">
      <FloralSpray className="pointer-events-none absolute -left-6 top-6 hidden w-24 opacity-20 sm:block" />
      <FloralSpray className="pointer-events-none absolute -right-6 top-6 hidden w-24 opacity-20 -scale-x-100 sm:block" />
      <Reveal>
        <SectionHeading
          eyebrow="Konfirmasi"
          title="Kehadiran Anda"
          subtitle="Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan segala sesuatunya."
        />
      </Reveal>

      <p className="mx-auto mb-8 max-w-md text-center text-xs text-[var(--ink-muted)]/80 italic">
        Mode demo statis: konfirmasi hanya disimulasikan di browser dan tidak
        disimpan ke database.
      </p>

      {state.ok && state.message && (
        <p
          role="status"
          className="mb-6 border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 py-3 text-center text-sm text-[var(--ink)]"
        >
          {state.message}
        </p>
      )}
      {!state.ok && state.message && (
        <p
          role="alert"
          className="mb-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <form
        key={formKey}
        onSubmit={handleSubmit}
        className="mx-auto max-w-md space-y-8"
        noValidate
      >
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="rsvp-website">Website</label>
          <input
            id="rsvp-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="rsvp-name" className="mb-1 block text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            Nama
          </label>
          <input
            key={`rsvp-name-${guestName ?? ""}`}
            id="rsvp-name"
            name="name"
            type="text"
            required
            maxLength={100}
            defaultValue={guestName ?? ""}
            placeholder="Nama lengkap Anda"
            className={inputClass}
            aria-describedby={state.fieldErrors?.name ? "rsvp-name-error" : undefined}
          />
          {state.fieldErrors?.name && (
            <p id="rsvp-name-error" className="mt-2 text-sm text-red-600">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-3 text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            Kehadiran
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {ATTENDANCE_OPTIONS.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value={option.value}
                  defaultChecked={option.value === "HADIR"}
                  className="peer sr-only"
                />
                <span className="flex flex-col items-center justify-center gap-2 border border-[var(--accent)]/25 px-2 py-4 text-center text-xs text-[var(--accent)] transition-all peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)] peer-checked:text-[var(--paper)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]">
                  {option.icon}
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          {state.fieldErrors?.attendance && (
            <p className="mt-2 text-sm text-red-600">{state.fieldErrors.attendance}</p>
          )}
        </fieldset>

        <div>
          <label htmlFor="rsvp-count" className="mb-1 block text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            Jumlah Tamu
          </label>
          <input
            id="rsvp-count"
            name="guestCount"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            defaultValue={1}
            className={inputClass}
            aria-describedby={state.fieldErrors?.guestCount ? "rsvp-count-error" : undefined}
          />
          {state.fieldErrors?.guestCount && (
            <p id="rsvp-count-error" className="mt-2 text-sm text-red-600">
              {state.fieldErrors.guestCount}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="rsvp-phone" className="mb-1 block text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            No. WhatsApp <span className="text-[var(--ink-muted)]/60 normal-case tracking-normal">(opsional)</span>
          </label>
          <input
            id="rsvp-phone"
            name="phone"
            type="tel"
            maxLength={20}
            placeholder="08xxxxxxxxxx"
            className={inputClass}
            aria-describedby={state.fieldErrors?.phone ? "rsvp-phone-error" : undefined}
          />
          {state.fieldErrors?.phone && (
            <p id="rsvp-phone-error" className="mt-2 text-sm text-red-600">
              {state.fieldErrors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="rsvp-note" className="mb-1 block text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            Catatan <span className="text-[var(--ink-muted)]/60 normal-case tracking-normal">(opsional)</span>
          </label>
          <textarea
            id="rsvp-note"
            name="note"
            rows={3}
            maxLength={500}
            placeholder="Doa, menu khusus, atau kebutuhan lainnya"
            className={inputClass}
            aria-describedby={state.fieldErrors?.note ? "rsvp-note-error" : undefined}
          />
          {state.fieldErrors?.note && (
            <p id="rsvp-note-error" className="mt-2 text-sm text-red-600">
              {state.fieldErrors.note}
            </p>
          )}
        </div>

        <GoldDivider className="my-4" />

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full border border-[var(--accent)] px-6 py-4 font-display text-lg italic text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Kirim Konfirmasi
        </motion.button>
      </form>
    </section>
  );
}
