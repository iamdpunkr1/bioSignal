const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema= new Schema({
    
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
     
    },
    phno:{
        type: Number,
        required: true
    },
    disease:{
        type: String,
       
    },
    user_type:{
        type:String,
        required:true
    }
})

// static Admin SignUP method
userSchema.statics.signupAdmin=async function(username, email, password, age, phno, user_type){
    if(!username || !email || !password || !age || !phno || !user_type){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }


    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use")
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password, salt)
    const user= await this.create({username, email, password:hash, age, phno, user_type}) 

    return user

}

// static user SignUP method
userSchema.statics.signupUser=async function(username, email, password, age, gender, phno, disease, user_type){
    if(!username || !email || !password || !age || !gender || !phno || !disease || !user_type){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }


    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use")
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password, salt)
    const user= await this.create({username, email, password:hash, age, gender, phno, disease, user_type}) 

    return user

}

userSchema.statics.login= async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match= await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Password")
    }

    return user
}

module.exports=mongoose.model('User',userSchema)