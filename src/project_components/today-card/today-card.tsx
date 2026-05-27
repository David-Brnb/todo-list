import { Text, View } from "@/tw";
import { cn } from "../cn";

type Props = React.ComponentProps<typeof View> & {
  title: string;
  time: string;
  color: string;
};

export function TodayCard({ title, time, color, className, ...p }: Props) {
  return (
    <View
      className={cn(
        "h-13.5 flex-row items-center justify-between self-stretch rounded-xl border border-surface-sunken bg-white p-4",
        className,
      )}
      {...p}
    >
      <View className="flex-row items-center gap-3">
        <View
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <Text className="font-inter text-sm font-semibold leading-5 text-ink">
          {title}
        </Text>
      </View>

      <Text
        className="font-inter text-xs font-bold leading-4"
        style={{ color }}
      >
        {time}
      </Text>
    </View>
  );
}
