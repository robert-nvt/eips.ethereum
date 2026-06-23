/**
 * Markdown-aware English → Vietnamese machine translation.
 *
 * Uses the free Google translate endpoint (no API key). Fenced code blocks,
 * inline code, link/image URLs and HTML tags are protected with private-use
 * placeholder characters so only human-readable prose is translated.
 *
 * Set TRANSLATE_ENDPOINT to point at a self-hosted LibreTranslate, or extend
 * `translateChunk` to call DeepL / an LLM if you have a key.
 */

const MAX_CHUNK = 3500;
const PUA_START = 0xe000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateChunk(text: string, tl = "vi"): Promise<string> {
  if (!text.trim()) return text;
  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=` +
    encodeURIComponent(text);
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (eip-explorer translate)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as [Array<[string]>];
      return data[0].map((seg) => seg[0]).join("");
    } catch (err) {
      if (attempt === 3) throw err;
      await sleep(800 * (attempt + 1));
    }
  }
  return text;
}

function chunkByLines(text: string): string[] {
  const lines = text.split("\n");
  const chunks: string[] = [];
  let cur = "";
  for (const line of lines) {
    if (cur.length + line.length + 1 > MAX_CHUNK && cur) {
      chunks.push(cur);
      cur = "";
    }
    cur += (cur ? "\n" : "") + line;
  }
  if (cur) chunks.push(cur);
  return chunks;
}

/** Translate a prose segment, protecting inline code / links / html. */
async function translateProse(segment: string): Promise<string> {
  const tokens: string[] = [];
  const protect = (re: RegExp, s: string) =>
    s.replace(re, (m) => {
      const i = tokens.length;
      tokens.push(m);
      return String.fromCodePoint(PUA_START + i);
    });

  let work = segment;
  work = protect(/`[^`\n]+`/g, work); // inline code
  work = protect(/!\[[^\]]*\]\([^)]*\)/g, work); // images
  work = protect(/\((?:https?:|mailto:|#|\.{0,2}\/)[^)\s]*\)/g, work); // link targets
  work = protect(/<[^>\n]+>/g, work); // html tags
  work = protect(/\bEIP-\d+\b|\bERC-\d+\b|\b0x[0-9a-fA-F]+\b/g, work); // identifiers

  if (tokens.length > 6000) return segment; // too many tokens, skip

  const out: string[] = [];
  for (const chunk of chunkByLines(work)) {
    out.push(await translateChunk(chunk));
    await sleep(120);
  }
  let translated = out.join("\n");

  // restore placeholders
  translated = translated.replace(
    /[-]/g,
    (ch) => tokens[ch.codePointAt(0)! - PUA_START] ?? ch
  );
  return translated;
}

/** Repair markdown the translator commonly mangles (heading/list spacing). */
function normalizeMarkdown(md: string): string {
  return md
    .replace(/^(#{1,6})(?=[^\s#])/gm, "$1 ") // "##Heading" -> "## Heading"
    .replace(/^(\s*[-*])(?=[^\s*-])/gm, "$1 "); // "-item" -> "- item" (not **bold** / ---)
}

/** Translate a full markdown document, leaving fenced code blocks untouched. */
export async function translateMarkdown(markdown: string): Promise<string> {
  const parts = markdown.split(/(```[\s\S]*?```)/g);
  const out: string[] = [];
  for (const part of parts) {
    if (part.startsWith("```")) {
      out.push(part); // code fence — keep as-is
    } else {
      out.push(normalizeMarkdown(await translateProse(part)));
    }
  }
  return out.join("");
}

/** Translate a short single line of text (title/summary). */
export async function translateText(text: string): Promise<string> {
  return translateChunk(text);
}
