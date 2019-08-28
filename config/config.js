/**
 *
 * @description:
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
    wx: {
        appId: 'wxba39866501301226',
        appSecret: '',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}