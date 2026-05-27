import { Pressable } from '@/tw';
import { cn } from '../cn';

type Props = React.ComponentProps<typeof Pressable> & {
  icon: React.ReactNode;
};

export function Add({ icon, className, ...p }: Props) {
  return (
    <Pressable
      className={cn(
        'h-14 w-14 items-center justify-center rounded-full bg-brand shadow-lg active:opacity-90',
        className,
      )}
      {...p}
    >
      {icon}
    </Pressable>
  );
}
