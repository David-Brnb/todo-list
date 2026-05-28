import { ActivityIndicator, Modal } from "react-native";
import { Text, View } from "@/tw";

type LoadingModalProps = {
  visible: boolean;
  message?: string;
};

export function LoadingModal({
  visible,
  message = "Iniciando sesión...",
}: LoadingModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View
        style={{ flex: 1, backgroundColor: "rgba(15, 23, 42, 0.65)" }}
        className="justify-center items-center"
      >
        <View className="rounded-3xl bg-surface p-8 items-center border border-border shadow-2xl w-48">
          <ActivityIndicator size="large" color="#005BBF" />
          <Text className="font-manrope text-sm font-semibold text-ink mt-5 text-center">
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
