const express = require('express')
const router = express.Router()
const pool = require ('../database')


router.get('/', (req, res)=>{
    res.render('index/index')
})

router.get('/login', (req, res)=>{
    res.render('login/login')
})
module.exports = router