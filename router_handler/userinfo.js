
const db = require('../db/index')

// 获取用户信息处理函数
exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
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
  const sql = 'update ev_users set ? where id=?'
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.affectedRows !== 1) {
      return res.cc.fn('更新用户的基本信息失败！')
    }
    res.cc.fn('更新用户信息成功！', 0)
  })
}