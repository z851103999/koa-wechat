/**
 *
 * @description: 用代码创建数据库的表
 * @author: junyong.hong
 * @createTime: 2019/8/19
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config.js').database


const sequelize = new Sequelize(dbName, user, password, {
    // 指定数据库类型
    dialect: 'mysql',
    host,
    // 在控制台显示sql语句
    loggind: true,
    timezone: '+08:00',
    define: {

    }
})

module.exports = {
    db: sequelize
}


