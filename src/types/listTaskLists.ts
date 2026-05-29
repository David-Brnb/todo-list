import { IconDTO } from "./iconDTO";

export interface TaskListDTO {
    id: number;
    name: string;
    color: string;
    description: string;
    ownerId: string | null;
    icon: IconDTO | null;
}

export interface TaskListPageDTO {
    items: TaskListDTO[];
    count: number;
    hasMore: boolean;
}
