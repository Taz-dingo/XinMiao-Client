import instance from ".."
import useAuthStore from "../../store/authStore"

// 获取用户信息
const storeApi = useAuthStore.getState()
const userInfo = storeApi.userInfo

// 获取背包信息
interface getBagInfoParams {
    // userid: string 
}
/**
 *  "id": 1,
    "name": "勇气",
    "desc": "这种东西也有实体吗？似乎是对勇者的奖励。",
    "creator": "初始",
    "ctime": "2024-01-30 14:45:30",
    "dtime": "2024-12-27 14:45:15",
    "stackLimit": 64,
    "img": "items/item_1.jpg",
    "ownNum": 99,
    "userId": "2162810210",
    "possPk": 1
 */

export const getBagInfo = () => {
    return instance({
        url: '/bag_viewall',
        method: 'GET',
        params: {
            userid: 2162810210,
        }
    })
}
