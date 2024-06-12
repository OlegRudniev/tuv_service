// api/routes/auth.js
import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await registerUser(username, password);
    res.status(201).json({ result: user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await loginUser(username, password);
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
