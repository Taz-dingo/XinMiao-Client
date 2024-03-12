import instance from '..';


// 根据userid查询主线任务taskSets
interface getMainTaskSetsByUserIdParams {
    userid: string
}
export const getMainTaskSetsByUserId = (params: getMainTaskSetsByUserIdParams) => {
    return instance({
        url: '/gettasksets/main/unfinish',
        method: 'GET',
        params: params
    })
}


// 根据setid查询tasks
interface getTasksBySetIdParams {
    setid: string
}
export const getTasksBySetId = (params: getTasksBySetIdParams) => {
    return instance({
        url: '/get/tasks',
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