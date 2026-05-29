import { Button, ColorSwatch, ColorWheel, ErrorModal, IconSwatch, LoadingModal, MultilineInput, SingleLineInput, cn } from "@/project_components";
import { Pressable, ScrollView, Text, View } from "@/tw";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { getIcons } from "@/services/axios/icons/getIcons";
import { getTaskList } from "@/services/axios/tasklists/getTaskList";
import { updateTaskList } from "@/services/axios/tasklists/updateTaskList";
import { Color, colorsList } from "@/types/colors/color";
import { IconDTO } from "@/types/icons/iconDTO";

export default function EditTaskListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskListId = Number(id);

  const [taskListTitle, setTaskListTitle] = useState<string>("");
  const [listDescription, setListDescription] = useState<string>("");
  const [listColor, setListColor] = useState<string>("");
  const [listIcon, setListIcon] = useState<number>(0);

  const [isCustomActive, setIsCustomActive] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>("");

  const [iconList, setIconList] = useState<IconDTO[]>([]);

  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [icons, list] = await Promise.all([
          getIcons(),
          getTaskList(taskListId),
        ]);
        setIconList(icons);
        if (list) {
          setTaskListTitle(list.name);
          setListDescription(list.description);
          setListColor(list.color);
          setListIcon(list.icon?.id ?? 0);
          // If the saved color isn't one of the presets, open the custom panel.
          const isPreset = colorsList.some(
            (c) => c.color.toUpperCase() === list.color?.toUpperCase(),
          );
          if (!isPreset && list.color) {
            setIsCustomActive(true);
            setCustomColor(list.color);
          }
        }
      } catch {
        setErrorMessage("Could not load the task list. Please try again.");
        setErrorVisible(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [taskListId]);

  const handleSave = async () => {
    if (taskListTitle.trim() === "") {
      setErrorMessage("Please enter a task list name.");
      setErrorVisible(true);
      return;
    }
    if (listDescription.trim() === "") {
      setErrorMessage("Please enter a description.");
      setErrorVisible(true);
      return;
    }
    if (listColor.trim() === "") {
      setErrorMessage("Please select a color.");
      setErrorVisible(true);
      return;
    }
    if (listIcon === 0) {
      setErrorMessage("Please select an icon.");
      setErrorVisible(true);
      return;
    }

    setSaving(true);
    try {
      await updateTaskList(taskListId, {
        name: taskListTitle,
        color: listColor,
        description: listDescription,
        iconId: listIcon,
      });
      router.back();
    } catch {
      setErrorMessage("Something went wrong updating the list. Please try again.");
      setErrorVisible(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F9F9FF]">
      {/* status bar matches iOS modal presentation */}
      <StatusBar style="light" />
      {/* Header with Close Button */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-surface-sunken">
        <Text style={{ fontFamily: "Manrope_700Bold" }} className="text-xl text-[#191C23]">
          Edit Task List
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="h-8 w-8 items-center justify-center rounded-full bg-surface-sunken active:opacity-80"
        >
          <SymbolView
            name={{ ios: "xmark", android: "close", web: "close" }}
            size={18}
            tintColor="#60646C"
          />
        </Pressable>
      </View>

      {/* Initial load — inline (not a Modal, which would break touch on the
          sheet after dismissing during the entry animation). */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={listColor || "#005BBF"} />
        </View>
      ) : (
      /* Main Content */
      <ScrollView>
        <View className="flex-1 px-6 py-10">
          <View className="gap-4">
            <SingleLineInput placeholder="Enter task list name" value={taskListTitle} onChangeText={setTaskListTitle}  label="List Title"/>
            <MultilineInput placeholder="Enter list description" value={listDescription} onChangeText={setListDescription} label="Description"/>
          </View>

          <View className="gap-3 mt-6 items-center w-full">
            <View className="w-full py-2">
              <Text className="font-inter text-sm font-semibold text-ink-secondary">Select Color</Text>
            </View>
            <View className="flex-row gap-4">
              {colorsList.slice(0, 4).map((color: Color) => (
                <ColorSwatch
                  key={color.id}
                  color={color.color}
                  onPress={() => {
                    setListColor(color.color);
                    setIsCustomActive(false);
                  }}
                  selected={!isCustomActive && listColor === color.color}
                  size={80}
                />
              ))}
            </View>
            <View className="flex-row gap-4">
              {colorsList.slice(4, 7).map((color: Color) => (
                <ColorSwatch
                  key={color.id}
                  color={color.color}
                  onPress={() => {
                    setListColor(color.color);
                    setIsCustomActive(false);
                  }}
                  selected={!isCustomActive && listColor === color.color}
                  size={80}
                />
              ))}

              {/* Custom Color Swatch */}
              <Pressable
                onPress={() => {
                  setIsCustomActive(true);
                  const defaultCustom = "#E07A5F";
                  if (!customColor) {
                    setCustomColor(defaultCustom);
                    setListColor(defaultCustom);
                  } else {
                    setListColor(customColor);
                  }
                }}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: isCustomActive ? (customColor || "#E07A5F") : '#EAEAEF'
                }}
                className={cn(
                  'items-center justify-center rounded-2xl will-change-variable',
                  isCustomActive && 'border-4 border-canvas shadow-[0_0_0_4px_var(--color-brand-softer)]'
                )}
              >
                <SymbolView
                  name={{ ios: "paintpalette.fill", android: "palette", web: "palette" }}
                  size={28}
                  tintColor={isCustomActive ? "white" : "#60646C"}
                />
              </Pressable>
            </View>
          </View>

          {isCustomActive && (
            <View className="mt-6 gap-4 w-full bg-white p-5 rounded-2xl border border-surface-sunken">
              <Text style={{ fontFamily: "Manrope_700Bold" }} className="text-sm font-semibold text-ink-secondary">
                Custom Color Palette
              </Text>

              {/* Circular color wheel */}
              <View className="items-center py-1">
                <ColorWheel
                  size={240}
                  value={customColor}
                  onColorChange={(hex) => {
                    setListColor(hex);
                    setCustomColor(hex);
                  }}
                />
              </View>

              {/* Selected color preview */}
              <View className="flex-row items-center gap-3">
                <View
                  style={{ backgroundColor: listColor || "#FFFFFF" }}
                  className="h-8 w-8 rounded-full border border-surface-sunken"
                />
                <Text className="font-inter text-sm font-medium text-ink-secondary">
                  {listColor || "#------"}
                </Text>
              </View>

              {/* Custom Hex input */}
              <SingleLineInput
                placeholder="#FFFFFF"
                value={listColor}
                onChangeText={(text) => {
                  let formatted = text.toUpperCase();
                  if (formatted.length > 0 && !formatted.startsWith("#")) {
                    formatted = "#" + formatted;
                  }
                  // Only allow valid hex length and hex chars
                  if (formatted.length <= 7 && /^#[0-9A-F]*$/.test(formatted)) {
                    setListColor(formatted);
                    if (formatted.length === 7) {
                      setCustomColor(formatted);
                    }
                  }
                }}
                label="Hex Color Code"
                autoCapitalize="characters"
                maxLength={7}
              />
            </View>
          )}

          {/* Icon picker */}
          <View className="gap-3 mt-6 w-full">
            <View className="w-full py-2">
              <Text className="font-inter text-sm font-semibold text-ink-secondary">Select Icon</Text>
            </View>
            {Array.from({ length: Math.ceil(iconList.length / 5) }).map((_, rowIndex) => (
              <View key={rowIndex} className="flex-row justify-between w-full">
                {iconList.slice(rowIndex * 5, rowIndex * 5 + 5).map((icon: IconDTO) => (
                  <IconSwatch
                    key={icon.id}
                    selected={listIcon === icon.id}
                    onPress={() => setListIcon(icon.id)}
                    icon={
                      <SymbolView
                        name={{
                          ios: (icon.iosName || "circle") as any,
                          android: (icon.androidName || "circle") as any,
                          web: (icon.androidName || "circle") as any,
                        }}
                        size={28}
                        tintColor={listIcon === icon.id ? "#005BBF" : "#60646C"}
                      />
                    }
                  />
                ))}
              </View>
            ))}
          </View>

          {/* Save button */}
          <View className="mt-10 w-full">
            <Button
              text="Save Changes"
              bgColor="#005BBF"
              textColor="#FFFFFF"
              onClick={handleSave}
            />
          </View>
        </View>
      </ScrollView>
      )}

      <ErrorModal
        visible={errorVisible}
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
      />

      <LoadingModal visible={saving} message="Saving changes..." />
    </View>
  );
}
