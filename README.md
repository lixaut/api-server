
## server.js

这是一个关于编写服务端 API 接口的项目案例，该项目使用到一些常见处理前后端数据的第三方模块，应用规范模块化编程，通过简单的案例，熟悉服务端模块化编写流程。

## 第三方模块说明

1. `bcryptjs` 加密模块

   * 优点：
     1. 加密之后，无法逆向破解
     2. 同一密码多次加密，加密结果各不相同

2. ` hapi/joi` 定义规则模块
3. `escook/express-joi` 验证功能模块
4. `jsonwebtoken` 生成 token 字符串模块
5. `express-jwt` 解析 token 模块

## Q & A

> [nodemon] app crashed - waiting for file changes before starting... 

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