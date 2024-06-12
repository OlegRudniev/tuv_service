// api/services/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const registerUser = async (username, password) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ username, password: hashedPassword });

  await newUser.save();
  const token = jwt.sign({ username: newUser.username, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { user: newUser, token };
};

export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid credentials');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error('Invalid credentials');

  const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
};
