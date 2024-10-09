import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
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
   default: 'restaurantOwner'
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilepic :{
    type : String,
    default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
  },
  status :{
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  isBlocked:{
    type :Boolean,
    default: 'false'
  },
  
}, { timestamps: true });

export const Owner = mongoose.model("Owner",ownerSchema);