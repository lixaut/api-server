

## bcryptjs 加密模块

* 优点：
  1. 加密之后，无法逆向破解
  2. 同一密码多次加密，加密结果各不相同

## hapi/joi 定义规则模块

## escook/express-joi 实现验证功能模块

## Q & A

> `[nodemon] app crashed - waiting for file changes before starting... `

解决方法：错误原因是因为`res.send()`重复触发导致的，错误一旦捕获，后面的错误就不用在捕获了。用户名重复和插入用户信息，是同时触发的错误，但二者只能取其一

```js
// 封装失败相应函数（一定要在路由之前）
app.use((req, res, next) => {
  res.cc = {
    fn: function (err, status = 1) {
      if (this.flag) {
        this.flag = false
        return res.send({
          status,
          message: err instanceof Error ? err.message : err
        })
      }
    },
    flag: true
  }
  next()
})
```