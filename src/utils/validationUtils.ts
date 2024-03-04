/**
 * 校验用户名格式
 * @param {string} username 待校验的用户名
 * @returns 校验结果
 */
export function validateUsername(username: string): boolean {
    // 用户名必须全为数字，以“21”开头，并且总长度和“2162810215”一致。
    return /^21\d{8}$/.test(username);
}

/**
 * 校验密码格式
 * @param {string} password 待校验的密码
 * @returns 校验结果
 */
export function validatePassword(password: string): boolean {
    // 字符串只包含大小写字母和数字，且长度在 6 到 15 之间。
    return /^[a-zA-Z0-9]{6,15}$/.test(password);
}

// 校验手机号
export function validateTelNum(telNum: string): boolean {
    /**
     * 手机号校验
     * 1：必须以数字1开头
     * [3-9]：第二位是3到9之间的数字
     * \d{9}：后面紧跟着9个任意数字
    */
    return /^1[3-9]\d{9}$/.test(telNum);
}

// 校验验证码
export function validateCodeNum(codeNum: string): boolean {
    return /^d{4}$/.test(codeNum);
}