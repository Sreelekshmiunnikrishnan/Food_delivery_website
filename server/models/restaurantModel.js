import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    ownerEmail: {
      type:String,
     },
    owner: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required:true,
    },
    cuisineType: {
      type: String,
      required: true,
      default : "continental",
    },
    rating: {
      type: Number,
      default: 0
    },
    menuItems: [{
     type: mongoose.Types.ObjectId,ref: "MenuItem"
    }]
  }, { timestamps: true });
  
  export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
  