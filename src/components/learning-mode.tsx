"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Code2, Rocket } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import type { LearningContent } from "@/lib/data";
import { cn } from "@/lib/utils";

type Level = "beginner" | "intermediate" | "advanced";

export function LearningMode({
  content,
  dict,
}: {
  content: LearningContent;
  dict: Dictionary;
}) {
  const [level, setLevel] = useState<Level>("beginner");

  const levels: { key: Level; label: string; icon: typeof Sparkles; color: string }[] = [
    { key: "beginner", label: dict.detail.beginner, icon: Sparkles, color: "#10B981" },
    { key: "intermediate", label: dict.detail.intermediate, icon: Code2, color: "#06B6D4" },
    { key: "advanced", label: dict.detail.advanced, icon: Rocket, color: "#8B5CF6" },
  ];

  return (
    <div className="glass-card overflow-hidden p-5">
      <div className="mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-accent" />
        <h3 className="font-bold text-white">{dict.detail.learnTitle}</h3>
      </div>

      <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-black/20 p-1">
        {levels.map((l) => (
          <button
            key={l.key}
            onClick={() => setLevel(l.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              level === l.key ? "bg-white/10 text-white" : "text-muted hover:text-white"
            )}
            style={level === l.key ? { boxShadow: `inset 0 0 0 1px ${l.color}66` } : undefined}
          >
            <l.icon className="h-3.5 w-3.5" style={{ color: l.color }} />
            {l.label}
          </button>
        ))}
      </div>

      <motion.p
        key={level}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-sm leading-relaxed text-slate-300"
      >
        {content[level]}
      </motion.p>
    </div>
  );
}
