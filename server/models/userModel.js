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
    enum: ['customer', 'restaurantOwner', 'deliveryPerson'],
    default: 'customer'
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
  orders: [{
    type: [{ type: mongoose.Types.ObjectId,ref: "Order"}] ,
    
  }]
}, { timestamps: true });

export const User = mongoose.model("User",userSchema);
