import mongoose from "mongoose";
const Schema =mongoose.Schema;
const cartSchema = new Schema({
      userId:{
        type: Schema.Types.ObjectId,ref: "User",
        required:true,
      },
      menus:[{
        menuId:{
            type:Schema.Types.ObjectId,ref: "MenuItem",
        required:true,
        },
        menuName:{
          type:String,
          required:true,
        },
        price:{
            type:Number,
            required: true,
        },
      },
    ],
    totalPrices:{
        type:Number,
        required: true,
        default:0,
    },
},
{timestamps:true}
);

cartSchema.methods.calculateTotalPrice =function(){
  this.totalPrices = this.menus.reduce((total,menu) => total + menu.price,0);
};

export const Cart = mongoose.model('Cart', cartSchema);
  