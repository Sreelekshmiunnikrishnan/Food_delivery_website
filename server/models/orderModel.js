import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    items: [{
      menuId: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
      },
      menuName:{
        type:String,
        required:true,
      },
      price:{
        type:Number,
        required: true,
    },
      }],
      quantity: {
        type: Number,
        required: true
      },
    
    status: {
      type: String,
      enum: ['pending', 'preparing', 'delivered', 'cancelled'],
      default: 'pending'
    },
   
     deliveryAddress: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash', 'online'],
      required: true
    },
    
    OrderId :{
      type:String,
      required:true,
    },
   /* orderDate: { type: Date, default: Date.now },
    delivery: {
      type: Date,
    } */
  }, { timestamps: true });
  
  export const Order = mongoose.model('Order', orderSchema);
  