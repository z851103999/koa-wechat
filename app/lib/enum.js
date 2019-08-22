/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/8/22
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
function isThisType(val) {
    for (let key in this) {
        // this[key]获取到的是键
        if (this[key] === val) {
            return true
        }
    }
    return false
}

const LoginType = {
    // 用户小程序登录
    USER_MINI_PROGRAM: 100,
    // 邮箱登录
    USER_EMAIL: 101,
    // 手机登录
    USER_MOBILE: 102,
    // 管理员登录
    ADMIN_EMAIL: 200,
    isThisType
}

const ArtType = {
    MOVIE:100,
    MUSIC: 200,
    SENTENCE: 300,
    BOOK: 400,
    isThisType
}

module.exports = {
    LoginType,
    ArtType
}
