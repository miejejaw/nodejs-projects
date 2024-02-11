import bcrypt from 'bcrypt';
import User from '../models/user.js';
import {generateVerificationToken} from '../helper/tokenGenerator.js'
import sendVerificationEmail from '../services/sendVerificationEmail.js';


// Create a new user
export const createUser = async (req, res) => {
  try {
    const { password, email, ...otherFields } = req.body;
    
    // Generate a salt with specified rounds
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateVerificationToken();

    const newUser = await User.create({ email, password: hashedPassword, verificationToken, ...otherFields });

    await sendVerificationEmail(newUser.email, verificationToken);

    // Remove password and token field from the returned user object
    const { password: passwordDiscard, verificationToken: tokenDiscard, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  const { id, ...userData } = req.body; 

  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
