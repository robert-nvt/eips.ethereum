"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function StatusDonut({
  data,
  total: totalProp,
}: {
  data: { name: string; value: number; color: string }[];
  total?: number;
}) {
  const total = totalProp ?? data.reduce((s, d) => s + d.value, 0);

  // Text alternative for screen readers (the chart SVG itself is decorative).
  const summary =
    `EIP status distribution, ${total} total: ` +
    data
      .map((d) => `${d.name} ${d.value} (${Math.round((d.value / total) * 100)}%)`)
      .join(", ") +
    ".";

  return (
    <div
      className="relative h-[180px] w-[180px]"
      role="img"
      aria-label={summary}
      tabIndex={0}
    >
      <div aria-hidden="true" className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={82}
              paddingAngle={1}
              cornerRadius={4}
              minAngle={4}
              stroke="#0B1220"
              strokeWidth={1}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={false}
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#0B1220",
                border: "1px solid rgba(148,163,184,0.15)",
                borderRadius: 12,
                fontSize: 12,
                color: "#fff",
              }}
              formatter={(v: number, n: string) => [
                `${v} (${Math.round((v / total) * 100)}%)`,
                n,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      >
        <span className="text-2xl font-bold text-white">
          {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
        </span>
        <span className="text-[11px] text-muted">EIPs</span>
      </div>
    </div>
  );
}
