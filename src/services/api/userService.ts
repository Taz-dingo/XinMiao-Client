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

