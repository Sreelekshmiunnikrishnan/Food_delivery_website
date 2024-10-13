
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required:true,
    },
    name: {
      type: String,
      required: true
    },
    restaurantName:{
      type: String,
      required:true,
    },
    ownerId:{
      type: Schema.Types.ObjectId,
     ref: 'Owner',
  },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true
    }
  }, { timestamps: true });
  
  export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
  