import instance from "..";

export const getTestFun = (params: any) => {
    return instance({
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