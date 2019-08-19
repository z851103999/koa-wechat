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
const { db } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model{

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // 自动增长
        sutoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    // 同一个用户，对不同的小程序，是会有不同的openid
    // 对小程序、公众号都会有个一个相同的unionID
    openid: {
        // 最大只能是64位
        type: Sequelize.STRING(64),
        unique: true
    }
})
