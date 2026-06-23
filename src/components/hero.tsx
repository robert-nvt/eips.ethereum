import { Box, CheckCircle2, FileText, Users } from "lucide-react";
import { EthLogo } from "@/components/eth-logo";
import { formatCompact } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n";
import type { EipStats } from "@/lib/types";

export function Hero({ dict, stats }: { dict: Dictionary; stats: EipStats }) {
  const chips = [
    {
      icon: Box,
      value: `${formatCompact(stats.total)}+`,
      label: dict.hero.totalEips,
      color: "#818CF8",
    },
    {
      icon: CheckCircle2,
      value: `${formatCompact(stats.final)}+`,
      label: dict.hero.final,
      color: "#10B981",
    },
    {
      icon: FileText,
      value: `${formatCompact(stats.draft)}+`,
      label: dict.hero.draft,
      color: "#F59E0B",
    },
    {
      icon: Users,
      value: `${formatCompact(stats.contributors)}+`,
      label: dict.hero.contributors,
      color: "#8B5CF6",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0B1430] via-[#0A1024] to-[#0B1220] p-7 sm:p-9">
      {/* decorative glow + grid */}
      <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:22px_22px] opacity-40" />
      <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute right-32 top-10 h-52 w-52 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-[2.6rem]">
            <span className="gradient-text">Ethereum Improvement</span>
            <br />
            Proposals <span className="text-secondary">(EIPs)</span>
          </h1>
          <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-slate-400 sm:text-base">
            {dict.hero.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-xl">
            {chips.map((c) => (
              <div
                key={c.label}
                className="glass rounded-2xl px-4 py-3.5 transition-transform hover:-translate-y-0.5"
              >
                <c.icon className="mb-2 h-5 w-5" style={{ color: c.color }} />
                <div className="text-xl font-bold text-white">{c.value}</div>
                <div className="text-xs text-muted">{c.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated illustration */}
        <div className="relative grid h-44 w-44 shrink-0 place-items-center sm:h-56 sm:w-56">
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute inset-6 rounded-full border border-white/10" />
          <div className="absolute inset-12 rounded-full border border-white/10" />
          <div className="relative h-28 w-28 animate-float sm:h-36 sm:w-36">
            <EthLogo />
          </div>
        </div>
      </div>
    </section>
  );
}
