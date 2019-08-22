/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/8/19
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
// 加盐
const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

// 用户模型
class User extends Model{
    // 静态方法
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('用户不存在')
        }

        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }

        return user
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // 自动增长
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        // 属性操作（观察者模式）
        set (val) {
            // 加盐 花费的成本10
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    // 同一个用户，对不同的小程序，是会有不同的openid
    // 对小程序、公众号都会有个一个相同的unionID
    openid: {
        // 最大只能是64位
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    // 数据库名称
    tableName: 'user'
})

module.exports = {
    User
}
