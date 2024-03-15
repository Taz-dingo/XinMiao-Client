import instance from '..';


// 根据userid查询主线任务taskSets
interface getTaskSetsParams {
    userid: string
    is_mainline: string
    is_now: string
}
export const getTaskSets = (params: getTaskSetsParams) => {
    return instance({
        url: '/get/tasksets',
        method: 'GET',
        params: params
    })
}


// 根据setid查询tasks
interface getTasksParams {
    setid: string
    is_now: string
}
export const getTasks = (params: getTasksParams) => {
    return instance({
        url: '/get/tasks',
        method: 'GET',
        params: params
    })
}



// 根据taskid查询任务具体信息
interface getTaskDetailParams {
    taskid: string
}
export const getTasksDetail = (params: getTaskDetailParams) => {
    return instance({
        url: '/get/task',
        method: 'GET',
        params: params
    })
}


// 根据userid获取所有任务坐标点
interface getTaskCoordsParams {
    userid: string
}
export const getTaskCoords = (params: getTaskCoordsParams) => {
    return instance({
        url: '/get/task-all',
        method: 'GET',
        params: params
    })
}


interface confirmAnnData {
    userid: string,
    taskid: string,
    time: string
}
export const confirmAnn = (data: confirmAnnData) => {
    return instance({
        url: '/task/confirm',
        method: 'POST',
        data: data
    })
}