import { Pressable, Text } from "@/tw";
import React from "react";
import { cn } from "../cn";

type Props = React.ComponentProps<typeof Pressable> & {
  title: string;
  icon: React.ReactElement<{ color?: string }>;
  bgColor: string;
};

export function TaskListLite({
  title,
  icon,
  bgColor,
  className,
  ...p
}: Props) {
  return (
    <Pressable
      style={{ backgroundColor: bgColor }}
      className={cn(
        "h-9 flex-row items-center gap-2 self-start rounded-full px-4 py-2",
        className,
      )}
      {...p}
    >
      {React.cloneElement(icon, { color: "#FFFFFF" })}
      <Text className="font-inter text-sm font-medium leading-5 text-white">
        {title}
      </Text>
    </Pressable>
  );
}
