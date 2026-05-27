import { Text, type ViewProps } from "@/tw";
import { cn } from "../cn";

type TextProps = React.ComponentProps<typeof Text>;

export function HeadingXL({ className, ...p }: TextProps) {
  return (
    <Text
      className={cn(
        "font-manrope text-[30px] leading-9 font-extrabold tracking-tight text-ink",
        className,
      )}
      {...p}
    />
  );
}

export function HeadingL({ className, ...p }: TextProps) {
  return (
    <Text
      className={cn(
        "font-manrope text-[20px] leading-7 font-bold text-ink",
        className,
      )}
      {...p}
    />
  );
}

export function HeadingM({ className, ...p }: TextProps) {
  return (
    <Text
      className={cn(
        "font-manrope text-base leading-6 font-semibold text-ink",
        className,
      )}
      {...p}
    />
  );
}

export function BodyText({ className, ...p }: TextProps) {
  return (
    <Text
      className={cn(
        "font-inter text-base leading-6 text-ink-secondary",
        className,
      )}
      {...p}
    />
  );
}

export function Caption({ className, ...p }: TextProps) {
  return (
    <Text
      className={cn(
        "font-inter text-xs leading-4 text-ink-secondary",
        className,
      )}
      {...p}
    />
  );
}

export function Label({ className, ...p }: TextProps) {
  return (
    <Text
      className={cn(
        "font-inter text-[11px] leading-4 font-semibold uppercase tracking-wider text-ink-secondary",
        className,
      )}
      {...p}
    />
  );
}

export function SectionLabel({ className, ...p }: TextProps) {
  return (
    <Text
      className={cn(
        "font-manrope text-xs leading-4 font-bold uppercase tracking-[0.2em] text-ink-secondary",
        className,
      )}
      {...p}
    />
  );
}

export type _Unused = ViewProps;
