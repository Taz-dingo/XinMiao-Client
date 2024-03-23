import instance from '..';


// 账号密码登录
// 发送账号、密码；接受data内容
export interface LoginData {
  id: string;
  pwd: string;
}
export const login = (data: LoginData): any => {
  return instance({
    url: '/login/idpwd',
    method: 'post',
    data: data
  })
}


// 发送验证码，传入tel，code为null
interface sendMsgData {
  tel: string
}
export const sendMsg = (params: sendMsgData): any => {
  return instance({
    url: '/login/sendmsg',
    method: 'get',
    params: {
      ...params,
      code: null
    }
  })
}

// 短信登录
interface msgLoginData {
  tel: string,
  code: string
}
export const msgLogin = (data: msgLoginData): any => {
  return instance({
    url: '/login/sms',
    method: 'post',
    data: data
  })
}


// FaceRecognitionPunch