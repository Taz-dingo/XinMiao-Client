
import instance from ".."

// 查询所有帖子（论坛主页）
// 暂时不需要参数
export const getPosts = (params:any) => {
    return instance({
        url: '/post',
        method: 'GET',
        params: params
    })
}