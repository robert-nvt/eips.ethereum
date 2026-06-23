/**
 * Generate the static JSON data files in public/data from the bundled
 * curated dataset. Runs automatically before `next build` (prebuild) so the
 * app always has data, even without network access.
 *
 * For the full corpus from GitHub, run `npm run sync:eips` instead.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { SEED_EIPS } from "../src/lib/data/seed-eips";
import { writeDataFiles } from "./lib/write-data";

async function main() {
  const eipsJson = join(process.cwd(), "public", "data", "eips.json");
  if (existsSync(eipsJson) && process.argv.includes("--if-missing")) {
    console.log("public/data/eips.json already exists — skipping.");
    return;
  }
  await writeDataFiles(SEED_EIPS);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
