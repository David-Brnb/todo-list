import { Pressable, Text } from "@/tw";
import { cn } from "../cn";

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

function lightenHex(hex: string, amount = 0.25): string {
  const { r, g, b } = parseHex(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const rs = mix(r);
  const gs = mix(g);
  const bs = mix(b);
  return `#${((rs << 16) | (gs << 8) | bs).toString(16).padStart(6, "0")}`;
}

type Props = React.ComponentProps<typeof Pressable> & {
  title: string;
  color: string;
};

export function GradientButton({
  title,
  color,
  className,
  style,
  ...p
}: Props) {
  const gradientEnd = lightenHex(color, 0.25);

  return (
    <Pressable
      style={[
        {
          experimental_backgroundImage: `linear-gradient(135deg, ${color} 0%, ${gradientEnd} 100%)`,
          shadowColor: color,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 6,
        },
        style as any,
      ]}
      className={cn(
        "h-14 items-center justify-center self-stretch rounded-xl px-4 py-4 active:opacity-90",
        className,
      )}
      {...p}
    >
      <Text className="font-inter text-base font-bold leading-6 text-white">
        {title}
      </Text>
    </Pressable>
  );
}
