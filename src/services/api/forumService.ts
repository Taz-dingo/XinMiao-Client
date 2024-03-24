import instance from ".."
import useAuthStore from "../../store/authStore"

// 获取用户信息
const storeApi = useAuthStore.getState()
const userInfo = storeApi.userInfo

// 查询所有帖子（论坛主页）
// 暂时不需要参数
export const getPosts = () => {
    return instance({
        url: '/post',
        method: 'GET',
    })
}

// 查询帖子详情
interface postDetailParams {
    postid: string
}
export const getPostDetail = (params: postDetailParams) => {
    return instance({
        url: '/post/detail',
        method: 'GET',
        params: params
    })
}

// 获取帖子评论列表
interface postCommentParams {
    postid: string
    time_order: string
    like_order: string
}
export const getPostComments = (params: postCommentParams) => {
    return instance({
        url: '/comment/list/for-post',
        method: 'GET',
        params: params
    })
}

// 发布任务帖
/**
{
    "creator": "1111111111",
    "title": "过关攻略",
    "contain": "先这样再那样",
    "ctime": "2024-03-05",
    "taskid": "1"
}
 */
interface postTaskParams {
    creator: string
    title: string
    contain: string
    ctime: string
    taskid: string
}
export const postTask = (data: postTaskParams) => {
    return instance({
        url: '/post/for-task',
        method: 'POST',
        data: data
    })
}

// 发布普通帖子
/**
{
    "creator": "1111111111",
    "title": "常规贴",
    "contain": "先这样再那样",
    "ctime": "2024-03-05"
}
 */

interface postNormalParams {
    creator: string
    title: string
    contain: string
    ctime: string
}
export const postNormal = (data: postNormalParams) => {
    return instance({
        url: '/post/normal',
        method: 'POST',
        data: data
    })
}

// 删除选中帖子
interface deletePostParams {
    postid: string
}
export const deletePost = (data: deletePostParams) => {
    return instance({
        url: '/post',
        method: 'DELETE',
        data: data
    })
}

// 获取用户自己的帖子列表
interface getUserPostParams {
    // userid: string 
}
export const getUserPosts = () => {
    return instance({
        url: '/post/list/for-user',
        method: 'GET',
        params: {
            userid: userInfo.id,
        }
    })
}

// 获取用户收藏帖子列表
interface getUserCollectPostParams {
    // userid: string
}
export const getUserCollectPosts = () => {
    return instance({
        url: '/post/list/for-usercollect',
        method: 'GET',
        params: {
            uerid: userInfo.id,
        }
    })
}

// 用户点赞帖子
interface likePostParams {
    postid: string
}
export const likePost = (data: likePostParams) => {
    return instance({
        url: '/post/like',
        method: 'put',
        data: data
    })
}

// 用户收藏帖子
interface collectPostParams {
    // userid: string
    postid: string
}
export const collectPost = (data: collectPostParams) => {
    return instance({
        url: '/post/collect',
        method: 'POST',
        data: {
            userid: userInfo.id,
            ...data
        }
    })
}

// 用户根据关键词搜索帖子
interface searchPostParams {
    keyword: string
}
export const searchPost = (params: searchPostParams) => {
    return instance({
        url: '/post/list/for-keyword',
        method: 'GET',
        params: params
    })
}

// 获取任务攻略帖子列表
export const getTaskPosts = () => {
    return instance({
        url: '/post/list/for-task',
        method: 'GET',
    })
}

// 编辑帖子
interface editPostParams {
    postid: string
    title: string
    contain: string
}
export const editPost = (data: editPostParams) => {
    return instance({
        url: '/post/edit',
        method: 'PATCH',
        data: data
    })
}




// 发表评论
/**
 * {
    "fa_post": 1,
    "fa_comment": 1,
    "creator": 2162810210,
    "is_facomment":1 ,
    "reply":"1111111111",
    "contain":"测试测试"
}*/
interface postCommentParams {
    fa_post: number // 父帖子ID
    fa_comment: number | null  // 父评论ID
    // creator: number // 评论者ID
    is_facomment: number // 是否父评论
    reply: string    // 发帖人ID
    contain: string  // 评论内容
}
export const postComment = (data: postCommentParams) => {
    return instance({
        url: '/comment',
        method: 'POST',
        data: {
            ...data,
            creator: userInfo.id,
        }
    })
}

