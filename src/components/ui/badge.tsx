import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-slate-200",
        primary: "border-primary/30 bg-primary/15 text-indigo-300",
        secondary: "border-secondary/30 bg-secondary/15 text-cyan-300",
        accent: "border-accent/30 bg-accent/15 text-violet-300",
        success: "border-success/30 bg-success/15 text-emerald-300",
        warning: "border-warning/30 bg-warning/15 text-amber-300",
        error: "border-error/30 bg-error/15 text-red-300",
        outline: "border-white/15 text-slate-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
