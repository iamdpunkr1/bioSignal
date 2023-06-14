const mongoose = require("mongoose");
const  userDataSchema = new mongoose.Schema(
  {
    heartbeat: {
      type: String,
      required:true
    },
    pulserate: {
      type: String,
      required: true,
    },
   oxygen: {
      type: String,
      required: true,
    },
    temperature: {
      type: String,
      required:true
    },
    ecg: {
      type: String,
      required:true
    },
    report:{
        type: String
    }
    ,
    user_id:{
      type:String,
      required: true
    }
  },
  { timestamps: true }
);

const UserData = mongoose.model("userData", userDataSchema);
module.exports = UserData;