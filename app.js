
const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/user')
const joi = require('@hapi/joi')

const app = express()

// 配置 cors 中间件
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 封装失败相应函数（一定要在路由之前）
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 使用用户路由模块
app.use('/api', userRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知的错误
  res.cc(err)
})

app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007')
})