import { Button, DatePicker, ErrorModal, LoadingModal, MultilineInput, PrioritySelector, SingleLineInput, type Priority } from "@/project_components";
import { getTaskById } from "@/services/axios/tasks/getTaskById";
import { updateTask } from "@/services/axios/tasks/updateTask";
import { Pressable, ScrollView, Text, View } from "@/tw";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

// Maps the selector values to the backend Priority enum and back.
const PRIORITY_TO_BACKEND: Record<Priority, "HIGH" | "MEDIUM" | "LOW"> = {
  alta: "HIGH",
  media: "MEDIUM",
  baja: "LOW",
};
const PRIORITY_TO_SELECTOR: Record<string, Priority> = {
  HIGH: "alta",
  MEDIUM: "media",
  LOW: "baja",
};

export default function EditTaskScreen() {
  const { id, color } = useLocalSearchParams<{ id: string; color?: string }>();
  const taskId = Number(id);
  const accentColor = color || "#005BBF";

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("media");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  // Preserved from the fetched task so the update doesn't drop them.
  const [completed, setCompleted] = useState<boolean>(false);
  const [taskListIds, setTaskListIds] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getTaskById(taskId)
      .then((task) => {
        setTitle(task.title);
        setDescription(task.description || "");
        setPriority(PRIORITY_TO_SELECTOR[task.priority] || "media");
        if (task.dueDate) setDueDate(new Date(task.dueDate));
        setCompleted(task.completed);
        setTaskListIds(task.taskListIds || []);
      })
      .catch(() => {
        setErrorMessage("Could not load the task. Please try again.");
        setErrorVisible(true);
      })
      .finally(() => setLoading(false));
  }, [taskId]);

  const handleSave = async () => {
    if (title.trim() === "") {
      setErrorMessage("Please enter a task title.");
      setErrorVisible(true);
      return;
    }

    setSaving(true);
    try {
      await updateTask(taskId, {
        title: title.trim(),
        description: description.trim(),
        // ISO LocalDateTime without timezone, e.g. "2026-05-28T14:30:00"
        dueDate: dueDate.toISOString().split(".")[0],
        priority: PRIORITY_TO_BACKEND[priority],
        completed,
        taskListIds,
      });
      router.back();
    } catch {
      setErrorMessage("Something went wrong updating the task. Please try again.");
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
          Edit Task
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
          <ActivityIndicator size="large" color={accentColor} />
        </View>
      ) : (
      /* Main Content */
      <ScrollView>
        <View className="flex-1 px-6 py-10">
          <View className="gap-4">
            <SingleLineInput
              label="Task Title"
              placeholder="Enter task name"
              value={title}
              onChangeText={setTitle}
            />
            <MultilineInput
              label="Description"
              placeholder="Enter task description"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View className="mt-6 flex-row gap-4">
            <View className="flex-1">
              <DatePicker value={dueDate} onChange={setDueDate} />
            </View>
            <View className="flex-1">
              <PrioritySelector value={priority} onChange={setPriority} />
            </View>
          </View>

          {/* Save button */}
          <View className="mt-10 w-full">
            <Button
              text="Save Changes"
              bgColor={accentColor}
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
