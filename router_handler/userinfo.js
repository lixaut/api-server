
const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息处理函数
exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from se_users where id=?'
  db.query(sql, req.user.id, (err, results) => {
    // 执行语句是否成功
    if (err) return res.cc.fn(err)
    // 判断是否查询成功
    if (results.length !== 1) {
      return res.cc.fn('获取用户信息失败！')
    }
    // 获取用户信息成功
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0]
    })
  })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  const sql = 'update se_users set ? where id=?'
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.affectedRows !== 1) {
      return res.cc.fn('更新用户的基本信息失败！')
    }
    res.cc.fn('更新用户信息成功！', 0)
  })
}

// 重置密码处理函数
exports.updatePassword = (req, res) => {
  const sql = 'select * from se_users where id=?'
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.length !== 1) {
      return res.cc.fn('用户不存在！')
    }
    // 验证旧密码
    const compareRes = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareRes) {
      return res.cc.fn('旧密码错误')
    }
    // 新密码加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    // 更新数据库密码
    const sql = 'update se_users set password=? where id=?'
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc.fn(err)
      if (results.affectedRows !== 1) {
        return res.cc.fn('更新密码失败！')
      }
      res.cc.fn('更新密码成功！', 0)
    })
  })
}

// 更新用户头像
exports.updateAvatar = (req, res) => {
  const sql = 'update se_users set user_pic=? where id=?'
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.affectedRows !== 1) {
      return res.cc.fn('更新用户头像失败！')
    }
    res.cc.fn('更新头像成功！', 0)
  })
}