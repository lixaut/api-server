
const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const joi = require('@hapi/joi')
const expressJWT = require('express-jwt')
const config = require('./config')
const userinfoRouter = require('./router/userinfo')

const app = express()

// 配置 cors 中间件
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 给 res 挂载发送失败消息函数（一定要在路由之前）
app.use((req, res, next) => {
  res.cc = {
    fn: function (err, status = 1) {
      if (this.flag) {
        this.flag = false
        res.send({
          status,
          message: err instanceof Error ? err.message : err
        })
      }
    },
    flag: true
  }
  next()
})

// 配置解析 token 中间件
app.use(
  expressJWT({ secret: config.jwtSecretKey })
  .unless({ path: [/^\/api/] })
)

// 使用用户登录、注册路由模块
app.use('/api', userRouter)

// 使用获取用户信息路由模块
app.use('/my', userinfoRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败的错误
  if (err instanceof joi.ValidationError) return res.cc.fn(err)
  // token 认证失败
  if (err.name === 'UnauthorizedError') return res.cc.fn('身份认证失败！')
  // 未知的错误
  res.cc.fn(err)
})

app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007')
})