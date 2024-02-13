/**
 * 校验用户名格式
 * @param {string} username 待校验的用户名
 * @returns 校验结果
 */
export function validateUsername(username: string): boolean {
    // 用户名必须全为数字，以“21”开头，并且总长度和“2162810215”一致。
    const re = /^21\d{8}$/;
    return re.test(username);
}

/**
 * 校验密码格式
 * @param {string} password 待校验的密码
 * @returns 校验结果
 */
export function validatePassword(password: string): boolean {
    // 字符串只包含大小写字母和数字，且长度在 6 到 15 之间。
    const re = /^[a-zA-Z0-9]{6,15}$/;
    return re.test(password);
}