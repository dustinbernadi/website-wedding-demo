import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "@/lib/session";

export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
});

export async function requireAdmin(): Promise<boolean> {
  return (await getSession()) !== null;
}
