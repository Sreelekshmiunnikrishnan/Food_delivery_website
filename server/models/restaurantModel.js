const restaurantSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
    },
    cuisineType: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    menuItems: [{
      type: Schema.Types.ObjectId,
      ref: 'MenuItem'
    }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Restaurant', restaurantSchema);
  