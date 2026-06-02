import Svg, { G, Path, Text as SvgText } from "react-native-svg";

import { View } from "@/tw";

type BrandLogoProps = {
  text?: string;
  color?: string;
  className?: string;
};

export function BrandLogo({
  text = "TaskFlow",
  color = "#1D4ED8",
  className,
}: BrandLogoProps) {
  return (
    <View
      className={className}
      style={{ flexDirection: "row", alignItems: "center", gap: 12, height: 28 }}
    >
      <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
        <G>
          <Path
            d="M1 2.25C1 1.836 1.336 1.5 1.75 1.5H8.5C9.605 1.5 10.5 2.395 10.5 3.5V14.25C10.5 14.664 10.164 15 9.75 15H1.75C1.336 15 1 14.664 1 14.25V2.25Z"
            fill={color}
          />
          <Path
            d="M21 2.25C21 1.836 20.664 1.5 20.25 1.5H13.5C12.395 1.5 11.5 2.395 11.5 3.5V14.25C11.5 14.664 11.836 15 12.25 15H20.25C20.664 15 21 14.664 21 14.25V2.25Z"
            fill={color}
          />
        </G>
      </Svg>

      <Svg width={110} height={28} viewBox="0 0 110 28">
        <SvgText
          x={0}
          y={21}
          fill={color}
          fontFamily="Inter"
          fontWeight="800"
          fontSize={20}
          letterSpacing={-1}
        >
          {text}
        </SvgText>
      </Svg>
    </View>
  );
}
