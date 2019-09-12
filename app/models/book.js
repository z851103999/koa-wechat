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

class Book extends Model{
    constructor(id){
        super()
        this.id = id
    }

    async detail() {
        const url = util.format(global.config.yushu.detailUrl, this.id)
        const detail = await axios.get(url)

        return detail.data
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    }
}, {
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}