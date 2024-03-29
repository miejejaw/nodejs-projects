import mongoose from "mongoose";
import contactSchema from "./contact.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  isVerified: { type: Boolean, default: false},
  verificationToken: { type: String},
  otp: { type: String},
  createdAt: { type: Date, default: Date.now },
  contacts: [contactSchema] 
});

const User = mongoose.model("User", userSchema);

export default User;
