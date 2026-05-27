import { Pressable, Text, View } from "@/tw";
import { useRef, useState } from "react";
import { Dimensions, Modal, View as RNView } from "react-native";
import { cn } from "../cn";
import { BodyText, Caption, HeadingM } from "../typography/typography";
import { Checkbox } from "./checkbox";

type Props = {
  title: string;
  description?: string;
  color: string;
  isCompleted?: boolean;
  onPress?: () => void;
  onToggle?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  className?: string;
};

const MENU_WIDTH = 160;
const MENU_OFFSET = 4;

export function TaskCard({
  title,
  description,
  color,
  isCompleted,
  onPress,
  onToggle,
  onUpdate,
  onDelete,
  className,
}: Props) {
  const anchorRef = useRef<RNView>(null);
  const [menu, setMenu] = useState<{ top: number; left: number } | null>(null);

  const openMenu = () => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      const screenW = Dimensions.get("window").width;
      const left = Math.max(
        8,
        Math.min(screenW - MENU_WIDTH - 8, x + width - MENU_WIDTH),
      );
      setMenu({ top: y + height + MENU_OFFSET, left });
    });
  };
  const close = () => setMenu(null);
  const handleUpdate = () => {
    close();
    onUpdate?.();
  };
  const handleDelete = () => {
    close();
    onDelete?.();
  };

  return (
    <>
      <Pressable
        onPress={onPress}
        className={cn(
          "flex-row items-center gap-4 rounded-xl bg-surface p-4 shadow-sm",
          isCompleted && "opacity-80",
          className,
        )}
        style={
          !isCompleted
            ? { borderLeftWidth: 4, borderLeftColor: color }
            : undefined
        }
      >
        <Checkbox checked={!!isCompleted} onPress={onToggle} />

        <View className="flex-1 gap-0.5">
          {isCompleted ? (
            <BodyText className="text-sm font-semibold text-ink-secondary line-through">
              {title}
            </BodyText>
          ) : (
            <HeadingM className="text-sm">{title}</HeadingM>
          )}
          {description ? (
            <Caption
              className={cn(isCompleted && "text-ink-secondary opacity-60")}
            >
              {description}
            </Caption>
          ) : null}
        </View>

        <RNView ref={anchorRef} collapsable={false}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Task options"
            hitSlop={8}
            onPress={openMenu}
            className="h-8 w-8 items-center justify-center rounded-full"
          >
            <Text className="font-inter text-xl leading-5 text-ink-secondary">
              ⋮
            </Text>
          </Pressable>
        </RNView>
      </Pressable>

      <Modal
        visible={!!menu}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable onPress={close} style={{ flex: 1 }}>
          {menu ? (
            <RNView
              style={{
                position: "absolute",
                top: menu.top,
                left: menu.left,
                width: MENU_WIDTH,
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
              <Pressable
                onPress={handleUpdate}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E0E2EC",
                }}
              >
                <Text className="font-inter text-base text-ink">Editar</Text>
              </Pressable>
              <Pressable
                onPress={handleDelete}
                style={{ paddingHorizontal: 16, paddingVertical: 12 }}
              >
                <Text className="font-inter text-base text-danger">
                  Eliminar
                </Text>
              </Pressable>
            </RNView>
          ) : null}
        </Pressable>
      </Modal>
    </>
  );
}
