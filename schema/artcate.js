
const joi = require('@hapi/joi')

// 定义类名和别名验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义 id 验证给则
const id = joi.number().integer().min(1).required()

exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}

exports.delete_cate_schema = {
  params: {
    id
  }
}