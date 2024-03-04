import instance from '..';

// 定义请求的数据类型
export interface LoginData {
  account: string;
  password: string;
}

// 登录请求
// 发送账号、密码；接受data内容
export const login = (data: LoginData): any => {
  return instance({
    url: '/login',
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

interface msgLoginData {
  tel: string,
  code: string
}
export const msgLogin = (data: msgLoginData): any => {
  return instance({
    url: '/login',
    method: 'post',
    data: data
  })
}


