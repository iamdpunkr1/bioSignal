const User= require('../model/userModel')
const jwt=require("jsonwebtoken")

const createToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}

//login a user
const loginUser = async(req, res)=>{
    const {email, password}=req.body

    try{
        const user= await User.login(email,password)
        const token= createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//signUp a user
const signupUser = async(req, res)=>{
    const {username,email, password, age, gender, phno, disease, user_type}=req.body

    try{
        const user= await User.signupUser(username,email, password, age, gender, phno, disease, user_type)
        const token= createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//signUp Admin
const signupAdmin = async(req, res)=>{
    const {username,email, password,  age, phno, user_type}=req.body

    try{
        const user= await User.signupAdmin(username,email, password,  age, phno, user_type)
        const token= createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
module.exports={loginUser, signupUser, signupAdmin}