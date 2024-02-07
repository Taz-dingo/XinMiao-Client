/**
 * 校验用户名格式
 * @param {string} username 待校验的用户名
 * @returns 校验结果
 */
export function validateUsername(username: string): boolean {
    // 用户名必须为字母开头，允许5-16字节，允许字母数字下划线
    const re = /^[a-zA-Z]\w{4,15}$/;
    return re.test(username);
}

/**
 * 校验密码格式
 * @param {string} password 待校验的密码
 * @returns 校验结果
 */
export function validatePassword(password: string): boolean {
    // 密码长度至少为6，且必须包含至少一个数字和一个字母
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
}