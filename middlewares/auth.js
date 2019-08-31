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
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 17
    }

    // m是一个属性
    get m() {
        return async (ctx, next) => {
            let errMsg = 'token不合法'
            // token检测
            const userToken = basicAuth(ctx.req)
            // 禁止访问
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg)
            }

            try {
                // 校验token是否正确
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                // 不合法的

                // 过期
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }

            // decode.scope用户的权限
            if (decode.scope <= this.level) {
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }

            ctx.auth = {
                // 用户的id
                uid: decode.uid,
                // 用户的权限
                scope: decode.scope
            }

            await next()
        }
    }

    // 校验token是否正确
    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch(error) {
            return false
        }
    }
}

module.exports = {
    Auth
}