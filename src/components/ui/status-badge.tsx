import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { localizeStatus } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const STATUS_VARIANT: Record<string, string> = {
  Final: "border-success/30 bg-success/15 text-emerald-300",
  Draft: "border-warning/30 bg-warning/15 text-amber-300",
  Review: "border-accent/30 bg-accent/15 text-violet-300",
  "Last Call": "border-secondary/30 bg-secondary/15 text-cyan-300",
  Stagnant: "border-error/30 bg-error/15 text-red-300",
  Living: "border-primary/30 bg-primary/15 text-indigo-300",
  Withdrawn: "border-white/10 bg-white/5 text-slate-400",
  Idea: "border-white/10 bg-white/5 text-slate-400",
};

export function StatusBadge({
  status,
  locale = "en",
  className,
}: {
  status: string;
  locale?: Locale;
  className?: string;
}) {
  return (
    <Badge className={cn("border", STATUS_VARIANT[status] ?? STATUS_VARIANT.Idea, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90" />
      {localizeStatus(status, locale)}
    </Badge>
  );
}
