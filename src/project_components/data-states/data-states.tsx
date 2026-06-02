import { ActivityIndicator } from "react-native";
import { SymbolView, type SymbolViewProps } from "expo-symbols";

import { Text, View } from "@/tw";
import { cn } from "../cn";

const BRAND = "#005BBF";

type LoadingStateProps = {
  message?: string;
  color?: string;
  className?: string;
};

/** Centered spinner for initial data loads. */
export function LoadingState({
  message,
  color = BRAND,
  className,
}: LoadingStateProps) {
  return (
    <View className={cn("flex-1 items-center justify-center gap-3 px-6 py-12", className)}>
      <ActivityIndicator size="large" color={color} />
      {message ? (
        <Text className="font-inter text-base text-ink-secondary text-center">
          {message}
        </Text>
      ) : null}
    </View>
  );
}

type EmptyStateProps = {
  title: string;
  message?: string;
  icon?: SymbolViewProps["name"];
  className?: string;
};

/** Friendly placeholder shown when a request returns (or degrades to) no data. */
export function EmptyState({
  title,
  message,
  icon = { ios: "tray", android: "inbox", web: "inbox" },
  className,
}: EmptyStateProps) {
  return (
    <View className={cn("flex-1 items-center justify-center gap-3 px-6 py-12", className)}>
      <SymbolView name={icon} size={40} tintColor="#C1C6D6" />
      <Text className="font-manrope text-lg font-bold text-ink text-center">
        {title}
      </Text>
      {message ? (
        <Text className="font-inter text-sm text-ink-secondary text-center leading-relaxed">
          {message}
        </Text>
      ) : null}
    </View>
  );
}
