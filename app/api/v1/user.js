/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/8/20
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const router = new Router({
    // 指定路由前缀
    prefix: '/v1/user'
})

// 注册
router.post('/register', async (ctx) => {
    const v = new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    const r = await User.create(user)
    console.log(r)
})

module.exports = router