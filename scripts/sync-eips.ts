/**
 * Sync EIPs from the ethereum/EIPs (+ ERCs) GitHub repositories.
 *
 *   npm run sync:eips
 *
 *   1. Clone / pull the repositories (shallow).
 *   2. Parse every EIP/ERC markdown file (frontmatter + body).
 *   3. Merge with curated metadata (popularity, tags, view counts).
 *   4. Regenerate public/data/{eips,categories,stats,search-index}.json
 *
 * No database is used — everything is written to the filesystem.
 */
import { execSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { parseEipMarkdown } from "../src/lib/eip-parser";
import { SEED_EIPS } from "../src/lib/data/seed-eips";
import { writeDataFiles } from "./lib/write-data";
import type { Eip } from "../src/lib/types";

const EIPS_REPO = process.env.GITHUB_EIPS_REPO ?? "https://github.com/ethereum/EIPs.git";
const ERCS_REPO = process.env.GITHUB_ERCS_REPO ?? "https://github.com/ethereum/ERCs.git";
const WORK_DIR = join(process.cwd(), ".data");

function clone(url: string, dir: string): string | null {
  const target = join(WORK_DIR, dir);
  try {
    if (existsSync(target)) {
      console.log(`Pulling ${dir}...`);
      execSync("git pull --ff-only --depth 1", { cwd: target, stdio: "inherit" });
    } else {
      console.log(`Cloning ${url}...`);
      execSync(`git clone --depth 1 ${url} ${target}`, { stdio: "inherit" });
    }
    return target;
  } catch (err) {
    console.warn(`Could not fetch ${url}:`, (err as Error).message);
    return null;
  }
}

function collect(repoDir: string | null, folder: string): Eip[] {
  if (!repoDir) return [];
  const dir = join(repoDir, folder);
  if (!existsSync(dir)) return [];
  const out: Eip[] = [];
  for (const file of readdirSync(dir)) {
    if (!/^(eip|erc)-\d+\.md$/i.test(file)) continue;
    const id = parseInt(file.replace(/\D/g, ""), 10);
    if (Number.isNaN(id)) continue;
    try {
      out.push(parseEipMarkdown(id, readFileSync(join(dir, file), "utf8")));
    } catch (err) {
      console.warn(`Skipping ${file}: ${(err as Error).message}`);
    }
  }
  return out;
}

async function main() {
  mkdirSync(WORK_DIR, { recursive: true });
  const map = new Map<number, Eip>();

  for (const e of collect(clone(EIPS_REPO, "EIPs"), "EIPS")) map.set(e.id, e);
  for (const e of collect(clone(ERCS_REPO, "ERCs"), "ERCS")) map.set(e.id, e);

  if (map.size === 0) {
    console.warn("No EIPs fetched from GitHub — falling back to curated seed dataset.");
    for (const e of SEED_EIPS) map.set(e.id, e);
  } else {
    // graft curated popularity/tags/views onto fetched records
    for (const seed of SEED_EIPS) {
      const fetched = map.get(seed.id);
      if (fetched) {
        map.set(seed.id, {
          ...fetched,
          tags: fetched.tags.length ? fetched.tags : seed.tags,
          views: seed.views,
          favorites: seed.favorites,
          popularity: seed.popularity,
        });
      }
    }
  }

  await writeDataFiles([...map.values()]);
  console.log(`Sync complete: ${map.size} proposals.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
