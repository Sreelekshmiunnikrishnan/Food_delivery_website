import { Mongoose } from "mongoose";
const Schema = Mongoose.Schema;

const adminSchema = new Schema({
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
    default: 'admin'
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  user : [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  restaurant: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }]
}, { timestamps: true });

export const Admin = mongoose.model("Admin",adminSchema);