export interface TaskDTO {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    isCompleted: boolean,
    tasklistIds: number[],
}

export interface taskColorDto {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    isCompleted: boolean,
    tasklistIds: number[],
    taskListColor: string,
}
