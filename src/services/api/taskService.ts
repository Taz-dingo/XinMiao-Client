import instance from '..';
import useAuthStore from "../../store/authStore"

// 获取用户信息
const storeApi = useAuthStore.getState()
const userInfo = storeApi.userInfo

/**根据userid查询主线任务taskSets */
export const getTaskSets = (params: API.getTaskSetsParams)
    : Promise<API.Response<API.getTaskSetsResult>> => {
    return instance({
        url: '/get/tasksets',
        method: 'GET',
        params: {
            ...params,
            userid: userInfo.id
        }
    })
}


/**根据setid查询tasks */
export const getTasks = (params: API.getTasksParams) => {
    return instance({
        url: '/get/tasks',
        method: 'GET',
        params: {
            ...params,
            userid: userInfo.id
        }
    })
}

/**根据taskid查询任务具体信息 */
export const getTaskDetail = (params: API.getTaskDetailParams)
    : Promise<API.Response<API.getTaskDetailResult>> => {
    return instance({
        url: '/get/task',
        method: 'GET',
        params: params
    })
}

/**根据userid获取所有任务坐标点 */
export const getTaskCoords = (params: API.getTaskCoordsParams) => {
    return instance({
        url: '/get/task-all',
        method: 'GET',
        params: params
    })
}

/**确定公告任务 */
export const confirmAnn = (data: API.confirmAnnData)
    : Promise<API.Response<API.confirmAnnResult>> => {
    return instance({
        url: '/task/confirm',
        method: 'POST',
        data: {
            ...data,
            userid: userInfo.id
        }
    })
}

/**进入定位点发送位置 */
export const sendLocIn = (data: API.sendLocInData)
    : Promise<API.Response<API.sendLocInResult>> => {
    return instance({
        url: '/faceIn',
        method: 'POST',
        data: {
            ...data,
            userid: userInfo.id
            // userid: 2162810210
        }
    })
}

/**退出定位点发送位置 */
export const sendLocOut = (data: API.sendLocOutData)
    : Promise<API.Response<API.sendLocOutResult>> => {
    return instance({
        url: '/faceOut',
        method: 'delete',
        data: {
            ...data,
            userid: userInfo.id
            // userid: 2162810210
        }
    })
}