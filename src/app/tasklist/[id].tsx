import { getTaskList } from "@/services/axios/tasklists/getTaskList";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Dimensions, Modal, View as RNView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCallback, useRef, useState } from "react";

import { BrandLogo } from "@/icons";
import { Add, DeleteConfirmModal, EmptyState, LoadingState, TaskCard, TaskListHeader, TaskListLite } from "@/project_components";
import { Pressable, Text, View } from "@/tw";
import { deleteTaskList } from "@/services/axios/tasklists/deleteTaskList";
import { deleteTask } from "@/services/axios/tasks/deleteTask";
import { setTaskCompleted } from "@/services/axios/tasks/setTaskCompleted";
import { getTasksByTLId } from "@/types/taskLists/getTaskListTasks";
import { TaskListDTO } from "@/types/taskLists/listTaskLists";
import { TaskDTO } from "@/types/tasks/taskDto";
import { FlatList } from "react-native-gesture-handler";

export default function TaskListDetailScreen() {
  const [taskList, setTaskList] = useState<TaskListDTO | null>(null);
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Header "..." dropdown for the task list itself.
  const LIST_MENU_WIDTH = 180;
  const menuAnchorRef = useRef<RNView>(null);
  const [listMenu, setListMenu] = useState<{ top: number; left: number } | null>(null);
  const [listDeleteVisible, setListDeleteVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useLocalSearchParams<{ id: string }>();
  const taskListId = Number(id);

  const fetchTasks = useCallback(() => {
    return getTasksByTLId(taskListId).then((response) => {
      // Dedupe by id so the FlatList never receives two items with the same key.
      const unique = Array.from(
        new Map(response.map((task) => [task.id, task])).values(),
      );
      setTasks(unique);
    });
  }, [taskListId]);

  // Refetch on focus so returning from the add-task sheet shows new tasks.
  // The spinner only shows on the first load; later focus refetches are silent.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      Promise.all([
        getTaskList(taskListId).then((response) => {
          if (active) setTaskList(response);
        }),
        fetchTasks(),
      ]).finally(() => {
        if (active) setLoading(false);
      });
      return () => {
        active = false;
      };
    }, [taskListId, fetchTasks]),
  );

  // Optimistically toggle the "done" state so the UI reacts instantly, then
  // persist it via PATCH /task/{id}/completed. Roll back if the request fails.
  const handleToggleCompleted = async (taskId: number) => {
    const target = tasks.find((task) => task.id === taskId);
    if (!target) return;

    const nextCompleted = !target.completed;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: nextCompleted } : task,
      ),
    );

    try {
      await setTaskCompleted(taskId, nextCompleted);
    } catch {
      // Revert to the previous state if the backend update fails.
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: target.completed } : task,
        ),
      );
    }
  };

  // Delete a task: optimistically remove it, then call DELETE /task/{id}.
  // Restore from the backend if the request fails.
  const handleConfirmDelete = async () => {
    if (taskToDelete == null) return;

    const deletedId = taskToDelete;
    setTaskToDelete(null);
    setTasks((prev) => prev.filter((task) => task.id !== deletedId));

    try {
      await deleteTask(deletedId);
    } catch {
      fetchTasks();
    }
  };

  const openListMenu = () => {
    menuAnchorRef.current?.measureInWindow((x, y, width, height) => {
      const screenW = Dimensions.get("window").width;
      const left = Math.max(
        8,
        Math.min(screenW - LIST_MENU_WIDTH - 8, x + width - LIST_MENU_WIDTH),
      );
      setListMenu({ top: y + height + 4, left });
    });
  };

  const handleEditList = () => {
    setListMenu(null);
    router.push({
      pathname: "/tasklist/edit-tasklist",
      params: { id: taskListId },
    });
  };

  const handleDeleteListPress = () => {
    setListMenu(null);
    setListDeleteVisible(true);
  };

  const handleConfirmDeleteList = async () => {
    setListDeleteVisible(false);
    try {
      await deleteTaskList(taskListId);
      router.back();
    } catch {
      // Stay on the screen if the delete fails.
    }
  };

  const remainingCount = tasks.filter((task) => !task.completed).length;

  const accentColor = taskList?.color || "#005BBF";

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]} className="bg-[#F9F9FF]">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-5">
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

        <RNView ref={menuAnchorRef} collapsable={false}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="List options"
            onPress={openListMenu}
            className="h-9 w-9 items-center justify-center rounded-full bg-surface-sunken active:opacity-80"
          >
            <SymbolView
              name={{ ios: "ellipsis", android: "more_vert", web: "more_vert" }}
              size={18}
              tintColor="#60646C"
            />
          </Pressable>
        </RNView>
      </View>

      <View className="flex-1 px-6">
        {loading ? (
          <LoadingState color={accentColor} message="Loading tasks..." />
        ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <EmptyState
              icon={{ ios: "checklist", android: "checklist", web: "checklist" }}
              title="No tasks yet"
              message="Add your first task with the + button below."
            />
          }
          ListHeaderComponent={() => (
            <View>
            <TaskListHeader
              tag={taskList?.icon.name || 'task'}
              color={taskList?.color || '#000000'}
              title={taskList?.name || ''}
              description={taskList?.description || ''}
            />

              <View className="flex-row pt-8 pb-4 px-1 justify-between">
                <Text className="font-inter text-lg font-bold">Ongoing Tasks</Text>
                <TaskListLite title={remainingCount + " items remaining"} bgColor="#636363" />
              </View>
            </View>
          )}
          renderItem={({item}) => (
            <TaskCard
              title={item.title}
              description={item.description}
              color={taskList?.color || "#000000"}
              icon={taskList?.icon}
              isCompleted={item.completed}
              onToggle={() => handleToggleCompleted(item.id)}
              onUpdate={() =>
                router.push({
                  pathname: "/tasklist/edit-task",
                  params: { id: item.id, color: accentColor },
                })
              }
              onDelete={() => setTaskToDelete(item.id)}
            />
          )}
        />
        )}
      </View>

      {/* Floating add-task button — opens the add-task screen as an iOS sheet */}
      <Add
        icon={<SymbolView name={{ ios: "plus", android: "add", web: "add" }} size={24} tintColor="white" />}
        className="absolute bottom-12 right-8 z-50"
        style={{ backgroundColor: accentColor }}
        onPress={() =>
          router.push({
            pathname: "/tasklist/add-task",
            params: { id: taskListId, color: accentColor },
          })
        }
      />

      {/* Header "..." dropdown */}
      <Modal
        visible={!!listMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setListMenu(null)}
      >
        <Pressable onPress={() => setListMenu(null)} style={{ flex: 1 }}>
          {listMenu ? (
            <RNView
              style={{
                position: "absolute",
                top: listMenu.top,
                left: listMenu.left,
                width: LIST_MENU_WIDTH,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E0E2EC",
                overflow: "hidden",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <Pressable
                onPress={handleEditList}
                className="flex-row items-center gap-3 px-4 py-3 border-b border-surface-sunken active:opacity-70"
              >
                <SymbolView
                  name={{ ios: "pencil", android: "edit", web: "edit" }}
                  size={18}
                  tintColor="#191C23"
                />
                <Text className="font-inter text-base text-ink">Edit list</Text>
              </Pressable>
              <Pressable
                onPress={handleDeleteListPress}
                className="flex-row items-center gap-3 px-4 py-3 active:opacity-70"
              >
                <SymbolView
                  name={{ ios: "trash", android: "delete", web: "delete" }}
                  size={18}
                  tintColor="#BA1A1A"
                />
                <Text className="font-inter text-base text-danger">Delete list</Text>
              </Pressable>
            </RNView>
          ) : null}
        </Pressable>
      </Modal>

      {/* Delete confirmation */}
      <DeleteConfirmModal
        visible={taskToDelete !== null}
        onConfirm={handleConfirmDelete}
        onClose={() => setTaskToDelete(null)}
      />

      {/* Delete list confirmation */}
      <DeleteConfirmModal
        visible={listDeleteVisible}
        title="Delete List?"
        message="This action cannot be undone. This list and its tasks will be permanently removed."
        confirmText="Delete List"
        onConfirm={handleConfirmDeleteList}
        onClose={() => setListDeleteVisible(false)}
      />
    </SafeAreaView>
  );
}
