import { TaskListDTO } from "../taskLists/listTaskLists";
import { taskColorDto } from "../tasks/taskDto";

export interface SearchResultDTO {
    taskLists: TaskListDTO[];
    tasks: taskColorDto[];
}
