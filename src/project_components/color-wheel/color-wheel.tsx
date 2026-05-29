import { useCallback, useMemo } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  /** Diameter of the wheel in px. */
  size?: number;
  /** Diameter of the draggable thumb in px. */
  thumbSize?: number;
  /** Currently selected hex color, e.g. "#FF6B6B". Used to place the thumb. */
  value?: string;
  /** Called continuously while dragging with the picked hex string. */
  onColorChange?: (hex: string) => void;
};

/* ---------- color math (plain JS, runs on render + JS thread) ---------- */

function hsvToHex(h: number, s: number, v: number): string {
  // h: 0-360, s/v: 0-1
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToHsv(hex: string): { h: number; s: number; v: number } | null {
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

/* ---------- static rainbow background (memoized, smooth gradient rows) ---------- */

function WheelBackground({ size }: { size: number }) {
  const rows = useMemo(() => {
    const r = size / 2;
    const rowStep = 3; // px per row — smaller = smoother but more views
    const sampleStep = 7; // px between gradient stops along a row
    const out: { top: number; left: number; width: number; bg: string }[] = [];

    for (let top = 0; top < size; top += rowStep) {
      const y = top + rowStep / 2;
      const dy = y - r;
      const halfW = Math.sqrt(Math.max(0, r * r - dy * dy));
      if (halfW <= 0) continue;
      const left = r - halfW;
      const width = halfW * 2;

      const stops: string[] = [];
      for (let x = 0; x <= width; x += sampleStep) {
        const dx = left + x - r;
        let h = Math.atan2(dy, dx) * (180 / Math.PI);
        if (h < 0) h += 360;
        const s = Math.min(1, Math.sqrt(dx * dx + dy * dy) / r);
        const pct = Math.round((x / width) * 100);
        stops.push(`${hsvToHex(h, s, 1)} ${pct}%`);
      }
      out.push({
        top,
        left,
        width,
        bg: `linear-gradient(to right, ${stops.join(", ")})`,
      });
    }
    return out;
  }, [size]);

  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2, overflow: "hidden" }}
    >
      {rows.map((row, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            top: row.top,
            left: row.left,
            width: row.width,
            height: 4,
            // @ts-ignore experimental_backgroundImage is valid in RN 0.76+
            experimental_backgroundImage: row.bg,
          }}
        />
      ))}
    </View>
  );
}

const MemoWheel = WheelBackground;

/* ---------- the picker ---------- */

export function ColorWheel({
  size = 260,
  thumbSize = 28,
  value,
  onColorChange,
}: Props) {
  const radius = size / 2;

  // initial thumb offset from center based on `value`
  const init = useMemo(() => {
    const hsv = value ? hexToHsv(value) : null;
    if (!hsv) return { x: 0, y: 0 };
    const dist = hsv.s * radius;
    const rad = (hsv.h * Math.PI) / 180;
    return { x: Math.cos(rad) * dist, y: Math.sin(rad) * dist };
  }, [value, radius]);

  // offset from the wheel center
  const dx = useSharedValue(init.x);
  const dy = useSharedValue(init.y);

  const emit = useCallback(
    (h: number, s: number) => {
      onColorChange?.(hsvToHex(h, s, 1));
    },
    [onColorChange],
  );

  const updateFromPoint = (px: number, py: number) => {
    "worklet";
    let ox = px - radius;
    let oy = py - radius;
    const dist = Math.sqrt(ox * ox + oy * oy);
    if (dist > radius) {
      ox = (ox / dist) * radius;
      oy = (oy / dist) * radius;
    }
    dx.value = ox;
    dy.value = oy;
    let h = Math.atan2(oy, ox) * (180 / Math.PI);
    if (h < 0) h += 360;
    const s = Math.min(1, Math.sqrt(ox * ox + oy * oy) / radius);
    runOnJS(emit)(h, s);
  };

  const pan = Gesture.Pan()
    .onBegin((e) => updateFromPoint(e.x, e.y))
    .onUpdate((e) => updateFromPoint(e.x, e.y));

  const tap = Gesture.Tap().onEnd((e) => updateFromPoint(e.x, e.y));

  const gesture = Gesture.Simultaneous(pan, tap);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: radius + dx.value - thumbSize / 2 },
      { translateY: radius + dy.value - thumbSize / 2 },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ width: size, height: size }}>
        <MemoWheel size={size} />
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              borderWidth: 3,
              borderColor: "white",
              backgroundColor: "transparent",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 1 },
              elevation: 3,
            },
            thumbStyle,
          ]}
        />
      </View>
    </GestureDetector>
  );
}
