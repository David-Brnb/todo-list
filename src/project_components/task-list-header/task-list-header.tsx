import { Text, View } from "@/tw";
import { Badge } from "../badge";
import { cn } from "../cn";
import { HeadingXL } from "../typography/typography";

function parseHex(hex: string) {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

function toHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function softenHex(hex: string, amount = 0.7): string {
  const { r, g, b } = parseHex(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return toHex({ r: mix(r), g: mix(g), b: mix(b) });
}

function lightenHex(hex: string, amount = 0.25): string {
  return softenHex(hex, amount);
}

type Props = React.ComponentProps<typeof View> & {
  title: string;
  description: string;
  color: string;
  tag: string;
};

export function TaskListHeader({
  title,
  description,
  color,
  tag,
  className,
  ...p
}: Props) {
  const softColor = softenHex(color, 0.7);
  const gradientEnd = lightenHex(color, 0.25);

  return (
    <View
      style={{
        experimental_backgroundImage: `linear-gradient(135deg, ${color} 0%, ${gradientEnd} 100%)`,
      }}
      className={cn(
        "relative overflow-hidden self-stretch rounded-xl p-8 shadow-lg",
        className,
      )}
      {...p}
    >
      <View
        pointerEvents="none"
        style={{
          transform: [{ rotate: "12deg" }],
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
        className="absolute -bottom-2 -right-4 h-16 w-28 rounded-3xl"
      />

      <View className="gap-3">
        <Badge text={tag} color={softColor} className="self-start" />

        <HeadingXL className="text-white tracking-tight">{title}</HeadingXL>

        <Text className="max-w-[200px] font-inter text-sm font-normal leading-6 text-white opacity-90">
          {description}
        </Text>
      </View>
    </View>
  );
}
