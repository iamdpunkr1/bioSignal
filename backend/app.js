const express =  require('express')
require('dotenv').config()
const mongoose = require('mongoose')
// const {loginUser, signupUser} = require('../controller/userController')
const userRoutes = require('./routes/user')
const userDataRoutes = require('./routes/userDataRoutes')

const app = express()

app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.method, req.path)
    next()
})

app.use('/',userRoutes)
app.use('/',userDataRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('connected to db and listening to port: ', process.env.PORT)
        })
    }).catch(err=>console.log(err))



