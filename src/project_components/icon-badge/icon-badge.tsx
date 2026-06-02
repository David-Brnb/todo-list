import React from 'react';
import { View } from '@/tw';

function darken(hex: string, amount = 0.7): string {
  const cleaned = hex.replace('#', '');
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned;
  const num = parseInt(full, 16);
  const factor = 1 - amount;
  const r = Math.max(0, Math.min(255, Math.round(((num >> 16) & 0xff) * factor)));
  const g = Math.max(0, Math.min(255, Math.round(((num >> 8) & 0xff) * factor)));
  const b = Math.max(0, Math.min(255, Math.round((num & 0xff) * factor)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

type Props = {
  icon: React.ReactElement<{ color?: string }>;
  color: string;
  size?: number;
};

export function IconBadge({ icon, color, size = 40 }: Props) {
  const iconColor = darken(color, 0.7);
  return (
    <View
      style={{ backgroundColor: color, width: size, height: size }}
      className="items-center justify-center rounded-full"
    >
      {React.cloneElement(icon, { color: iconColor })}
    </View>
  );
}
