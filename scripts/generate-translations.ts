/**
 * Generate static Vietnamese translation + multi-level learning JSON files.
 *
 *   npm run generate:translations
 *
 * Output:
 *   public/data/translations/vi/eip-<id>.json
 *   public/data/learning/{en,vi}/eip-<id>.json
 *
 * No database — pure filesystem artifacts consumed by Server Components.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { TRANSLATIONS } from "../src/lib/data/translations";

const DATA_DIR = join(process.cwd(), "public", "data");

async function main() {
  const viDir = join(DATA_DIR, "translations", "vi");
  const learnEn = join(DATA_DIR, "learning", "en");
  const learnVi = join(DATA_DIR, "learning", "vi");
  await Promise.all([
    mkdir(viDir, { recursive: true }),
    mkdir(learnEn, { recursive: true }),
    mkdir(learnVi, { recursive: true }),
  ]);

  for (const t of TRANSLATIONS) {
    await writeFile(
      join(viDir, `eip-${t.id}.json`),
      JSON.stringify({ id: t.id, ...t.vi })
    );
    await writeFile(
      join(learnEn, `eip-${t.id}.json`),
      JSON.stringify({ id: t.id, ...t.learning.en })
    );
    await writeFile(
      join(learnVi, `eip-${t.id}.json`),
      JSON.stringify({ id: t.id, ...t.learning.vi })
    );
  }
  console.log(`Wrote translations + learning content for ${TRANSLATIONS.length} EIPs.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
