import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
   default: 'customer'
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePic :{
    type : String,
    default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
  },
  status :{
    type: String,
    enum: ['Active', 'Inactive','Blocked'],
    default: 'Active'
  },
  isBlocked:{
    type :Boolean,
    default: 'false'
  },
  orders: [{
    type: [{ type: mongoose.Types.ObjectId,ref: "Order"}] ,
    
  }]
}, { timestamps: true });

export const User = mongoose.model("User",userSchema);
