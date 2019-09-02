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

const app = new Koa()

app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen(3333)