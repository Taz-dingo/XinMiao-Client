import instance from "..";


/**高德步行导航API */
export const getPathPlaning = async (props: API.getPathPlaningProps): Promise<any> => {
    return await instance({
        url: "https://restapi.amap.com/v3/direction/walking",
        method: "GET",
        params: {
            ...props,
            key: "b330d30782e3a136fce7c1f01b5ce3c0",    // Web API的key
        },
    });
};

