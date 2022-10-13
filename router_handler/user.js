
const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交个服务器的用户数据
  const userInfo = req.body
  if (!userInfo.username || !userInfo.password) {
    return res.send({
      status: 1,
      message: '用户名和用户密码不合法'
    })
  }

  // 数据库查重
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userInfo.username, (err, results) =>{
    // 执行 sql 语句失败
    if (err) return res.send({ status: 1, message: err.message })
    // 判断用户名是否被占用
    if (results.length > 0) {
      return res.send({
        status: 1,
        message: '该用户名已占用，请更换其他用户名'
      })
    }
  })

  // 用户密码加密
  userInfo.password = bcrypt.hashSync(userInfo.password, 10)

  // 数据库中插入新用户
  const sql = 'insert into ev_users set ?'
  db.query(sql, { username: userInfo.username, password: userInfo.password}, (err, results) => {
    if (err) return res.send({ status: 1, message: err.message })
    if (results.affectedRows !== 1) {
      return res.send({
        status: 1,
        message: '注册用户失败，请稍后再试！'
      })
    }
    res.send({ status: 0, message: '注册成功' })
  })
}

exports.login = (req, res) => {
  res.send('login OK')
}