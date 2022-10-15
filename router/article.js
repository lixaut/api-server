
const express = require('express')
const article_handler = require('../router_handler/article')

const router = express.Router()

router.post('/add', article_handler.addArticle)

module.exports = router