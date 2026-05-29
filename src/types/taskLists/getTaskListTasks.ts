import api from "@/services/axios/api";
import { TaskDTO } from "../tasks/taskDto";

export const getTasksByTLId = async (taskListId: number): Promise<TaskDTO[]> => {
    try {
        const response = await api.get<TaskDTO[]>(`/tasklist/${taskListId}/task`);
        return response.data;
    } catch (error) {
        console.log("Error al obtener las tareas", error);
        return [];
    }
}
