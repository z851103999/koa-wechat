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
const { flatten } = require('lodash')
const { Op } = require('sequelize')
const {
    Movie,
    Sentence,
    Music
} = require('./classic')

class Art {
    constructor(art_id, type) {
        this.art_id = art_id
        this.type = type
    }

    // 属性操作（调用方法：art.detail）
    get detail () {

    }

    // 实例方法（调用方法：art.getDetail()）
    async getDetail(uid) {
        const { Favor } = require('./favor')

        // 根据type（类别）查询对应的数据
        let art = await Art.getData(this.art_id, this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }

        // 当前用户是否喜欢该期刊
        const like = await Favor.userLikeIt(this.art_id, this.type, uid)

        return {
            art,
            like_status: like
        }
    }

    static async getList(artInfoList) {
        const artInfoObj = {
            // 电影
            100: [],
            // 音乐
            200: [],
            // 句子
            300: []
        }
        // for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                // 跳出当前循环，接着下一轮循环
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }

        // [[], [], []]去掉最外层的[]
        return flatten(arts)
    }
    static async _getListByType(ids, type) {
        // 查询条件
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }

        const scope = 'bh'

        switch (type) {
            case 100:   // 电影
                // .scope('bh') 查询出来，不包含这3个字段（'updated_at', 'deleted_at', 'created_at'）
                arts = await Movie.scope(scope).findOne(finder)
                break

            case 200:   // 音乐
                arts = await Music.scope(scope).findOne(finder)
                break

            case 300:   // 句子
                arts = await Sentence.scope(scope).findOne(finder)
                break

            case 400:   // 书籍
                break

            default:
                break
        }

        return arts
    }


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