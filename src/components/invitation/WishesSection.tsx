"use client";

import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import { LeafCluster } from "./FlowerOrnament";
import { EASE, Reveal } from "./motion";

export type WishItem = {
  id: string;
  name: string;
  message: string;
  emoji: string | null;
  createdAt: Date;
};

type Props = {
  wishes: WishItem[];
};

type DemoState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

const EMOJIS = ["🙏", "❤️", "🥂", "🎉", "✨", "🌿"];

const inputClass =
  "w-full border-0 border-b border-[var(--accent)]/30 bg-transparent px-1 py-3 text-[var(--ink)] placeholder:text-[var(--ink-muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-0 transition-colors";

function relativeTime(value: Date | string): string {
  try {
    return formatDistanceToNowStrict(new Date(value), {
      addSuffix: true,
      locale: idLocale,
    });
  } catch {
    return "";
  }
}

export default function WishesSection({ wishes }: Props) {
  const [items, setItems] = useState<WishItem[]>(wishes);
  const [state, setState] = useState<DemoState>({ ok: false });
  const [formKey, setFormKey] = useState(0);
  const [emoji, setEmoji] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Jebakan bot: perlakukan seolah berhasil tanpa melakukan apa pun.
    if (String(formData.get("website") ?? "").trim()) {
      setState({
        ok: true,
        message: "Terima kasih! Ucapan Anda tercatat pada demo ini.",
      });
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const errors: Record<string, string> = {};
    if (!name) errors.name = "Nama wajib diisi.";
    else if (name.length > 100) errors.name = "Nama maksimal 100 karakter.";
    if (!message.trim()) errors.message = "Ucapan tidak boleh kosong.";
    else if (message.length > 500) errors.message = "Ucapan maksimal 500 karakter.";

    if (Object.keys(errors).length > 0) {
      setState({ ok: false, fieldErrors: errors });
      return;
    }

    const newWish: WishItem = {
      id: `demo-wish-baru-${Date.now()}`,
      name,
      message: message.trim(),
      emoji: emoji || null,
      createdAt: new Date(),
    };

    setItems((current) => [newWish, ...current]);
    setState({
      ok: true,
      message:
        "Terima kasih! Ucapan Anda ditambahkan ke daftar demo ini (tidak dikirim ke server).",
    });
    setEmoji("");
    setMessage("");
    setFormKey((key) => key + 1);
  }

  return (
    <section
      id="ucapan"
      className="relative scroll-mt-6 border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-20"
    >
      <LeafCluster className="pointer-events-none absolute -left-4 top-4 hidden w-16 opacity-25 sm:block" />
      <LeafCluster className="pointer-events-none absolute -right-4 top-4 hidden w-16 opacity-25 rotate-180 sm:block" />
      <Reveal>
        <SectionHeading
          eyebrow="Kirim Doa & Ucapan"
          title="Ucapan & Doa"
          subtitle={
            items.length > 0
              ? `${items.length} ucapan dan doa telah diterima`
              : "Jadilah yang pertama berbagi doa dan ucapan untuk kedua mempelai"
          }
        />
      </Reveal>

      <p className="mx-auto mb-8 max-w-md text-center text-xs text-[var(--ink-muted)]/80 italic">
        Mode demo statis: ucapan baru hanya tersimpan selama halaman ini terbuka.
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
        className="mx-auto max-w-md space-y-6"
        noValidate
      >
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="wish-website">Website</label>
          <input
            id="wish-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="wish-name" className="mb-1 block text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            Nama
          </label>
          <input
            id="wish-name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="Nama Anda"
            className={inputClass}
            aria-describedby={state.fieldErrors?.name ? "wish-name-error" : undefined}
          />
          {state.fieldErrors?.name && (
            <p id="wish-name-error" className="mt-2 text-sm text-red-600">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-3 text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            Pilih Emoji
          </legend>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setEmoji((current) => (current === item ? "" : item))}
                aria-pressed={emoji === item}
                aria-label={`Emoji ${item}`}
                className={[
                  "flex size-11 items-center justify-center border text-xl transition-all",
                  emoji === item
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)]"
                    : "border-[var(--accent)]/25 hover:border-[var(--accent)]/60",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="wish-message" className="mb-1 block text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
            Ucapan &amp; Doa
          </label>
          <textarea
            id="wish-message"
            name="message"
            rows={4}
            required
            maxLength={500}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tuliskan doa dan ucapan untuk kedua mempelai..."
            className={inputClass}
            aria-describedby={
              state.fieldErrors?.message ? "wish-message-error" : "wish-message-count"
            }
          />
          <div className="mt-2 flex items-center justify-between gap-4">
            <p id="wish-message-count" className="text-xs text-[var(--ink-muted)]">
              {message.length}/500
            </p>
            {state.fieldErrors?.message && (
              <p id="wish-message-error" className="text-sm text-red-600">
                {state.fieldErrors.message}
              </p>
            )}
          </div>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full border border-[var(--accent)] px-6 py-4 font-display text-lg italic text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Kirim Ucapan
        </motion.button>
      </form>

      {items.length > 0 && (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          className="mx-auto mt-12 max-w-md space-y-4"
        >
          {items.map((wish) => (
            <motion.li
              key={wish.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="border border-[var(--accent)]/20 bg-[var(--accent-soft)]/20 px-5 py-4"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-lg italic text-[var(--ink)]">
                  {wish.emoji ? `${wish.emoji} ` : ""}
                  {wish.name}
                </p>
                <p className="shrink-0 text-xs text-[var(--ink-muted)]">
                  {relativeTime(wish.createdAt)}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">{wish.message}</p>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
