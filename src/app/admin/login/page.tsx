import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "@/app/admin/login/LoginForm";

export const metadata: Metadata = {
  title: "Masuk",
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-stone-100 px-6 py-16">
      <LoginForm />
    </main>
  );
}
