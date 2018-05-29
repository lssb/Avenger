// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
'use strict'
// const models = require('./db')
const express = require('express')
const router = express.Router()

/** ************ 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  // let newAccount = new models.Login({
  //   account: req.body.account,
  //   password: req.body.password
  // })
  // // 保存数据newAccount数据进mongoDB
  // newAccount.save((err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send('createAccount successed')
  //   }
  // })
})
// 获取已有账号接口
router.get('/api/login/getAccount', (req, res) => {
  // 通过模型去查找数据库
  // models.Login.find((err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send(data)
  //   }
  // })
  res.send('3')
})

// rarbg 查询
router.all('/api/searchRarbg', (req, res) => {
  // 通过模型去查找数据库
  // models.Login.find((err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send(data)
  //   }
  // })
  const rarbgApi = require('rarbg-api')
  rarbgApi.search(req.query.q, {
    category: rarbgApi.CATEGORY.MOVIES
  }).then(data => res.send(data))
  // res.send(req.url)
})

router.all('/api/download', (req, res) => {
  console.log(req.body.q)
  var Transmission = require('transmission')
  var transmission = new Transmission({
    port: 9091,
    host: '172.17.128.23',
    username: 'tr',
    password: 'woainima'
  })
  transmission.addUrl(req.body.q, function (err, data) {
    res.send(String(data))
    console.log(data)
  })
})

module.exports = router
