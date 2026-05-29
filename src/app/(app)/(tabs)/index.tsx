import { router, useFocusEffect } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandLogo } from "@/icons";
import { Pressable, Text, View } from "@/tw";

import { Add, TaskListMain, TodayCard } from "@/project_components";
import { getUserTaskLists } from "@/services/axios/tasklists/getUserTaskLists";
import { getTodayTasks } from "@/services/axios/tasks/getTodayTasks";
import { useAuthStore } from "@/stores/auth";
import { taskColorDto } from "@/types/taskDto";
import { TaskListWithOldestPendingDTO } from "@/types/taskListWithOldestPending";

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const [todayTasks, setTodayTasks] = useState<taskColorDto[]>([]);
  const [userTaskLists, setUserTaskLists] = useState<TaskListWithOldestPendingDTO[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTodayTasks = useCallback(() => {
    getTodayTasks()
      .then((response) => setTodayTasks(response))
      .catch(() => setTodayTasks([]));
  }, []);

  const fetchTaskLists = useCallback(() => {
    setPage(1);
    setHasMore(true);
    setUserTaskLists([]);
    setLoading(true);

    getUserTaskLists(1)
      .then((response) => {
        setUserTaskLists(response?.items || []);
        setHasMore(response?.hasMore ?? false);
        setPage(2);
      })
      .catch(() => setUserTaskLists([]))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTodayTasks();
      fetchTaskLists();
    }, [fetchTodayTasks, fetchTaskLists])
  );


  const loadMoreTaskLists = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getUserTaskLists(page);
      setUserTaskLists((prev) => [...prev, ...(response?.items || [])]);
      setHasMore(response?.hasMore ?? false);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log("Error al cargar más listas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']} className="bg-[#F9F9FF]">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>

      <FlatList
        data={userTaskLists || []}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="w-full">
            <View className="my-10 gap-1 w-full">
              <Text
                style={{ fontFamily: "Manrope_800ExtraBold", letterSpacing: -0.9 }}
                className="text-[36px] leading-[45px] text-[#191C23]"
              >
                Your Atelier
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-[18px] leading-7 text-[#414754]"
              >
                Focus on what matters today.
              </Text>
            </View>
            
            <View className="gap-1 w-full mb-6">
              <Text className="font-inter text-gray-700">Due today</Text>
              {todayTasks.map((task) => (
                <TodayCard key={task.id} title={task.title} time={task.dueDate} color={task.taskListColor} />
              ))}
            </View>

            <Text className="font-inter text-gray-700 mb-2">Projects</Text>
          </View>
        }
        renderItem={({item}) => (
          <Pressable
            className="mb-4 w-full active:opacity-90"
            onPress={() => router.push(`/tasklist/${item.id}`)}
          >
            <TaskListMain
              tag={item.progress.toString()+"%"}
              title={item.name}
              icon={
                <SymbolView
                  name={{
                    ios: (item.icon?.iosName || item.icon?.name || "circle") as any,
                    android: (item.icon?.androidName || item.icon?.name || "circle") as any,
                    web: (item.icon?.androidName || item.icon?.name || "circle") as any,
                  }}
                  tintColor={item.color}
                  size={24}
                />
              }
              color={item.color}
              progress={item.progress/100}
              lastTaskTitle={item.oldestPendingTask?.title || ""}
            />
          </Pressable>
        )}
        onEndReached={loadMoreTaskLists}
        onEndReachedThreshold={0.5}
      />
      <Add
        icon={<SymbolView name={{ ios: "plus", android: "add", web: "add" }} size={24} tintColor="white" />}
        className="absolute bottom-28 right-12 z-50"
        onPress={() => router.push("/add-tasklist")}
      />
    </SafeAreaView>
  );
}

