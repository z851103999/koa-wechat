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

router.get('/v1/classic/latest', (ctx, next) => {
    ctx.body = {key:'classic'}
})

module.exports = router