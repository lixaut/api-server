
const express = require('express')
const userinfo_handler = require('../router_handler/userinfo')
const { update_userinfo_schema } = require('../schema/user')
const expressJoi = require('@escook/express-joi')

const router = express.Router()

// 获取用户信息路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

module.exports = router