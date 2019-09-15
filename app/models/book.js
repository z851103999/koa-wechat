/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/9/12
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { sequelize } = require('../../core/db')
const axios = require('axios')
const util = require('util')
const { Sequelize, Model } = require('sequelize')
const { Favor } = require('@models/favor')

class Book extends Model{
    // // 不推荐用构造函数
    // constructor(id){
    //     super()
    //     this.id = id
    // }

    // 获取图书详情（实例方法）
    async detail(id) {
        const url = util.format(global.config.yushu.detailUrl, id)
        const detail = await axios.get(url)
        return detail.data
    }

    // 图书搜索
    static async searchFromYuShu(q, start, count, summary = 1) {
        // encodeURI把有中文的转义掉
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
        const detail = await axios.get(url)
        return detail.data
    }

    // 获取我喜欢的书籍数量
    static async getMyFavorBookCount(uid) {
        const count = await Favor.count({
            where: {
                type: 400,
                uid
            }
        })
        return count
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}