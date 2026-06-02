import { Text, View } from "@/tw";
import { cn } from "../cn";

type Props = {
  title: string;
  count?: number;
  className?: string;
};

export function SectionHeading({ title, count, className }: Props) {
  return (
    <View className={cn("flex-row items-end justify-between px-1", className)}>
      <Text
        style={{ fontFamily: "Manrope_700Bold", letterSpacing: 1.2 }}
        className="text-xs uppercase text-[#414754]"
      >
        {title}
      </Text>
      {typeof count === "number" ? (
        <Text className="font-inter text-xs font-semibold text-[#005BBF]">
          {count} found
        </Text>
      ) : null}
    </View>
  );
}
