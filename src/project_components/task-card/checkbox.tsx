import { Pressable, View } from "@/tw";
import { cn } from "../cn";

type Props = React.ComponentProps<typeof Pressable> & {
  checked?: boolean;
  checkIcon?: React.ReactNode;
};

export function Checkbox({ checked, checkIcon, className, ...p }: Props) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className={cn(
        "h-6 w-6 items-center justify-center rounded-md border-2",
        checked ? "border-success bg-success" : "border-border bg-transparent",
        className,
      )}
      {...p}
    >
      {checked
        ? (checkIcon ?? <View className="h-2 w-2 rounded-sm bg-ink-inverse" />)
        : null}
    </Pressable>
  );
}
