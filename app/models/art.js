/**
 *
 * @description: 转发查询
 * @author: junyong.hong
 * @createTime: 2019/9/1
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const {
    Movie,
    Sentence,
    Music
} = require('../models/classic')

class Art {
    /**
     * 根据type（类别）查询对应的数据
     * @param art_id 文章
     * @param type 100电影 200音乐 300句子 400书籍
     * @param useScope
     * @returns {Promise.<*>}
     */
    static async getData(art_id, type, useScope = true) {
        // 查询条件
        let art = null
        const finder = {
            where: {
                id: art_id
            }
        }

        const scope = useScope ? 'bh' : null

        switch (type) {
            case 100:   // 电影
                // .scope('bh') 查询出来，不包含这3个字段（'updated_at', 'deleted_at', 'created_at'）
                art = await Movie.scope(scope).findOne(finder)
                break

            case 200:   // 音乐
                art = await Music.scope(scope).findOne(finder)
                break

            case 300:   // 句子
                art = await Sentence.scope(scope).findOne(finder)
                break

            case 400:   // 书籍
                break

            default:
                break
        }

        return art
    }
}

module.exports = {
    Art
}