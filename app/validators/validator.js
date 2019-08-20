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
const { Rule, LinValidator } = require('../../core/lin-validator')

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
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}