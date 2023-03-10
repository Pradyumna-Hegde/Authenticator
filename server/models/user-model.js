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
  firstname: { type: String },
  lastname: { type: String },
});

export default mongoose.model("User", UserSchema);
