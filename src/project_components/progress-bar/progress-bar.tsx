import { View } from '@/tw';
import { cn } from '../cn';

type Props = {
  /** 0..1 */
  value: number;
  color?: string;
  className?: string;
};

export function ProgressBar({ value, color = '#005BBF', className }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-muted', className)}>
      <View
        style={{ width: `${pct}%`, backgroundColor: color }}
        className="h-full rounded-full"
      />
    </View>
  );
}
