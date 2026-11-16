import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Admin",
  },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-full bg-stone-100 text-stone-900">{children}</div>;
}
