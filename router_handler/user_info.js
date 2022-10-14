
const db = require('../db/index')

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