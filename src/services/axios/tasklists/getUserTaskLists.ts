import { TaskListWithOldestPendingPageDTO } from "@/types/taskListWithOldestPending";
import api from "../api";

export const getUserTaskLists = async (page: number): Promise<TaskListWithOldestPendingPageDTO> => {
    const response = await api.get<TaskListWithOldestPendingPageDTO>("/tasklist/with-oldest-pending?page=" + page);
    return response.data;
};