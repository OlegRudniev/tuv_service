import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todos.js';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
