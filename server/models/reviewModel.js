import  mongoose  from "mongoose";
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    menuName: {
      type: String,
    required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
    }
  }, { timestamps: true });
  
  export const Review = mongoose.model('Review', reviewSchema);
  