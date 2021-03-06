/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/9/14
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Comment extends Model {
    // 新增评论
    static async addComment(bookId, content) {
        const comment = await Comment.findOne({
            where: {
                book_id: bookId,
                content
            }
        })

        // 新增评论
        if (!comment) {
            return await Comment.create({
                book_id: bookId,
                content,
                nums: 1
            })
        } else {    // 评论加1
            return await comment.increment('nums', {
                by: 1
            })
        }
    }

    // 获取短评
    static async getComments(bookId) {
        const comments = await Comment.findAll({
            where: {
                book_id: bookId
            }
        })

        return comments
    }

    // // 只会返回content、nums这两个字段（控制模型类返回的相关字段）
    // toJSON() {
    //     return {
    //         content: this.getDataValue('content'),
    //         nums: this.getDataValue('nums')
    //     }
    // }
}

// 排除字段（不推荐，写死了）
// Comment.prototype.exclude = ['book_id', 'id']

Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    book_id: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'comment'
})

module.exports = {
    Comment
}