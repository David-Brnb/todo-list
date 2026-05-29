import { Pressable } from '@/tw';
import { cn } from '../cn';

type Props = React.ComponentProps<typeof Pressable> & {
  color: string;
  selected?: boolean;
  size?: number;
  selectedIcon?: React.ReactNode;
};

export function ColorSwatch({
  color,
  selected,
  size = 76,
  selectedIcon,
  className,
  ...p
}: Props) {
  return (
    <Pressable
      style={{ width: size, height: size, backgroundColor: color }}
      className={cn(
        'items-center justify-center rounded-2xl will-change-variable',
        selected && 'border-4 border-canvas shadow-[0_0_0_4px_var(--color-brand-softer)]',
        className,
      )}
      {...p}
    >
      {selected ? selectedIcon : null}
    </Pressable>
  );
}
