
const db = require('../db/index')

// 获取文章分类路由处理函数
exports.getArtCate = (req, res) => {
  const sql = 'select * from se_article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    if (err) return res.cc.fn(err)
    res.send({
      status: 0,
      message: '获取文章分类数据成功',
      data: results
    })
  })
}

// 添加文章分类路由处理函数
exports.addArtCate = (req, res) => {
  // 文章分类查重
  const sql = 'select * from se_article_cate where name=? or alias=?'
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.length === 2) {
      return res.cc.fn('分类名称与分类别名被占用，请更换后重试！')
    }
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
      return res.cc.fn('分类名称与分类别名被占用，请更换后重试！')
    }
    if (results.length === 1 && results[0].name === req.body.name) {
      return res.cc.fn('分类名称被占用，请更换后重试！')
    }
    if (results.length === 1 && results[0].alias === req.body.alias) {
      return res.cc.fn('分类别名被占用，请更换后重试！')
    }
    // 添加文章分类
    const sqlStr = 'insert into se_article_cate set ?'
    db.query(sqlStr, req.body, (err, results) => {
      if (err) return res.cc.fn(err)
      if (results.affectedRows !== 1) {
        return res.cc.fn('新增文章分类失败！')
      }
      res.cc.fn('新增文章分类成功！', 0)
    })
  })
}

// 删除文章分类路由处理函数
exports.deleteCateById = (req, res) => {
  const sql = 'update se_article_cate set is_delete=1 where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.affectedRows !== 1) {
      return res.cc.fn('删除文章分类失败！')
    }
    res.cc.fn('删除文章分类成功！', 0)
  })
}

// 根据 id 获取文章分类处理函数
exports.getCateById = (req, res) => {
  const sql = 'select * from se_article_cate where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc.fn(err)
    if (results.length !== 1) {
      return res.cc.fn('获取文章分类数据失败')
    }
    res.send({
      status: 0,
      message: '获取文章分类成功！',
      data: results[0]
    })
  })
}

// 更新文章分类处理函数
exports.updateCateById = (req, res) => {
  const sql = 'select * from se_article_cate where id<>? and (name=? or alias=?)'
  db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc.fn(err)
    // 判断是否有重名
    if (results.length === 2) {
      return res.cc.fn('分类名称与别名被占用，请更换后重试')
    }
    if (
      results.length === 1 &&
      results[0].name === req.body.name && 
      results[0].alias === req.body.alias
    ) {
      return res.cc.fn('分类名称与别名都被占用，请更换后重试')
    }
    if (results.length === 1 && results[0].name === req.body.name) {
      return res.cc.fn('分类名称被占用，请更换后重试')
    }
    if (results.length === 1 && results[0].alias === req.body.alias) {
      return res.cc.fn('分类别名被占用，请更换后重试')
    }
    // 更新数据
    const sqlStr = 'update se_article_cate set ? where id=?'
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
      if (err) return res.cc.fn(err)
      if (results.affectedRows !== 1) {
        return res.cc.fn('文章分类更新失败')
      }
      res.cc.fn('文章分类更新成功！', 0)
    })
  })
}