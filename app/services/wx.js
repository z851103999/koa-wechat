/**
 *
 * @description: 处理微信业务
 * @author: junyong.hong
 * @createTime: 2019/8/23
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const util = require('util')
const axios = require('axios')

const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {
    // 用户小程序登录
    static async codeToToken (code) {
        // openid唯一标识
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)

        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errcode) {
            throw new global.errs.AuthFailed('openid获取失败:' + errcode + ',' + errmsg)
        }

        // 查询当前openid是否已经存在数据库中
        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {    // 不存在
            // 创建用户
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}