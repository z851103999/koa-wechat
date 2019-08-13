/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/8/13
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/classic/latest', (ctx, next) => {
    ctx.body = { key: '11' }
})

app.use(router.routes())

app.listen(3333)




