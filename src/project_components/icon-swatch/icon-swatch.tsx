import { Pressable } from '@/tw';
import { cn } from '../cn';

type Props = React.ComponentProps<typeof Pressable> & {
  icon: React.ReactNode;
  selected?: boolean;
};

export function IconSwatch({ icon, selected, className, ...p }: Props) {
  return (
    <Pressable
      className={cn(
        'h-14 w-14 items-center justify-center rounded-xl will-change-variable',
        selected ? 'bg-surface border-b-2 border-brand shadow-sm' : 'bg-surface-alt',
        className,
      )}
      {...p}
    >
      {icon}
    </Pressable>
  );
}
