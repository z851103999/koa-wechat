/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/8/31
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTERGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT
}

// 电影
class Movie extends Model {

}
Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})


// 句子
class Sentence extends Model {

}
Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})


// 音乐
class Music extends Model {

}
const musicFields = Object.assign({
    url: Sequelize.STRING
}, classicFields)
Music.init(musicFields, {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}