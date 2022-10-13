
const express = require('express')
const user_handler = require('../router_handler/user')

const router = express.Router()

// 注册新用户
router.post('/reguser', user_handler.regUser)

// 登录
router.post('/login', user_handler.login)

module.exports = router