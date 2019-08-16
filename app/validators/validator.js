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

module.exports = {
    PositiveIntegerValidator
}