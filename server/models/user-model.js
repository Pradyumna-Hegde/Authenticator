import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "provide unique username"],
    trim: true,
    maxlength: [16, "username should not be more than 16 characters"],
  },
  password: {
    type: String,
    required: [true, "please provide a strong password"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  profile: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  mobile: { type: String },
  address: { type: String },
});

export default mongoose.model("User", UserSchema);
