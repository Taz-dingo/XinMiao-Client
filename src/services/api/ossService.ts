
import instance from ".."

/**上传图片 (base64) */
export const uploadImage = (data: API.uploadImageData)
    : Promise<API.Response<API.uploadImageResult>> => {
    return instance({
        url: "/uploadfile/base64",
        method: "POST",
        data: data
    });
}