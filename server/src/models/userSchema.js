import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
   googleId: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["google", "regular", "hybrid"],
      required: true,
    },
  mobnumber: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
}, {timestamps : true},);

const User = mongoose.model("User", userSchema);
export default User;
