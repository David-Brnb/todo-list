import { getTaskList } from "@/services/axios/tasklists/getTaskList";
import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { BrandLogo } from "@/icons";
import { Pressable, Text, View } from "@/tw";
import { TaskListDTO } from "@/types/listTaskLists";

export default function TaskListDetailScreen() {
  const [taskList, setTaskList] = useState<TaskListDTO | null>(null);

  const { id } = useLocalSearchParams<{ id: string }>();
  const taskListId = Number(id);

  useEffect(() => {
    getTaskList(taskListId).then((response) => {
      setTaskList(response);
    });
  }, [taskListId]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]} className="bg-[#F9F9FF]">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>
      
      {/* Header */}
      <View className="flex-row items-center gap-3 px-5 py-4">
        <Pressable
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center rounded-full bg-surface-sunken active:opacity-80"
        >
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
            size={18}
            tintColor="#60646C"
          />
        </Pressable>
      </View>

      {/* TODO: fetch the task list and its tasks using taskListId */}
      <View className="flex-1 items-center justify-center px-6">
        <Text style={{ fontFamily: "Manrope_800ExtraBold" }} className="text-2xl text-[#191C23]">
          Task List #{taskListId}
        </Text>
      </View>


    </SafeAreaView>
  );
}
