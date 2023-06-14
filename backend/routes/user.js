const express = require('express')
const {loginUser, signupUser, signupAdmin} = require('../controller/userController')

const router = express.Router()

router.post('/login',loginUser)

router.post('/signupUser',signupUser)

router.post('/signupAdmin',signupAdmin)

module.exports=router