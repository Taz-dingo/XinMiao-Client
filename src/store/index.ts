import { create } from 'zustand'

// 任务
interface TaskState {
    taskState: string
    setTaskType: (taskType: string) => void
}
export const useTaskStore = create<TaskState>((set) => ({
    taskState: "mainLine",
    setTaskType: (newType) => set({ taskState: newType }) // 更新选中状态
}))

/* ----------------------------------------------------- */

// 选中屏幕
interface ScreenState {
    screenState: string,
    setScreenState: (screenState: string) => void
    clearScreenState: () => void
}
export const useSubScreenStore = create<ScreenState>((set) => ({
    screenState: "",
    setScreenState(newState) {
        set({ screenState: newState }) // 更新选中状态
    },
    clearScreenState() {
        set({ screenState: "" }) // 清除选中状态
    }
}))
