/**
 *
 * @description: 点赞
 * @author: junyong.hong
 * @createTime: 2019/9/1
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')

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

    // 取消点赞
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

    // 当前用户是否喜欢该期刊
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