import { Image } from 'expo-image';
import { View } from '@/tw';
import { cn } from '../cn';

type Props = {
  source?: string;
  size?: 32 | 40 | 64;
  ring?: boolean;
  className?: string;
};

export function Avatar({ source, size = 40, ring, className }: Props) {
  return (
    <View
      style={{ width: size, height: size }}
      className={cn(
        'overflow-hidden rounded-full bg-surface-sunken',
        ring && 'border-2 border-brand-soft',
        className,
      )}
    >
      {source ? (
        <Image source={{ uri: source }} style={{ width: size, height: size }} contentFit="cover" />
      ) : null}
    </View>
  );
}
