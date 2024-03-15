import { LatLng } from 'react-native-amap3d'
import { create } from 'zustand'


// 任务状态（主线/支线）
interface TaskState {
    taskState: string
    setTaskType: (taskType: string) => void
}
export const useTaskStore = create<TaskState>((set) => ({
    taskState: "mainLine",
    setTaskType: (newType) => set({ taskState: newType }) // 更新选中状态
}))


// （任务栏）是否显示已结束
interface showState {
    showClosed: '0' | '1'
    setShowClosed: (showClosed: '0' | '1') => void
}
export const useShowClosedStore = create<showState>((set) => ({
    showClosed: "0",
    setShowClosed: (newState) => set({ showClosed: newState }) // 更新选中状态
}))


// 是否显示任务详情
interface showDetailState {
    showDetailId: string
    setShowDetail: (showDetail: string) => void
    clearShowDetail: () => void
}
export const useShowDetailStore = create<showDetailState>((set) => ({
    showDetailId: "",
    setShowDetail: (newState) => set({ showDetailId: newState }), // 更新选中状态
    clearShowDetail: () => set({ showDetailId: "" }) // 更新选中状态
}))

// （所有）任务地点坐标信息
type taskPoint = {
    position: location
    properties: {
        id: string
        name: string
    }
}
interface TaskLocationState {
    taskLocation: taskPoint[],
    setTaskLocation: (taskLocation: taskPoint[]) => void
}
export const useTaskLocationStore = create<TaskLocationState>((set) => ({
    taskLocation: [],
    setTaskLocation: (newState) => set({ taskLocation: newState }), // 更新选中状态
}))

// 当前任务信息 
type detailDataType = {
    id: string;
    title: string;
    demand: string;
    ctime: string;
    btime: string;
    dtime: string;
    type: string;
    location: string;
    lngLat: string;
};
type location = {
    longitude: string
    latitude: string
}
interface TaskInfoState {
    taskInfo: detailDataType;
    taskLoc: location;
    setTaskInfo: (taskInfo: detailDataType) => void
    setTaskLoc: (taskLoc: location) => void
}
export const useTaskInfoStore = create<TaskInfoState>((set) => ({
    taskInfo: {
        id: '',
        title: '',
        demand: '',
        ctime: '',
        btime: '',
        dtime: '',
        type: '',
        location: '',
        lngLat: ''
    },
    taskLoc: { longitude: "", latitude: "" },
    setTaskInfo: (newState) => set({ taskInfo: newState }), // 更新选中状态
    setTaskLoc: (newState) => set({ taskLoc: newState }), // 更新选中状态
}))

// 导航终点坐标
interface destinationState {
    destLngLat: {
        longitude: number;
        latitude: number;
    }
    setDestLngLat: (lngLat: LatLng) => void
    clearDestLngLat: () => void

}
export const useDestinationStore = create<destinationState>((set) => ({
    destLngLat: {
        longitude: -1,
        latitude: -1
    },
    setDestLngLat: (newState) => set({ destLngLat: newState }), // 更新选中状态
    clearDestLngLat: () => set({ destLngLat: { longitude: - 1, latitude: -1 } })    // 清空状态
}))


// 当前定位坐标
interface curLocationState {
    curLocation: {
        longitude: number;
        latitude: number;
    }
    setCurLocation: (newState: { longitude: number; latitude: number; }) => void
}
export const useCurLocationStore = create<curLocationState>((set) => ({
    curLocation: {
        longitude: -1,
        latitude: -1,
    },
    setCurLocation: (newState) => set({ curLocation: newState }),
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


