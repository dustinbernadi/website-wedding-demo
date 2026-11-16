"use server";

import { createHash, timingSafeEqual } from "crypto";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export type LoginState = { message?: string } | undefined;

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string): boolean {
  const hashA = digest(a);
  const hashB = digest(b);
  if (hashA.length !== hashB.length) return false;
  return timingSafeEqual(hashA, hashB);
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected) {
    return { message: "ADMIN_PASSWORD belum diatur di .env." };
  }
  if (!safeEqual(password, expected)) {
    return { message: "Password salah." };
  }

  await createSession();
  redirect("/admin");
}
