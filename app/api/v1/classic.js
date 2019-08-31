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
const router = new Router({
    // 指定路由前缀
    prefix: '/v1/classic'
})

const { Flow } = require('../../models/flow')
const { PositiveIntegerValidator } = require('../../validators/validator.js')
const { Auth } = require('../../../middlewares/auth')

// 查询最新一期的期刊
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    ctx.body = flow



    // ctx.body = ctx.auth.uid
    // const query = ctx.params

    // 校验器
    // const v = await new PositiveIntegerValidator().validate(ctx)
    // parsed = false保持原来的数据类型
    // const id = v.get('query.id', parsed = false)
    // ctx.body = 'success'

    // 全局异常错误处理
    // if (true) {
    //     const error = new global.errs.ParameterException()
    //     throw error
    // }
})

module.exports = router