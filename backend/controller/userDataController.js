const UserData = require('../model/userDataModel')


//create a user data 
const createUserData=async(req,res)=>{
  const {uname, heartbeat, pulserate, oxygen, temperature, ecg}=req.body

  try {
    const user_id = req.user._id
    const userData = await UserData.create({uname, heartbeat, pulserate, oxygen, temperature, ecg ,user_id})
    res.status(200).json(userData)

  } catch (error) {
    res.status(400).json({error: error.message})
  }      
}


//get a single user data
const getUserData = async(req, res) => {
  try{
    const user_id = req.user._id
    const userData = await UserData.findOne({user_id})
    res.status(200).json(userData)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }
 


 //get all user datas by admin
 const getUserDatas = async(req, res) => {
  try{
    const userDatas = await UserData.find()
    res.status(200).json(userDatas)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }


//add or upload report by admin || senDraft
const uploadReport = async(req, res) => {
  
  const {id }= req.params
  
  try{
    const {report} = req.body
    const userData = await UserData.updateOne({_id:id},
      {
      $set:{report:report}
    })

    res.status(200).json(userData)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }
 


 module.exports={
    createUserData,
    getUserData,
    getUserDatas,
    uploadReport
}



