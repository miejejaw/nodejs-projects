import User from "../models/user.js";
import { generateOTP } from "../utils/otpCodeGenerator.js";
import sendEmail from "../services/sendEmail.js";
import {generateAccessToken, generateRefreshToken} from '../utils/tokenGenerator.js'


export const requestOTP = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otpValue = generateOTP(); 

    user.otp = otpValue;
    await user.save();

    // Send OTP via email
    const subject = "Your OTP for Verification";
    const htmlContent = `<p>Your OTP (One-Time Password) for verification is: ${otpValue}</p>`;
    await sendEmail(email, subject, htmlContent);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otp = undefined;
    await user.save();

    const accessToken = generateAccessToken(user._id, user.username, user.role);
    const refreshToken = generateRefreshToken(user._id, user.username, user.role);

    // Set cookies for tokens
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(200).json({ username: user.username, userId: user._id, role: user.role });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};
