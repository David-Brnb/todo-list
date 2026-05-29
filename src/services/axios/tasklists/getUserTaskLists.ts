import { TaskListWithOldestPendingPageDTO } from "@/types/taskLists/taskListWithOldestPending";
import api from "../api";

export const getUserTaskLists = async (page: number): Promise<TaskListWithOldestPendingPageDTO> => {
    const response = await api.get<TaskListWithOldestPendingPageDTO>("/tasklist/with-oldest-pending?page=" + page);
    return response.data;
};