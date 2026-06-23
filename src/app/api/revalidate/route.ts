import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { LOCALES } from "@/lib/i18n";

/**
 * Daily ISR revalidation endpoint (triggered by the Vercel cron in vercel.json).
 * The data itself is refreshed by the `sync:eips` GitHub Action which commits
 * regenerated public/data/*.json; this simply busts the ISR cache.
 */
export async function GET() {
  for (const lang of LOCALES) {
    revalidatePath(`/${lang}`);
    revalidatePath(`/${lang}/eips/[id]`, "page");
    revalidatePath(`/${lang}/categories/[slug]`, "page");
  }
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
