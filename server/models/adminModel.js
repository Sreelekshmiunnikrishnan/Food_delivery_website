import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
   default: 'admin'
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilepic :{
    type : String,
    default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJQp8ndvEkIa-u1rMgJxVc7BBsR11uSLHGA&s",
  },
  /*user : [{
    type: [{ type: mongoose.Types.ObjectId,ref: "User"}] ,
    
  }],
  restaurant: [{
    type: mongoose.Types.ObjectId,ref: "Restaurant"
  }]*/
}, { timestamps: true });

export const Admin = mongoose.model("Admin",adminSchema);