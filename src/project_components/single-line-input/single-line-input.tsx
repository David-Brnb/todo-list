import { TextInput, View } from "@/tw";
import { useState } from "react";
import { cn } from "../cn";
import { Caption, Label } from "../typography/typography";

type Props = React.ComponentProps<typeof TextInput> & {
  label?: string;
  containerClassName?: string;
  showCounter?: boolean;
};

export function SingleLineInput({
  label,
  className,
  containerClassName,
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
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChangeText={(text) => {
          if (value === undefined) setInternal(text);
          onChangeText?.(text);
        }}
        multiline={false}
        numberOfLines={1}
        textAlignVertical="center"
        placeholderTextColor="rgba(114, 119, 133, 0.6)"
        className={cn(
          "h-14 rounded-xl border border-border bg-surface px-5 font-inter text-base leading-none text-ink",
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
