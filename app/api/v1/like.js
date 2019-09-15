/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/9/1
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const Router = require('koa-router')
const router = new Router({
    // 指定路由前缀
    prefix: '/v1/like'
})
const { Favor } = require('@models/favor')
const { LikeValidator } = require('@validator')
const { success } = require('../../lib/helper')
const { Auth } = require('../../../middlewares/auth')

// 点赞
router.post('/', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    })

    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    success()
})

// 取消点赞
router.post('/cancel', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    })
    await Favor.disLlike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    success()
})

module.exports = router