import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion";

export type CoupleProfile = {
  name: string;
  fullName: string | null;
  parents: string | null;
  instagram: string | null;
  photo: string | null;
};

type Props = {
  groom: CoupleProfile;
  bride: CoupleProfile;
};

function initialOf(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function CoupleCard({
  role,
  profile,
}: {
  role: string;
  profile: CoupleProfile;
}) {
  return (
    <div className="text-center">
      <div className="relative mx-auto w-full max-w-[280px]">
        <div className="border border-[var(--accent)]/40 p-2">
          <div className="border border-[var(--accent)]/20 p-1.5">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--accent-soft)]">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={`Foto ${role} ${profile.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_30%]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-headline text-7xl text-[var(--accent)]/30">
                    {initialOf(profile.name)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-10 text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
        {role}
      </p>
      <h3 className="mt-3 font-headline text-3xl tracking-wide">
        {profile.name}
      </h3>
      {profile.fullName && (
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          {profile.fullName}
        </p>
      )}
      {profile.parents && (
        <p className="mx-auto mt-4 max-w-[260px] text-sm leading-relaxed whitespace-pre-line text-[var(--ink-muted)]">
          {profile.parents}
        </p>
      )}
      {profile.instagram && (
        <a
          href={`https://instagram.com/${profile.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-deep)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <svg
            aria-hidden
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
          </svg>
          @{profile.instagram.replace(/^@/, "")}
        </a>
      )}
    </div>
  );
}

export default function CoupleSection({ groom, bride }: Props) {
  return (
    <section
      id="mempelai"
      className="scroll-mt-6 border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-24"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Bersama dengan Keluarga"
          title={
            <>
              Bpk. Hendra Pratama
              <br />
              &amp;
              <br />
              <span className="whitespace-nowrap">Ibu Sari Dewi</span>
            </>
          }
          subtitle="Dengan memohon berkat dan kasih Tuhan Yesus Kristus, kami bermaksud menyelenggarakan acara pernikahan kami"
        />
        <div className="mx-auto grid max-w-2xl gap-16 sm:grid-cols-2 sm:gap-8">
          <CoupleCard role="Mempelai Pria" profile={groom} />
          <CoupleCard role="Mempelai Wanita" profile={bride} />
        </div>
      </Reveal>
    </section>
  );
}
