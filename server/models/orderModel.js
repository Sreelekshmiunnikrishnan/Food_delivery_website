const orderSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    items: [{
      menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'delivered', 'cancelled'],
      default: 'pending'
    },
    deliveryPerson: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
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
    orderTime: {
      type: Date,
      default: Date.now
    },
    deliveryTime: {
      type: Date
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Order', orderSchema);
  