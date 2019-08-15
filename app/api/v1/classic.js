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
const { HttpException } = require('../../../core/http-exception')

router.get('/v1/classic/latest', (ctx, next) => {
    const query = ctx.request.query

    if (true) {
        const error = new HttpException('为什么错误', 10001, 400)
        throw error
    }

    ctx.body = {
        key: 'classic'
    }
    // throw new Error('API error')
})

module.exports = router