/**
 *
 * @description: sequelize：用代码创建数据库的表
 * @author: junyong.hong
 * @createTime: 2019/8/19
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
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
        // 不自动添加创建时间、修改时间、删除时间的字段
        timestamps: true,

        // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
        // paranoid 属性只在启用 timestamps 时适用
        paranoid: true,

        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: 'deleted_at',
        // 不使用驼峰式命令规则，这样会在使用下划线分隔
        // 这样 updatedAt 的字段名会是 updated_at
        underscored: true,
        scopes: {
            // 查询出来，不包含这3个字段
            bh: {
                attributes: {
                    exclude: ['updated_at', 'deleted_at', 'created_at']
                }
            }
        }
    }
})

// true 强制创建
// 通过设置 force 属性会首先删除表并重新创建
sequelize.sync({
    force: false
})

// 在原型链上修改（进行返回的字段控制）
Model.prototype.toJSON = function () {
    // clone浅拷贝
    let data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')

    // 判断是否是数组
    if (isArray(this.exclude)) {
        this.exclude.forEach((value) => {
            unset(data, value)
        })
    }

    return data
}

module.exports = {
    sequelize
}


