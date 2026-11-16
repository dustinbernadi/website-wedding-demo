import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { DEMO_SLUG, seedDemo } from "../src/lib/demo-seed";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Supabase belum dikonfigurasi. Set NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di file .env",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

seedDemo(supabase)
  .then((result) => {
    console.log(`Demo "${DEMO_SLUG}" siap.`);
    console.log(
      `  ${result.gallery} galeri · ${result.loveStories} love story · ${result.envelopeAccounts} rekening`,
    );
    console.log(
      `  ${result.guests} tamu · ${result.rsvps} RSVP · ${result.wishes} ucapan`,
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
