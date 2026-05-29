import { Text, View } from "@/tw";
import { SymbolView } from "expo-symbols";
import { Modal, Pressable } from "react-native";
import { Button } from "../button/button";

type ErrorModalProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
  title?: string;
  actionText?: string;
  onAction?: () => void;
};

export function ErrorModal({
  visible,
  message,
  onClose,
  title = "Something, went wrong",
  actionText,
  onAction,
}: ErrorModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{ flex: 1, backgroundColor: "rgba(15, 23, 42, 0.6)" }}
        className="justify-center items-center px-6"
      >
        <View className="w-full max-w-sm rounded-3xl bg-surface p-6 items-center border border-border shadow-2xl">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-4">
            <SymbolView
              name={{
                ios: "exclamationmark.circle.fill",
                android: "error",
                web: "error",
              }}
              size={36}
              tintColor="#EF4444"
            />
          </View>
          <Text className="font-manrope text-xl font-bold text-ink mb-2 text-center">
            {title}
          </Text>
          <Text className="font-inter text-sm text-ink-secondary mb-6 text-center leading-relaxed">
            {message}
          </Text>
          <View className="w-full gap-2">
            <Button
              text={actionText || "Entendido"}
              bgColor="#005BBF"
              textColor="#FFFFFF"
              onClick={() => {
                if (onAction) {
                  onAction();
                } else {
                  onClose();
                }
              }}
            />
            {actionText ? (
              <Pressable onPress={onClose} className="w-full items-center py-2 mt-1 active:opacity-70">
                <Text className="font-inter text-sm font-semibold text-gray-500">Cancelar</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}
