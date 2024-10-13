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
      price:{
        type:Number,
        required: true,
    },
      }],
      quantity: {
        type: Number,
        required: true
      },
    totalPrice: {
      type: Number,
      ref: 'Cart',
      required: true,
      default:0,
    },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'delivered', 'cancelled'],
      default: 'pending'
    },
    //deliveryPerson: {
     // type: Schema.Types.ObjectId,
     // ref: 'User',
     // required: false
  //  },
    deliveryAddress: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash', 'online'],
      required: true
    },
    orderDate: { type: Date, default: Date.now },
    deliveryTime: {
      type: Date,
    }
  }, { timestamps: true });
  
  export const Order = mongoose.model('Order', orderSchema);
  