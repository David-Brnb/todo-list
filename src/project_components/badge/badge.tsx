import { Pressable, Text, View } from '@/tw';
import { cn } from '../cn';

function darken(hex: string, amount = 0.6): string {
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

type BadgeProps = {
  text: string;
  color: string;
  className?: string;
};

export function Badge({ text, color, className }: BadgeProps) {
  return (
    <View
      style={{ backgroundColor: color }}
      className={cn('self-start rounded-full px-3 py-1', className)}
    >
      <Text
        style={{ color: darken(color, 0.6) }}
        className="font-inter text-[11px] font-bold uppercase tracking-wider"
      >
        {text}
      </Text>
    </View>
  );
}

type ChipProps = React.ComponentProps<typeof Pressable> & {
  label: string;
  selected?: boolean;
  leading?: React.ReactNode;
};

export function Chip({ label, selected, leading, className, ...p }: ChipProps) {
  return (
    <Pressable
      className={cn(
        'h-9 flex-row items-center gap-2 self-start rounded-full px-4',
        selected ? 'bg-brand' : 'bg-surface-sunken',
        className,
      )}
      {...p}
    >
      {leading}
      <Text
        className={cn(
          'font-inter text-sm',
          selected ? 'font-medium text-ink-inverse' : 'font-medium text-ink-secondary',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
