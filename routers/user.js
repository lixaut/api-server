
const express = require('express')
const user_handler = require('../router_handler/user')
const { reg_login_schema } = require('../schema/user')
const expressJoi = require('@escook/express-joi')

const router = express.Router()

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)

// 登录
router.post('/login', user_handler.login)

module.exports = router