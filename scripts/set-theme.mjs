// Update theme_color sebuah undangan tanpa menghapus data.
// Pakai: node scripts/set-theme.mjs <slug> <theme>
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const slug = process.argv[2];
const theme = process.argv[3];
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!slug || !theme) {
  console.error("Pakai: node scripts/set-theme.mjs <slug> <theme>");
  process.exit(1);
}
if (!url || !serviceRoleKey) {
  console.error("Supabase belum dikonfigurasi di file .env");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { error } = await supabase
  .from("wedding")
  .update({ theme_color: theme, updated_at: new Date().toISOString() })
  .eq("slug", slug);

if (error) {
  console.error(error);
  process.exit(1);
}
console.log(`theme_color ${slug} -> ${theme}`);