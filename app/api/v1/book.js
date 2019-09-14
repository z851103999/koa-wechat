/**
 *
 * @description:
 * @author: junyong.hong
 * @createTime: 2019/8/14
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const Router = require('koa-router')
const { HotBook } = require('@models/hot-book')
const { Book } = require('@models/book')
const { Favor } = require('@models/favor')
const { PositiveIntegerValidator, SearchValidator } = require('@validator')
const { Auth } = require('../../../middlewares/auth')


const router = new Router({
    prefix: '/v1/book'
})

// 获取热门书籍列表
router.get('/hot_list', async (ctx, next) => {
    const books = await HotBook.getAll()

    ctx.body = {
        books
    }
})

// 获取图书详情
router.get('/:id/detail', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book(v.get('path.id'))
    ctx.body = await book.detail()
})

// 图书搜索
router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})

// 获取我喜欢的书籍数量
router.get('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})

// 获取每本书籍点赞的情况
router.get('/:book_id/favor', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        // book_id的别名为id
        id: 'book_id'
    })
    const favor = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'))
    ctx.body = favor
})

// 新增短评
router.get('/add/short_comment', new Auth().m, async ctx => {

})

module.exports = router