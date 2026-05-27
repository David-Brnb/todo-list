import { Pressable, Text, View } from "@/tw";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable as RNPressable,
  View as RNView,
} from "react-native";
import { cn } from "../cn";

export type Priority = "alta" | "media" | "baja";

type Option = {
  value: Priority;
  label: string;
  color: string;
  icon: SymbolViewProps["name"];
};

const OPTIONS: Option[] = [
  {
    value: "alta",
    label: "Alta",
    color: "#BA1A1A",
    icon: {
      ios: "exclamationmark.triangle.fill",
      android: "priority_high",
      web: "priority_high",
    },
  },
  {
    value: "media",
    label: "Media",
    color: "#D97706",
    icon: {
      ios: "equal.circle.fill",
      android: "drag_handle",
      web: "drag_handle",
    },
  },
  {
    value: "baja",
    label: "Baja",
    color: "#1E9E5A",
    icon: {
      ios: "arrow.down.circle.fill",
      android: "arrow_downward",
      web: "arrow_downward",
    },
  },
];

const MENU_WIDTH = 180;
const MENU_OFFSET = 4;

type Props = {
  value: Priority;
  onChange?: (value: Priority) => void;
  label?: string;
  className?: string;
};

export function PrioritySelector({
  value,
  onChange,
  label = "Priority",
  className,
}: Props) {
  const anchorRef = useRef<RNView>(null);
  const [menu, setMenu] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  const openMenu = () => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      const screenW = Dimensions.get("window").width;
      const w = Math.max(MENU_WIDTH, width);
      const left = Math.max(8, Math.min(screenW - w - 8, x));
      setMenu({ top: y + height + MENU_OFFSET, left, width: w });
    });
  };
  const close = () => setMenu(null);

  const handleSelect = (next: Priority) => {
    close();
    onChange?.(next);
  };

  return (
    <View className={cn("gap-2 self-stretch", className)}>
      {label ? (
        <Text className="px-1 font-manrope text-sm font-bold leading-5 text-ink-secondary">
          {label}
        </Text>
      ) : null}

      <RNView ref={anchorRef} collapsable={false}>
        <Pressable
          onPress={openMenu}
          className="h-13 flex-row items-center gap-3 self-stretch rounded-xl bg-surface-disabled p-4"
        >
          <View
            className="h-[18px] w-1 rounded-full"
            style={{ backgroundColor: current.color }}
          />
          <Text className="flex-1 font-inter text-sm font-medium leading-5 text-ink">
            {current.label}
          </Text>
          <SymbolView
            name={{
              ios: "chevron.down",
              android: "expand_more",
              web: "expand_more",
            }}
            size={14}
            tintColor="#727785"
          />
        </Pressable>
      </RNView>

      <Modal visible={!!menu} transparent animationType="fade" onRequestClose={close}>
        <RNPressable onPress={close} style={{ flex: 1 }}>
          {menu ? (
            <RNView
              style={{
                position: "absolute",
                top: menu.top,
                left: menu.left,
                width: menu.width,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E0E2EC",
                overflow: "hidden",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              {OPTIONS.map((opt, i) => {
                const isSelected = opt.value === value;
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => handleSelect(opt.value)}
                    className={cn(
                      "flex-row items-center gap-3 px-4 py-3",
                      i < OPTIONS.length - 1 && "border-b border-surface-sunken",
                      isSelected && "bg-surface-muted",
                    )}
                  >
                    <SymbolView name={opt.icon} size={18} tintColor={opt.color} />
                    <Text
                      className={cn(
                        "flex-1 font-inter text-base text-ink",
                        isSelected && "font-semibold",
                      )}
                    >
                      {opt.label}
                    </Text>
                    {isSelected ? (
                      <SymbolView
                        name={{
                          ios: "checkmark",
                          android: "check",
                          web: "check",
                        }}
                        size={16}
                        tintColor="#005BBF"
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </RNView>
          ) : null}
        </RNPressable>
      </Modal>
    </View>
  );
}
