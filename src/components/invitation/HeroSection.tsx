import { GoldDivider } from "./FlowerOrnament";
import { Entrance } from "./motion";
import FadeImage from "./FadeImage";

type Props = {
  groomName: string;
  brideName: string;
  dateLabel: string;
  backgroundImage?: string | null;
  themeColor?: string;
};

export default function HeroSection({
  groomName,
  brideName,
  dateLabel,
  backgroundImage,
}: Props) {
  return (
    <header
      id="beranda"
      className="relative flex h-[100dvh] flex-col justify-center scroll-mt-6 overflow-hidden px-6 text-center sm:px-10"
    >
      {backgroundImage && (
        <div aria-hidden className="absolute inset-0">
          <FadeImage
            src={backgroundImage}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[50%_35%]"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        </div>
      )}

      <div className="relative">
        <Entrance>
          <p className="mb-6 text-[11px] font-semibold tracking-[0.45em] text-[#E5C158] uppercase [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
            The Wedding Of
          </p>
          <h1 className="font-headline text-4xl leading-tight tracking-wide text-[#FAFAFA] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] sm:text-6xl">
            {groomName}
          </h1>

          <GoldDivider className="my-6 !text-[#E5C158]" />

          <h2 className="font-headline text-4xl leading-tight tracking-wide text-[#FAFAFA] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] sm:text-6xl">
            {brideName}
          </h2>

          <p className="mt-10 font-display text-xl font-medium tracking-wide text-[#E5C158] italic [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] sm:text-2xl">
            {dateLabel}
          </p>

          <a
            href="#tanggal"
            className="mt-10 inline-block border border-[#E5C158] bg-white/10 px-10 py-4 font-display text-lg italic text-[#E5C158] backdrop-blur-sm transition-all hover:bg-[#E5C158] hover:text-[#201810] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C158]"
          >
            Save The Date
          </a>
        </Entrance>
      </div>
    </header>
  );
}
