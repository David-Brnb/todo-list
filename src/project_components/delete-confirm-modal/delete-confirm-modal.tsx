import { Pressable, Text, View } from "@/tw";
import { SymbolView } from "expo-symbols";
import { Modal } from "react-native";
import { Button } from "../button/button";
import { IconBadge } from "../icon-badge/icon-badge";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

export function DeleteConfirmModal({
  visible,
  onConfirm,
  onClose,
  title = "Delete Task?",
  message = "This action cannot be undone. This task will be permanently removed from the list.",
  confirmText = "Delete Task",
  cancelText = "Cancel",
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop — tap to dismiss */}
      <Pressable
        onPress={onClose}
        style={{ flex: 1, backgroundColor: "rgba(25, 28, 35, 0.6)" }}
        className="items-center justify-center px-6"
      >
        {/* Card — stop propagation so taps inside don't close it */}
        <Pressable
          onPress={() => {}}
          style={{ width: 326, maxWidth: 384 }}
          className="items-center gap-6 rounded-3xl bg-white p-6 shadow-2xl"
        >
          {/* Header / Icon */}
          <View className="items-center">
            <IconBadge
              size={64}
              color="rgba(255, 218, 214, 0.3)"
              icon={
                <SymbolView
                  name={{ ios: "trash.fill", android: "delete", web: "delete" }}
                  size={28}
                  tintColor="#BA1A1A"
                />
              }
            />
            <Text
              style={{ fontFamily: "Manrope_700Bold", letterSpacing: -0.5 }}
              className="mt-4 text-xl leading-7 text-[#191C23]"
            >
              {title}
            </Text>
            <Text className="mt-2 text-center font-inter text-sm leading-6 text-[#414754]">
              {message}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="w-full gap-3">
            <Button
              text={confirmText}
              bgColor="#BA1A1A"
              textColor="#FFFFFF"
              onClick={onConfirm}
            />
            <Button
              text={cancelText}
              bgColor="#E6E8F2"
              textColor="#3D5481"
              onClick={onClose}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
