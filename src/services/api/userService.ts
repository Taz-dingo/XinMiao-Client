import instance from '..';
import useAuthStore from "../../store/authStore"

// 获取用户信息
const storeApi = useAuthStore.getState()
const userInfo = storeApi.userInfo


/**账号密码登录 */
// 发送账号、密码；接受data内容
export const login = (data: API.LoginData): any => {
  return instance({
    url: '/login/idpwd',
    method: 'post',
    data: data
  })
}

/**发送验证码 */
// 发送验证码，传入tel，code为null
export const sendMsg = (params: API.sendMsgData): any => {
  return instance({
    url: '/login/sendmsg',
    method: 'get',
    params: {
      ...params,
      code: null
    }
  })
}

/**短信登录 */
export const msgLogin = (data: API.msgLoginData): any => {
  return instance({
    url: '/login/sms',
    method: 'post',
    data: data
  })
}

/**获取背包信息 */
export const getBagInfo = (params: API.getBagInfoParams) => {
  return instance({
    url: '/bag_viewall',
    method: 'GET',
    params: {
      userid: userInfo.id,
    }
  })
}

/**查看个人信息 */
export const getPersonalInfo = (params: API.getPersonalInfoParams)
  : Promise<API.Response<API.getPersonalInfoResult>> => {
  return instance({
    url: '/me/check/information',
    method: 'GET',
    params: {
      userid: userInfo.id,
    }
  })
}

/**查看排行榜 */
export const getRankList = ()
  : Promise<API.Response<API.getRankListResult>> => {
  return instance({
    url: '/sort/finish-task',
    method: 'GET',
  });
}