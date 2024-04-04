import instance from ".."
import useAuthStore from "../../store/authStore"
import { getCurrentDateTime } from "../../utils/getCurrenTimeUtils"

// 获取用户信息
const storeApi = useAuthStore.getState()
const userInfo = storeApi.userInfo

/**查询所有帖子（论坛主页） */
// 暂时不需要参数
export const getPosts = (params: API.getPostsParams)
    : Promise<API.Response<API.getPostsResult>> => {
    return instance({
        url: '/post',
        method: 'GET',
        params: {
            ...params,
            userid: userInfo.id,
        }
    })
}

/**查询帖子详情 */
export const getPostDetail = (params: API.postDetailParams) => {
    return instance({
        url: '/post/detail',
        method: 'GET',
        params: params
    })
}

/**获取帖子评论列表 */
export const getPostComments = (params: API.getPostCommentParams) => {
    return instance({
        url: '/comment/list/for-post',
        method: 'GET',
        params: params
    })
}

/**发布任务帖 */
export const postTask = (data: API.postTaskParams) => {
    return instance({
        url: '/post/for-task',
        method: 'POST',
        data: data
    })
}

/**发布普通帖子 */
export const postNormal = (data: API.postNormalParams) => {
    return instance({
        url: '/post/normal',
        method: 'POST',
        data: data
    })
}

/**删除选中帖子 */
export const deletePost = (data: API.deletePostParams) => {
    return instance({
        url: '/post',
        method: 'DELETE',
        data: data
    })
}

/**获取用户自己的帖子列表 */
export const getUserPosts = (params: API.getUserPostsParams) => {
    return instance({
        url: '/post/list/for-user',
        method: 'GET',
        params: {
            userid: userInfo.id,
        }
    })
}

/**获取用户收藏帖子列表 */
export const getUserCollectPosts = (params: API.getUserCollectPostsParams) => {
    return instance({
        url: '/post/list/for-usercollect',
        method: 'GET',
        params: {
            uerid: userInfo.id,
        }
    })
}

/**用户点赞帖子 */
export const likePost = (data: API.likePostParams) => {
    return instance({
        url: '/post/like',
        method: 'put',
        data: data
    })
}

/**用户收藏帖子 */
export const collectPost = (data: API.collectPostParams) => {
    return instance({
        url: '/post/collect',
        method: 'POST',
        data: {
            userid: userInfo.id,
            ...data
        }
    })
}

/**用户根据关键词搜索帖子 */
export const searchPost = (params: API.searchPostParams) => {
    return instance({
        url: '/post/list/for-keyword',
        method: 'GET',
        params: params
    })
}

/**获取任务攻略帖子列表 */
export const getTaskPosts = () => {
    return instance({
        url: '/post/list/for-task',
        method: 'GET',
    })
}

/**编辑帖子 */
export const editPost = (data: API.editPostParams) => {
    return instance({
        url: '/post/edit',
        method: 'PATCH',
        data: data
    })
}

/**发表评论 */
export const postComment = (data: API.postCommentParams) => {
    return instance({
        url: '/comment',
        method: 'POST',
        data: {
            ...data,
            creator: userInfo.id,
        }
    })
}

/** 广告帖点击详情 */
export const adClick = (params: API.adClickParams)
    : Promise<API.Response<API.adClickResult>> => {
    return instance({
        url: '/post/addetail',
        method: 'GET',
        params: {
            ...params,
            userid: userInfo.id,
            extime: getCurrentDateTime()
        }
    })
}

/** 广告轮播图列表 */
export const getAdList = ()
    : Promise<API.Response<API.getAdListResult>> => {
    return instance({
        url: '/get/advert',
        method: 'GET',
        params: {
            userid: userInfo.id,
        }
    })
}