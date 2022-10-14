
const joi = require('@hapi/joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义用户信息验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 模块化验证注册和登录的表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password
  }
}

// 模块化验证更新用户信息的规则对象
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}