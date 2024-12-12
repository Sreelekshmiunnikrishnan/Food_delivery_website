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
         menuName:{
        type:String,
        required:true,
      },
      
      price:{
        type:Number,
        required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner', // Assuming you have an Owner model to reference
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
      enum: [ 'Preparing', 'Completed', 'Cancelled','Delivered'],
      default: 'Preparing'
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
  