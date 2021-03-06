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
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('@models/user')

const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')

const router = new Router({
    // 指定路由前缀
    prefix: '/v1/token'
})

// 登录
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)

    let token;
    // {"account":"邮箱","type":"登录类型","secret":"密码"}
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:          // 101：邮箱登录
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;

        case LoginType.USER_MINI_PROGRAM:   // 100：用户小程序登录
            console.log('token1', v.get('body.account'))
            token = await WXManager.codeToToken(v.get('body.account'))
            console.log('token2', token)
            break;

        case LoginType.ADMIN_EMAIL:         // 200：管理员登录

            break;

        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
            break;
    }
    ctx.body = {
        token
    }
})

/**
 * 验证令牌
 */
router.post('/verify', async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx)
    // 校验token是否正确
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        is_valide: result
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

    // Auth.USER：普通用户权限8 管理员 16
    return token = generateToken(user.id, Auth.USER)
}

module.exports = router