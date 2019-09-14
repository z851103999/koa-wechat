/**
 *
 * @description: 点赞实体
 * @author: junyong.hong
 * @createTime: 2019/9/1
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Art } = require('@models/art')

class Favor extends Model {
    /**
     * 点赞
     * @param art_id 文章
     * @param type 类型
     * @param uid 用户id
     * @returns {Promise.<void>}
     */
    static async like (art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (favor) {
            throw new global.errs.LikeError()
        }

        // 事务
        return sequelize.transaction(async t => {
            // 添加点赞记录
            await Favor.create({
                art_id,
                type,
                uid
            }, { transaction: t })

            const art = await Art.getData(art_id, type, false)
            // 变量加1操作
            await art.increment('fav_nums', { by: 1, transaction: t })
        })
    }

    /**
     * 取消点赞
     * @param art_id 文章
     * @param type 类型
     * @param uid 用户id
     * @returns {Promise.<*>}
     */
    static async disLlike (art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.DisLikeError()
        }

        // 事务
        return sequelize.transaction(async t => {
            // 添加点赞记录
            await favor.destroy({
                // false软删除 true真实删除
                force: true,
                transaction: t
            })

            const art = await Art.getData(art_id, type, false)
            // 变量减1操作
            await art.decrement('fav_nums', { by: 1, transaction: t })
        })
    }

    /**
     * 当前用户是否喜欢该期刊
     * @param art_id 文章
     * @param type 类型
     * @param uid 用户id
     * @returns {Promise.<*>}
     */
    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        return !!favor;
    }

    /**
     * 获取用户所有对期刊（不包含书籍）的点赞
     * @param uid
     * @returns {Promise.<void>}
     */
    static async getMyClassicFavor(uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400   // type!=400 排除书籍
                }
            }
        })
        if (!arts) {
            throw new global.errs.NotFound()
        }

        return await Art.getList(arts)
    }

    // 获取每本书籍点赞的情况
    static async getBookFavor(uid, bookId) {
        const favorNums = await Favor.count({
            where: {
                art_id: bookId,
                type: 400
            }
        })

        const myFavor = await Favor.findOne({
            where: {
                art_id: bookId,
                uid,
                type: 400
            }
        })

        return {
            fav_nums: favorNums,
            like_status: myFavor ? 1 : 0
        }
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}