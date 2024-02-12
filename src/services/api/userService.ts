import instance from '..';

// 定义请求的数据类型
export interface LoginData {
  account: string;
  password: string;
}

// 登录请求
export const login = (data: LoginData) => {
  return instance({
    url: '/login',
    method: 'post',
    data: data
  })
}

