/**
 *
 * @description: 初始化管理器
 * @author: junyong.hong
 * @createTime: 2019/8/14
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
// requireDirectory实现路由自动
const requireDirectory = require('require-directory')
const Router = require('koa-router')
class InitManger {
    // 入口方法
    static initCore(app) {
        InitManger.app = app
        InitManger.initLoadRouters()
    }

    // 加载全部路由
    static initLoadRouters () {
        // 绝对路径
        const apiDirectory = `${process.cwd()}/app/api`
        // 自动注册路由
        // module模块（固定参数）
        // ./app/api指向的模块
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManger.app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManger