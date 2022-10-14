
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交个服务器的用户数据
  const userInfo = req.body

  // 数据库查重
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    // 执行 sql 语句失败
    if (err) return res.cc.fn(err)
    // 判断用户名是否被占用
    if (results.length > 0) {
      return res.cc.fn('该用户名已占用，请更换其他用户名')
    }
  })

  // 用户密码加密
  userInfo.password = bcrypt.hashSync(userInfo.password, 10)

  // 数据库中插入新用户
  const sql = 'insert into ev_users set ?'
  db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.affectedRows !== 1) {
      return res.cc.fn('注册用户失败，请稍后再试！')
    }
    res.cc.fn('注册成功', 0)
  })
}

// 用户登录的处理函数
exports.login = (req, res) => {
  const userInfo = req.body
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userInfo.username, (err, results) => {
    if (err) return res.cc.fn(err)

    // 验证用户名
    if (results.length !== 1) {
      return res.cc.fn('登录失败，用户名不存在！')
    }

    // 验证密码
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if (!compareResult) {
      return res.cc.fn('登录失败，密码不正确！')
    }
    
    // 生成 token 并发送个客户端
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn
    })
    res.send({
      status: 0,
      message: '登录成功',
      token: `Bearer ${tokenStr}`
    })
  })
}