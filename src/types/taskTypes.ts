// 任务集
type TaskSet = {
    setId: number;
    setTitle: string;
    tasks: Task[];
};

// 任务
type Task = {
    id: number;
    title: string;
    demand: string;
    type: string;
}