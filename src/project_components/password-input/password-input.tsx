import { Pressable, Text, TextInput, View } from "@/tw";
import { useState } from "react";
import { cn } from "../cn";
import { Caption, Label } from "../typography/typography";

type Props = Omit<React.ComponentProps<typeof TextInput>, "secureTextEntry"> & {
  label?: string;
  containerClassName?: string;
  showToggle?: boolean;
  showCounter?: boolean;
};

export function PasswordInput({
  label,
  className,
  containerClassName,
  showToggle = true,
  showCounter = true,
  value,
  defaultValue,
  onChangeText,
  maxLength,
  ...p
}: Props) {
  const [visible, setVisible] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;
  const displayCounter = showCounter && typeof maxLength === "number";

  return (
    <View className={cn("w-full", containerClassName)}>
      {label ? <Label className="mb-1 px-1">{label}</Label> : null}
      <View className="relative">
        <TextInput
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChangeText={(text) => {
            if (value === undefined) setInternal(text);
            onChangeText?.(text);
          }}
          placeholderTextColor="rgba(114, 119, 133, 0.6)"
          className={cn(
            "h-14 rounded-xl border border-border bg-surface px-5 font-inter text-base text-ink",
            showToggle && "pr-16",
            className,
          )}
          {...p}
        />
        {showToggle ? (
          <Pressable
            onPress={() => setVisible((v) => !v)}
            className="absolute right-3 top-0 bottom-0 justify-center px-2"
          >
            <Text className="font-inter text-xs font-semibold uppercase text-brand">
              {visible ? "Hide" : "Show"}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {displayCounter ? (
        <Caption className="mt-1 px-1 text-right">
          {current.length}/{maxLength}
        </Caption>
      ) : null}
    </View>
  );
}
