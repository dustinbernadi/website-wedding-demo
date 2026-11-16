type Props = {
  children: React.ReactNode;
  className?: string;
  cornerFlowers?: boolean;
  padding?: string;
};

export default function DoubleBorderFrame({
  children,
  className = "",
  cornerFlowers = false,
  padding = "p-6 sm:p-10",
}: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="border border-[var(--accent)]/40">
        <div className={`border border-[var(--accent)]/15 ${padding}`}>
          {children}
        </div>
      </div>
      {cornerFlowers && (
        <>
          <span className="pointer-events-none absolute -top-3 -left-3 text-[var(--accent)]/40">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.2}>
              <circle cx={12} cy={12} r={4} />
              <circle cx={12} cy={4} r={2} />
              <circle cx={4} cy={12} r={2} />
              <circle cx={20} cy={12} r={2} />
              <circle cx={12} cy={20} r={2} />
            </svg>
          </span>
          <span className="pointer-events-none absolute -top-3 -right-3 text-[var(--accent)]/40">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.2}>
              <circle cx={12} cy={12} r={4} />
              <circle cx={12} cy={4} r={2} />
              <circle cx={4} cy={12} r={2} />
              <circle cx={20} cy={12} r={2} />
              <circle cx={12} cy={20} r={2} />
            </svg>
          </span>
          <span className="pointer-events-none absolute -bottom-3 -left-3 text-[var(--accent)]/40">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.2}>
              <circle cx={12} cy={12} r={4} />
              <circle cx={12} cy={4} r={2} />
              <circle cx={4} cy={12} r={2} />
              <circle cx={20} cy={12} r={2} />
              <circle cx={12} cy={20} r={2} />
            </svg>
          </span>
          <span className="pointer-events-none absolute -bottom-3 -right-3 text-[var(--accent)]/40">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.2}>
              <circle cx={12} cy={12} r={4} />
              <circle cx={12} cy={4} r={2} />
              <circle cx={4} cy={12} r={2} />
              <circle cx={20} cy={12} r={2} />
              <circle cx={12} cy={20} r={2} />
            </svg>
          </span>
        </>
      )}
    </div>
  );
}
