import { TextInput, View } from "@/tw";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { cn } from "../cn";

type Props = React.ComponentProps<typeof TextInput> & {
  value?: string;
  placeholder?: string;
  containerClassName?: string;
};

export function SearchBar({
  value,
  defaultValue,
  placeholder = "Search tasks, lists, or notes...",
  onChangeText,
  className,
  containerClassName,
  ...p
}: Props) {
  const [internal, setInternal] = useState(defaultValue ?? "");

  return (
    <View
      className={cn(
        "h-14 w-full flex-row items-center self-stretch rounded-xl bg-surface-disabled px-4",
        containerClassName,
      )}
    >
      <SymbolView
        name={{
          ios: "magnifyingglass",
          android: "search",
          web: "search",
        }}
        size={20}
        tintColor="#727785"
      />
      <TextInput
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        placeholderTextColor="#727785"
        onChangeText={(text) => {
          if (value === undefined) setInternal(text);
          onChangeText?.(text);
        }}
        className={cn(
          "ml-3 flex-1 font-inter text-base font-normal text-ink",
          className,
        )}
        {...p}
      />
    </View>
  );
}
