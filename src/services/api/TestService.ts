import instance from "..";
import { baseURL } from "../config";

export const getTestFun = async (params: any) => {
    return await instance({
        url: "https://jsonplaceholder.typicode.com/todos",
        method: "GET",
        params: params,
    });
};

export const postTestFun = (data: any) => {
    return instance({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        data: data,
    });
};

export const getMockTestFun = (params: any) => {
    return instance({
        url: "/pet/1",
        method: "GET",
        params: params,
    })
};