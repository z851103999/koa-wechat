/**
 *
 * @description: 校验器
 * @author: junyong.hong
 * @createTime: 2019/8/16
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
const { Rule, LinValidator } = require('../../core/lin-validator-v2')
const { User } = require('../models/user.js')
const { LoginType, ArtType } = require('../lib/enum.js')

// 校验正整数
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        // isInt整数
        this.id = [
            new Rule('isInt', '需要正整数', {min: 1})
        ]
    }
}

// 注册校验
class RegisterValidator extends LinValidator{
    constructor(){
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码最少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码长度必须在6~22位之间，包含字符、数字和 _ ', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称长度必须在4~32之间', {
                min: 4,
                max: 32
            }),
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两次输入的密码不一致，请重新输入')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }
}

class TokenValidator extends LinValidator{
    constructor(){
        super()
        this.account = [
            new Rule('isLength', '不符合帐号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }

    validateLoginType(vals){
        if (!vals.body.type){
            throw new Error('type必须是参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

// 令牌校验
class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
    }
}

function checkType(vals) {
    let type = vals.body.type || vals.path.type
    if(!type){
        throw new Error('type是必填参数')
    }
    type = parseInt(type)
    if (!LoginType.isThisType(type)) {
        throw new Error('type参数不合法')
    }
}

function checkArtType(vals) {
    let type = vals.body.type || vals.path.type
    if(!type){
        throw new Error('type是必填参数')
    }
    type = parseInt(type)
    if (!ArtType.isThisType(type)) {
        throw new Error('type参数不合法')
    }
}

class Checker{
    constructor(type) {
        this.enumType = type
    }

    check(vals) {
        let type = vals.body.type || vals.path.type
        if(!type){
            throw new Error('type是必填参数')
        }
        type = parseInt(type)
        if (!this.enumType.isThisType(type)) {
            throw new Error('type参数不合法')
        }
    }
}

// 点赞校验
class LikeValidator extends PositiveIntegerValidator {
    constructor(){
        super()
        // const checker = new Checker(ArtType)
        // this.validateType = checker.check.bind(checker)

        this.validateType = checkArtType
    }
}

class ClassicValidator extends LikeValidator {

}

// 图书搜索
class SearchValidator extends LinValidator{
    constructor(){
        super()
        this.q = [
            new Rule('isLength', '搜索关键词不能为空', {
                min: 1,
                max: 16
            })
        ]
        this.start = [
            new Rule('isInt', '不符合规范', {
                min: 0,
                max: 60000
            }),
            // 设置默认值
            // ''不需要设置错误消息
            // 0默认值
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', '不符合规范', {
                min: 1,
                max: 20,
            }),
            new Rule('isOptional', '', 20)
        ]
    }
}

// 新增短评
class AddShortCommentValidator extends PositiveIntegerValidator{
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '必须再1到12个字符之间', {
                min: 1,
                max: 12
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    ClassicValidator,
    SearchValidator,
    AddShortCommentValidator
}