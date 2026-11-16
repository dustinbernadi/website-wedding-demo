"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/login/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );

  return (
    <div className="w-full max-w-sm">
      <img
        src="/logo/logo.png"
        alt="Logo Undangan Digital"
        width={500}
        height={500}
        className="mx-auto mb-6 w-24 object-contain"
      />
      <p className="mb-6 text-center text-xs tracking-[0.3em] text-emerald-700 uppercase">
        Panel Admin · Undangan Digital
      </p>
      <form
        action={formAction}
        className="space-y-5 rounded-lg border border-stone-200 bg-white p-8 shadow-sm"
      >
        <h1 className="font-display text-3xl font-medium italic text-stone-800">
          Masuk Admin
        </h1>

        {state?.message && (
          <p
            role="alert"
            className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.message}
          </p>
        )}

        <div>
          <label
            htmlFor="admin-password"
            className="mb-2 block text-sm font-medium text-stone-600"
          >
            Password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-emerald-800 px-6 py-3 font-display text-lg italic text-emerald-50 transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
