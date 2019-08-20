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
const parser = require('koa-bodyparser')
// 初始化管理器
const InitManager = require('./core/init')
// 全局异常处理
const catchError = require('./middlewares/exception')

require('./app/models/user')

const app = new Koa()

app.use(catchError)
app.use(parser())
InitManager.initCore(app)

// 手动注册路由
// const book = require('./api/v1/book')
// const classic = require('./api/v1/classic')
// app.use(book.routes())
// app.use(classic.routes())

app.listen(3333)




