import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import courseRoutes from './routes/courseRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

dotenv.config();

const app = express();

// Parse body JSON
app.use(express.json());

// Allow all domain
app.use(cors());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/users', userRoutes);

// Xử lý static folder cho ảnh upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve frontend (production build)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
