import { Pressable, Text, View } from "@/tw";
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { SymbolView } from "expo-symbols";
import { useMemo, useState } from "react";
import { Modal, Platform, Pressable as RNPressable } from "react-native";
import { cn } from "../cn";

type Props = {
  value: Date | string;
  onChange?: (date: Date) => void;
  label?: string;
  placeholder?: string;
  className?: string;
};

function toDate(value: Date | string): Date {
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
}

function formatDateTime(d: Date): string {
  const date = d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date}, ${time}`;
}

export function DatePicker({
  value,
  onChange,
  label = "Due Date",
  placeholder,
  className,
}: Props) {
  const current = useMemo(() => toDate(value), [value]);
  const [iosStage, setIosStage] = useState<"date" | "time" | null>(null);
  const [iosDraft, setIosDraft] = useState<Date>(current);

  const handleOpen = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: current,
        mode: "date",
        onChange: (_e: DateTimePickerEvent, picked?: Date) => {
          if (!picked) return;
          DateTimePickerAndroid.open({
            value: picked,
            mode: "time",
            is24Hour: false,
            onChange: (
              __e: DateTimePickerEvent,
              pickedTime?: Date,
            ) => {
              if (!pickedTime) return;
              const merged = new Date(picked);
              merged.setHours(pickedTime.getHours(), pickedTime.getMinutes());
              onChange?.(merged);
            },
          });
        },
      });
      return;
    }
    setIosDraft(current);
    setIosStage("date");
  };

  const closeIos = () => setIosStage(null);

  const handleIosConfirm = () => {
    if (iosStage === "date") {
      setIosStage("time");
      return;
    }
    onChange?.(iosDraft);
    closeIos();
  };

  const displayText = placeholder && !value ? placeholder : formatDateTime(current);

  return (
    <View className={cn("gap-2 self-stretch", className)}>
      {label ? (
        <Text className="px-1 font-manrope text-sm font-bold leading-5 text-ink-secondary">
          {label}
        </Text>
      ) : null}

      <Pressable
        onPress={handleOpen}
        className="h-18 flex-row items-center gap-3 self-stretch rounded-xl bg-surface-disabled p-4"
      >
        <SymbolView
          name={{ ios: "calendar", android: "calendar_today", web: "calendar_today" }}
          size={20}
          tintColor="#005BBF"
        />
        <Text className="flex-1 font-inter text-sm font-medium leading-5 text-ink">
          {displayText}
        </Text>
      </Pressable>

      {Platform.OS === "ios" ? (
        <Modal
          visible={iosStage !== null}
          transparent
          animationType="fade"
          onRequestClose={closeIos}
        >
          <RNPressable
            onPress={closeIos}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "flex-end",
            }}
          >
            <RNPressable
              onPress={() => {}}
              style={{
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                paddingBottom: 24,
              }}
            >
              <View className="flex-row items-center justify-between p-4">
                <Pressable onPress={closeIos} hitSlop={8}>
                  <Text className="font-inter text-base text-ink-secondary">
                    Cancel
                  </Text>
                </Pressable>
                <Text className="font-manrope text-base font-bold text-ink">
                  {iosStage === "date" ? "Select date" : "Select time"}
                </Text>
                <Pressable onPress={handleIosConfirm} hitSlop={8}>
                  <Text className="font-inter text-base font-semibold text-brand">
                    {iosStage === "date" ? "Next" : "Done"}
                  </Text>
                </Pressable>
              </View>
              {iosStage ? (
                <DateTimePicker
                  value={iosDraft}
                  mode={iosStage}
                  display="spinner"
                  onChange={(_e: DateTimePickerEvent, picked?: Date) => {
                    if (picked) setIosDraft(picked);
                  }}
                />
              ) : null}
            </RNPressable>
          </RNPressable>
        </Modal>
      ) : null}
    </View>
  );
}
