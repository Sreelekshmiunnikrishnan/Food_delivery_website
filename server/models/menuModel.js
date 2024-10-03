const menuItemSchema = new Schema({
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('MenuItem', menuItemSchema);
  