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
const router = new Router({
    // 指定路由前缀
    prefix: '/v1/classic'
})

const { Flow } = require('@models/flow')
const { Art } = require('@models/art')
const { Favor } = require('@models/favor')
const { Auth } = require('../../../middlewares/auth')
const {PositiveIntegerValidator, ClassicValidator} = require('@validator')

// 查询最新一期的期刊
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })

    // 根据type（类别）查询对应的数据
    let art = await Art.getData(flow.art_id, flow.type)
    // 当前用户是否喜欢该期刊
    const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)

    // 直接修改（不推荐）
    // art.dataValues.index = flow.index
    // 推荐
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likePrevious)
    ctx.body = art
})

// 获取下一期期刊
router.get('/:index/next', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })

    const index = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }

    // 根据type（类别）查询对应的数据
    let art = await Art.getData(flow.art_id, flow.type)
    // 当前用户是否喜欢该期刊
    const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)

    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeNext)

    // 排除字段
    // art.exclude = ['index', 'like_status']


    ctx.body = art
})

// 获取上一期期刊
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })

    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }

    // 根据type（类别）查询对应的数据
    let art = await Art.getData(flow.art_id, flow.type)
    // 当前用户是否喜欢该期刊
    const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)

    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likePrevious)

    ctx.body = art
})

// 获取某个期刊的详细信息
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)

    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})

// 获取期刊点赞情况
router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)

    ctx.body = {
        fav_nums: artDetail.art.fav_nums,
        like_status: artDetail.like_status
    }
})

// 获取用户所有对期刊的点赞
router.get('/favor', new Auth().m, async ctx => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavor(uid)
})

module.exports = router