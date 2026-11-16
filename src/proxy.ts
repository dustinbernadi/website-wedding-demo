import { NextResponse, type NextRequest } from "next/server";

/**
 * Demo portofolio ini tidak menampilkan panel admin ke publik.
 *
 * Saat DEMO_ADMIN_HIDDEN bukan "false", setiap request ke /admin (termasuk
 * /admin/login dan server action-nya) dijawab sebagai 404 agar tidak terlihat
 * bahwa ada panel admin di baliknya. Untuk mengakses admin secara lokal,
 * set DEMO_ADMIN_HIDDEN="false" di .env lalu restart dev server.
 */
const adminHidden = process.env.DEMO_ADMIN_HIDDEN !== "false";

export function proxy(request: NextRequest) {
  if (!adminHidden) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/404";
  url.search = "";

  const response = NextResponse.rewrite(url, { status: 404 });
  response.headers.set("x-robots-tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
