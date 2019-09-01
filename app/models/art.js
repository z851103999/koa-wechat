/**
 *
 * @description:
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
    static async getData(art_id, type) {

        let art = null
        const finder = {
            where: {
                id: art_id
            }
        }

        switch (type) {
            case 100:   // 电影
                art = await Movie.findOne(finder)
                break

            case 200:   // 音乐
                art = await Music.findOne(finder)
                break

            case 300:   // 句子
                art = await Sentence.findOne(finder)
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