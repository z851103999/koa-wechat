# api-koa-island

10-1 9分钟

#### 介绍
    纯正商业级应用－Node.js Koa2开发微信小程序服务端
    
    访问路径：http://localhost:3333/v1/3/classic/latest

## 6 全局异常错误处理
    if (true) {
       const error = new global.errs.ParameterException()
       throw error
    }

## 5 校验器
    const v = await new PositiveIntegerValidator().validate(ctx)
    parsed = false保持原来的数据类型
    const id = v.get('query.id', parsed = false)
    ctx.body = 'success'

## 4 获取参数
    获取url上的参数：ctx.param
    获取问号后面的参数：ctx.request.query
    获取header:ctx.request.header

## 3 启动
    npm run dev

## 2 3种导入方式
    const Koa = require('koa')   commonJS
    import * from a              ES6
                                 AMD 用得不多

## 1 配置文件初始化
    npm init