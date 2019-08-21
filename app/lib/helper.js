/**
 *
 * @description: 成功信息返回
 * @author: junyong.hong
 * @createTime: 2019/8/21
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
function success(msg, errorCode) {
    throw new global.errs.Success(msg, errorCode)
}

module.exports = {
    success
}