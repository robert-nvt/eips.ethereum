"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import { Check, Copy } from "lucide-react";
import { slugify } from "@/lib/utils";

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") ?? "";
  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-white/10 bg-[#070C18]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          {lang || "code"}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition-colors hover:bg-white/5 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 scrollbar-thin">
        <code className="font-mono text-[13px] leading-relaxed text-slate-200">{children}</code>
      </pre>
    </div>
  );
}

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-eip max-w-none text-[15px] leading-relaxed text-slate-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 id={slugify(String(children))} className="mb-4 mt-8 text-2xl font-bold text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 id={slugify(String(children))} className="mb-3 mt-8 border-b border-white/5 pb-2 text-xl font-bold text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 id={slugify(String(children))} className="mb-2 mt-6 text-lg font-semibold text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="my-3">{children}</p>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-secondary underline-offset-2 hover:underline">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="my-3 list-disc space-y-1 pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="my-3 list-decimal space-y-1 pl-6">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-primary/60 bg-primary/5 py-2 pl-4 text-slate-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-white/10 bg-white/5 px-3 py-2 text-left font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="border-b border-white/5 px-3 py-2">{children}</td>,
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return <CodeBlock className={className}>{String(children).replace(/\n$/, "")}</CodeBlock>;
            }
            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-cyan-300" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
