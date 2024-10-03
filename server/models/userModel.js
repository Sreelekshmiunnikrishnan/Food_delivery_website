const mongoose = require('mongoose');
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
    enum: ['customer', 'restaurantOwner', 'deliveryPerson','admin'],
    default: 'customer'
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
