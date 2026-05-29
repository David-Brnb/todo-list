import { TextInput, View } from "@/tw";
import { useState } from "react";
import { cn } from "../cn";
import { Caption, Label } from "../typography/typography";

type Props = React.ComponentProps<typeof TextInput> & {
  label?: string;
  containerClassName?: string;
  rows?: number;
  showCounter?: boolean;
};

export function MultilineInput({
  label,
  className,
  containerClassName,
  rows = 4,
  showCounter = true,
  value,
  defaultValue,
  onChangeText,
  maxLength,
  ...p
}: Props) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;
  const displayCounter = showCounter && typeof maxLength === "number";

  return (
    <View className={cn("w-full", containerClassName)}>
      {label ? <Label className="mb-1 px-1">{label}</Label> : null}
      <TextInput
        multiline
        textAlignVertical="top"
        numberOfLines={rows}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChangeText={(text) => {
          if (value === undefined) setInternal(text);
          onChangeText?.(text);
        }}
        placeholderTextColor="rgba(114, 119, 133, 0.6)"
        // Pad via style: multiline TextInput doesn't reliably apply vertical
        // padding from className, so the top inset would be dropped.
        style={{ padding: 16 }}
        className={cn(
          "min-h-[106px] rounded-xl border border-border bg-surface font-inter text-base text-ink",
          className,
        )}
        {...p}
      />
      {displayCounter ? (
        <Caption className="mt-1 px-1 text-right">
          {current.length}/{maxLength}
        </Caption>
      ) : null}
    </View>
  );
}
