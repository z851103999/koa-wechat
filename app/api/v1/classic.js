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

const { Flow } = require('../../models/flow')
const { Auth } = require('../../../middlewares/auth')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const {PositiveIntegerValidator, ClassicValidator} = require('../../validators/validator')

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
    ctx.body = {
        art
    }
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

    ctx.body = {
        art
    }
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

    ctx.body = {
        art
    }
})

module.exports = router