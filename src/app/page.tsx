import { redirect } from "next/navigation";
import { DEMO_SLUG } from "@/lib/demo-data";

export const metadata = {
  title: "Undangan Digital · Demo Portofolio",
};

export default function HomePage() {
  redirect(`/undangan/${DEMO_SLUG}`);
}
