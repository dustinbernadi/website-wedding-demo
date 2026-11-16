import { redirect } from "next/navigation";
import { DEMO_SLUG } from "@/lib/demo-data";
import { verifySession } from "@/lib/auth";

export default async function AdminIndexPage() {
  await verifySession();
  redirect(`/admin/${DEMO_SLUG}`);
}
