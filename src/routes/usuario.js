const express = require('express')
const router = express.Router()


router.get('/usuario', (req, res)=>{
    res.render('user/usuario')
})

module.exports = router