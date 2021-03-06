/**
 *
 * @description: 配置信息
 * @author: junyong.hong
 * @createTime: 2019/8/19
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
module.exports = {
    // prod
    environment: 'dev',
    database: {
        dbName: 'islang',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root'
    },
    // 令牌
    security: {
        secretKey: 'abcdefg',
        // 过期时间60*60=1个小时
        expiresIn: 60*60*24*30
    },
    // 微信基本信息
    wx: {
        appId: 'wxd85dd73adfebace9',
        appSecret: '3064bfcaad620f8c57e9e04000ebb342',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    // 鱼书
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host: 'http://localhost:3333/'
}