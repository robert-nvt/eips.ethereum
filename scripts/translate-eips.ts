/**
 * Machine-translate EIP specifications (title, abstract, full body) to
 * Vietnamese and write them as static files:
 *
 *   public/data/translations/vi/eip-<id>.json
 *
 * No database — pure filesystem artifacts consumed by Server Components.
 *
 * Usage:
 *   npm run translate:vi -- --popular         # the headline standards
 *   npm run translate:vi -- --ids 20,721,1155
 *   npm run translate:vi -- --all             # every EIP (long-running; for CI)
 *   npm run translate:vi -- --all --limit 50  # cap how many to do this run
 *   npm run translate:vi -- --ids 20 --force  # re-translate even if cached
 *
 * Curated human translations (title/abstract) are preserved; only missing
 * fields and the body are machine-filled.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { translateMarkdown, translateText } from "./lib/translate";
import type { Eip } from "../src/lib/types";

const DATA_DIR = join(process.cwd(), "public", "data");
const EIPS_DIR = join(DATA_DIR, "eips");
const VI_DIR = join(DATA_DIR, "translations", "vi");

const POPULAR_IDS = [20, 721, 1155, 4626, 4337, 3643, 2981, 1822, 1967, 165, 712, 2612, 1559];

function parseArgs() {
  const a = process.argv.slice(2);
  const get = (flag: string) => {
    const i = a.indexOf(flag);
    return i >= 0 ? a[i + 1] : undefined;
  };
  return {
    all: a.includes("--all"),
    popular: a.includes("--popular"),
    force: a.includes("--force"),
    ids: get("--ids")?.split(",").map((x) => parseInt(x, 10)).filter((n) => !Number.isNaN(n)),
    limit: get("--limit") ? parseInt(get("--limit")!, 10) : undefined,
  };
}

async function readEip(id: number): Promise<Eip | null> {
  const p = join(EIPS_DIR, `eip-${id}.json`);
  if (!existsSync(p)) return null;
  return JSON.parse(await readFile(p, "utf8")) as Eip;
}

async function resolveIds(args: ReturnType<typeof parseArgs>): Promise<number[]> {
  if (args.ids?.length) return args.ids;
  if (args.popular) return POPULAR_IDS;
  if (args.all) {
    const files = await readdir(EIPS_DIR);
    return files
      .filter((f) => /^eip-\d+\.json$/.test(f))
      .map((f) => parseInt(f.replace(/\D/g, ""), 10))
      .sort((a, b) => a - b);
  }
  return POPULAR_IDS;
}

async function main() {
  const args = parseArgs();
  await mkdir(VI_DIR, { recursive: true });
  let ids = await resolveIds(args);
  if (args.limit) ids = ids.slice(0, args.limit);

  console.log(`Translating ${ids.length} EIP(s) → Vietnamese...`);
  let done = 0;
  let skipped = 0;

  for (const id of ids) {
    const out = join(VI_DIR, `eip-${id}.json`);
    let existing: Record<string, unknown> = {};
    if (existsSync(out)) existing = JSON.parse(await readFile(out, "utf8"));
    if (existing.body && !args.force) {
      skipped++;
      continue;
    }

    const eip = await readEip(id);
    if (!eip) {
      console.warn(`  eip-${id}: source not found, skipping`);
      continue;
    }

    try {
      const title = (existing.title as string) ?? (await translateText(eip.title));
      const description =
        (existing.description as string) ??
        (eip.description ? await translateText(eip.description) : "");
      const abstract = (existing.abstract as string) ?? description;
      const body = eip.body ? await translateMarkdown(eip.body) : "";

      await writeFile(
        out,
        JSON.stringify({
          id,
          title,
          abstract,
          summary: existing.summary ?? abstract,
          description,
          body,
          machine: true,
        })
      );
      done++;
      console.log(`  ✓ eip-${id} (${done}/${ids.length - skipped})`);
    } catch (err) {
      console.warn(`  ✗ eip-${id}: ${(err as Error).message}`);
    }
  }

  console.log(`Done. Translated ${done}, skipped ${skipped} (already cached).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
