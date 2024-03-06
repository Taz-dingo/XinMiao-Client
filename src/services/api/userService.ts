import instance from '..';


// 账号密码登录
// 发送账号、密码；接受data内容
export interface LoginData {
  id: string;
  pwd: string;
}
export const login = (data: LoginData): any => {
  return instance({
    url: '/login_idpwd',
    method: 'post',
    data: data
  })
}


// 发送验证码，传入tel，code为null
interface sendMsgData {
  tel: string
}
export const sendMsg = (data: sendMsgData): any => {
  return instance({
    url: '/sendMsg',
    method: 'post',
    data: {
      ...data,
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
    url: '/login_sms',
    method: 'post',
    data: {
      ...data,
    }
  })
}


