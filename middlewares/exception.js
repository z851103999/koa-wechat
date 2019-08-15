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
        // 未知型错误

        // 错误的类型是HttpException，是一个已知型错误
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
    }
}

module.exports = catchError