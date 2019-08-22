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
const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')

const router = new Router({
    // 指定路由前缀
    prefix: '/v1/token'
})

// 登录
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)

    // {"account":"邮箱","type":"登录类型","secret":"密码"}
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:          // 101:邮箱登录
            await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;

        case LoginType.USER_MINI_PROGRAM:   // 100:用户小程序登录

            break;

        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
            break;
    }
})

/**
 * 邮箱登录
 * @param account 帐号
 * @param secret 密码
 * @returns {Promise.<void>}
 */
async function emailLogin(account, secret) {
    // 判断密码是否正确，最好写到模型里
    const user = await User.verifyEmailPassword(account, secret)
}

module.exports = router