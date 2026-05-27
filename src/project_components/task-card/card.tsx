import { View } from "@/tw";
import { cn } from "../cn";

type Props = React.ComponentProps<typeof View> & {
  accent?: "brand" | "success" | "danger" | "none";
};

const accentByTone = {
  brand: "border-l-4 border-l-brand",
  success: "border-l-4 border-l-success",
  danger: "border-l-4 border-l-danger",
  none: "",
} as const;

export function Card({ accent = "none", className, children, ...p }: Props) {
  return (
    <View
      className={cn(
        "rounded-xl bg-surface p-5 shadow-sm",
        accentByTone[accent],
        className,
      )}
      {...p}
    >
      {children}
    </View>
  );
}
