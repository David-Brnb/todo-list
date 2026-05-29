import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandLogo } from "@/icons";
import { DeleteConfirmModal, ListCard, SearchBar, SectionHeading, TaskCard } from "@/project_components";
import { deleteTask } from "@/services/axios/tasks/deleteTask";
import { setTaskCompleted } from "@/services/axios/tasks/setTaskCompleted";
import { search } from "@/services/axios/search/search";
import { ScrollView, Text, View } from "@/tw";
import { SearchResultDTO } from "@/types/search/searchResult";

const EMPTY_RESULTS: SearchResultDTO = { taskLists: [], tasks: [] };

export default function ExploreScreen() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResultDTO>(EMPTY_RESULTS);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Search refreshes every 3 characters typed to avoid a call per keystroke.
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      setResults(EMPTY_RESULTS);
      return;
    }
    if (trimmed.length % 3 !== 0) return;
    search(trimmed).then(setResults);
  }, [query]);

  // Same optimistic toggle behavior as the task list detail screen.
  const handleToggleCompleted = async (taskId: number) => {
    const target = results.tasks.find((task) => task.id === taskId);
    if (!target) return;

    const nextCompleted = !target.completed;
    setResults((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: nextCompleted } : task,
      ),
    }));

    try {
      await setTaskCompleted(taskId, nextCompleted);
    } catch {
      setResults((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: target.completed } : task,
        ),
      }));
    }
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete == null) return;

    const deletedId = taskToDelete;
    setTaskToDelete(null);
    setResults((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== deletedId),
    }));

    try {
      await deleteTask(deletedId);
    } catch {
      const trimmed = query.trim();
      if (trimmed.length > 0) search(trimmed).then(setResults);
    }
  };

  const hasQuery = query.trim().length > 0;
  const hasResults = results.taskLists.length > 0 || results.tasks.length > 0;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]} className="bg-[#F9F9FF]">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>

      <View className="px-6 pt-4 pb-2">
        <SearchBar value={query} onChangeText={setQuery} autoCapitalize="none" />
      </View>

      {!hasQuery ? (
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <SymbolView
            name={{ ios: "magnifyingglass", android: "search", web: "search" }}
            size={40}
            tintColor="#C1C6D6"
          />
          <Text className="font-inter text-base text-ink-secondary">Search something</Text>
        </View>
      ) : !hasResults ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="font-inter text-base text-ink-secondary">No results found</Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Lists */}
          {results.taskLists.length > 0 ? (
            <View className="gap-6 mb-10">
              <SectionHeading title="Lists" count={results.taskLists.length} />
              <View className="flex-row flex-wrap justify-between">
                {results.taskLists.map((list) => (
                  <View key={list.id} style={{ width: "48%" }} className="mb-4">
                    <ListCard
                      title={list.name}
                      taskCount={results.tasks.filter((t) => t.taskListIds?.includes(list.id)).length}
                      color={list.color}
                      onPress={() => router.push(`/tasklist/${list.id}`)}
                      icon={
                        <SymbolView
                          name={{
                            ios: (list.icon?.iosName || list.icon?.name || "circle") as any,
                            android: (list.icon?.androidName || list.icon?.name || "circle") as any,
                            web: (list.icon?.androidName || list.icon?.name || "circle") as any,
                          }}
                          size={20}
                          tintColor="#FFFFFF"
                        />
                      }
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Tasks */}
          {results.tasks.length > 0 ? (
            <View className="gap-6">
              <SectionHeading title="Tasks" count={results.tasks.length} />
              <View className="gap-3">
                {results.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    color={task.taskListColor || "#005BBF"}
                    isCompleted={task.completed}
                    onToggle={() => handleToggleCompleted(task.id)}
                    onUpdate={() =>
                      router.push({
                        pathname: "/tasklist/edit-task",
                        params: { id: task.id, color: task.taskListColor || "#005BBF" },
                      })
                    }
                    onDelete={() => setTaskToDelete(task.id)}
                  />
                ))}
              </View>
            </View>
          ) : null}
        </ScrollView>
      )}

      {/* Delete confirmation */}
      <DeleteConfirmModal
        visible={taskToDelete !== null}
        onConfirm={handleConfirmDelete}
        onClose={() => setTaskToDelete(null)}
      />
    </SafeAreaView>
  );
}
