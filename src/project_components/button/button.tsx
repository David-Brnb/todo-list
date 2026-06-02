import { Pressable, Text } from '@/tw';

type Props = {
  text: string;
  bgColor: string;
  textColor: string;
  onClick?: () => void;
};

export function Button({ text, bgColor, textColor, onClick }: Props) {
  return (
    <Pressable
      onPress={onClick}
      style={{ backgroundColor: bgColor }}
      className="h-14 w-full items-center justify-center rounded-xl px-4 active:opacity-90"
    >
      <Text
        style={{ color: textColor }}
        className="font-manrope text-base font-bold tracking-wide"
      >
        {text}
      </Text>
    </Pressable>
  );
}
