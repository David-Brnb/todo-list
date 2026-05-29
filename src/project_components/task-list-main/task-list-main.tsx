import { Text, View } from "@/tw";
import React from "react";
import { Badge } from "../badge";
import { cn } from "../cn";
import { ProgressBar } from "../progress-bar";
import { HeadingL } from "../typography/typography";

function softenHex(hex: string, amount = 0.7): string {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const rs = mix(r);
  const gs = mix(g);
  const bs = mix(b);
  return `#${((rs << 16) | (gs << 8) | bs).toString(16).padStart(6, "0")}`;
}

export function formatTimeAgo(date: Date | string | number): string {
  const d =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  if (diffMs < 0) return "Just now";
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (days >= 7) return "7+ days ago";
  if (days >= 1) return `${days} ${days === 1 ? "day" : "days"} ago`;
  if (hours >= 1) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  if (minutes >= 1) return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
  return "Just now";
}

type Props = React.ComponentProps<typeof View> & {
  tag: string;
  title: string;
  icon: React.ReactElement<{ color?: string }>;
  color: string;
  progress: number;
  onClick?: () => void;
  lastTaskTitle?: string;
};

export function TaskListMain({
  tag,
  title,
  icon,
  color,
  progress,
  onClick,
  className,
  lastTaskTitle = "",
  ...p
}: Props) {
  const softColor = softenHex(color, 0.7);
  const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);

  return (
    <View
      style={{ borderLeftColor: color }}
      className={cn(
        "rounded-xl border-l-4 bg-white p-6 shadow-sm",
        className,
      )}
      {...p}
    >
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-2">
          <Badge text={tag} color={softColor} />
          <HeadingL className="text-2xl leading-8">{title}</HeadingL>
        </View>
        {React.cloneElement(icon, { color })}
      </View>

      <View className="mt-6 gap-2">
        <View className="flex-row items-center justify-between gap-4">
          <Text
            numberOfLines={1}
            className="flex-1 font-inter text-sm font-medium leading-5 text-ink-secondary"
          >
            {lastTaskTitle}
          </Text>
          <Text
            style={{ color }}
            className="font-inter text-sm font-bold leading-5"
          >
            {pct}%
          </Text>
        </View>
        <ProgressBar value={progress} color={color} />
      </View>
    </View>
  );
}
