/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/9/6
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Favor } = require('@models/favor')

class HotBook extends Model{
    // 获取热门书籍列表
    static async getAll () {
        const books = await HotBook.findAll({
            order: [
                // index 正序排序
                'index' // ,'DESC'
            ]
        })
        console.log('books', books)
        const ids = []
        books.forEach((book) => {
            ids.push(book.id)
        })

        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids,
                    type: 400
                }
            },
            group: ['art_id'],
            // attributes查询出来包含哪些字段
            // COUNT对所有的记录进行求和
            // 指定成count字段
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })

        books.forEach(book => {
            HotBook._getEachBookStatus(book, favors)
        })

        return books
    }

    // 获取热门图书列表
    static _getEachBookStatus (book, favors) {
        let count = 0
        favors.forEach(favor => {
            if (book.id === favor.art_id) {
                count = favor.get('count')
            }
        })

        book.setDataValue('fav_nums', count)
        return book
    }
}

HotBook.init({
    index: Sequelize.INTEGER,   // 排序
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}