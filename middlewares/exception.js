/**
 *
 * @description: 全局异常处理（用到AOP 面向切面编程）
 * @author: junyong.hong
 * @createTime: 2019/8/15
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 开发环境如果出现错误，要抛出异常，好排查
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        if (isDev && !isHttpException) {
            // 如果这里抛出异常，不会往下走
            throw error
        }

        // 错误的类型是HttpException，是一个已知型错误
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {    // 未知型错误
            ctx.body = {
                msg: '未知型错误',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError