
const express = require('express')
const artcate_handler = require('../router_handler/artcate')
const expressJoi = require('@escook/express-joi')
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')

const router = express.Router()

// 获取文章分类路由
router.get('/cates', artcate_handler.getArtCate)

// 添加文章分类路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArtCate)

// 根据 id 删除文章分类路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

// 根据 id 获取文章分类路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getCateById)

// 更新文章分类数据路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

module.exports = router