import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userEmail:{
      type:String,
      required:true,
    },
    
    items: [{
     /*   menuId:{
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
        },    */
     menuName:{
        type:String,
        required:true,
      },
      
      price:{
        type:Number,
        required: true,
    },
   }],
   /*  totalAmount: {
    type: Number,
    required: true,
},  */
   /*  menuId:{
  type: Schema.Types.ObjectId,
  ref: 'MenuItem',
  required: true
  },   */
      quantity: {
        type: Number,
        required: true
      },
    
    status: {
      type: String,
      enum: ['pending', 'preparing', 'completed', 'cancelled'],
      default: 'pending'
    },
    orderId: String,
   
    /*  deliveryAddress: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash', 'online'],
      required: true
    }, */
    
   
  
  }, { timestamps: true });
  
  export const Order = mongoose.model('Order', orderSchema);
  