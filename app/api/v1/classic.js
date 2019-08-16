/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/8/14
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const Router = require('koa-router')
const router = new Router()
const { PositiveIntegerValidator } = require('../../validators/validator.js')

router.post('/v1/:id/classic/latest', (ctx, next) => {
    const query = ctx.params

    // 校验器
    const v = new PositiveIntegerValidator().validate(ctx)
    // parsed = false保持原来的数据类型
    const id = v.get('query.id', parsed = false)
    ctx.body = 'success'

    // 全局异常错误处理
    // if (true) {
    //     const error = new global.errs.ParameterException()
    //     throw error
    // }
})

module.exports = router