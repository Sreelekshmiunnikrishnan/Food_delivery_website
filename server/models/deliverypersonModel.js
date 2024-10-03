const deliveryPersonSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vehicleType: {
      type: String,
      enum: ['bike', 'car', 'scooter'],
      required: true
    },
    available: {
      type: Boolean,
      default: true
    },
    currentLocation: {
      type: String,
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('DeliveryPerson', deliveryPersonSchema);
  