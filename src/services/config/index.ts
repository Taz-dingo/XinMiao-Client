// 项目配置文件

// 基础URL
// export const baseURL : string = "http://localhost:3000";
// Apifox 云端Mock
// export const baseURL : string = "https://mock.apifox.com/m1/4022001-0-default";

// 本地URL
// const IP = "192.168.31.64";
// export const IP = "10.201.14.52";
export const IP = "localhost";

export const baseURL: string = `http://${IP}:8888`;
// 阿里云OSS配置
export const OSSBaseURL: string = `https://newgoodwork.oss-cn-hangzhou.aliyuncs.com`;

// 请求超时时间
export const timeout: number = 10000;