const express = require('express')

const {
     createUserData,
     getUserData,
     getUserDatas,
     uploadReport
 }= require('../controller/userDataController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

router.get('/dashboard',getUserDatas)
router.get('/userhome',getUserData)
router.post('/userhome',createUserData)
router.patch('/dashboard/:id',uploadReport)

module.exports=router