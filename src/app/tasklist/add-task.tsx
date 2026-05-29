import { Button, DatePicker, ErrorModal, LoadingModal, MultilineInput, PrioritySelector, SingleLineInput, type Priority } from "@/project_components";
import { registerTask } from "@/services/axios/tasks/registerTask";
import { Pressable, ScrollView, Text, View } from "@/tw";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useState } from "react";

// Maps the selector values to the backend Priority enum (HIGH | MEDIUM | LOW).
const PRIORITY_MAP: Record<Priority, "HIGH" | "MEDIUM" | "LOW"> = {
  alta: "HIGH",
  media: "MEDIUM",
  baja: "LOW",
};

export default function AddTaskScreen() {
  const { id, color } = useLocalSearchParams<{ id: string; color?: string }>();
  const accentColor = color || "#005BBF";

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("media");
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const [loading, setLoading] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleCreateTask = async () => {
    if (title.trim() === "") {
      setErrorMessage("Please enter a task title.");
      setErrorVisible(true);
      return;
    }

    setLoading(true);
    try {
      await registerTask({
        title: title.trim(),
        description: description.trim(),
        // ISO LocalDateTime without timezone, e.g. "2026-05-28T14:30:00"
        dueDate: dueDate.toISOString().split(".")[0],
        priority: PRIORITY_MAP[priority],
        completed: false,
        taskListIds: [Number(id)],
      });
      router.back();
    } catch {
      setErrorMessage("Something went wrong creating the task. Please try again.");
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F9F9FF]">
      {/* status bar matches iOS modal presentation */}
      <StatusBar style="light" />

      {/* Header with Close Button */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-surface-sunken">
        <Text style={{ fontFamily: "Manrope_700Bold" }} className="text-xl text-[#191C23]">
          New Task
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

      {/* Main Content */}
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

          {/* Create button */}
          <View className="mt-10 w-full">
            <Button
              text="Add Task"
              bgColor={accentColor}
              textColor="#FFFFFF"
              onClick={handleCreateTask}
            />
          </View>
        </View>
      </ScrollView>

      <ErrorModal
        visible={errorVisible}
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
      />

      <LoadingModal visible={loading} message="Creating task..." />
    </View>
  );
}
