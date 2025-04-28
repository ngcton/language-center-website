import express from 'express';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// Lấy danh sách giáo viên
router.get('/', async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

// Tạo giáo viên mới
router.post('/', async (req, res) => {
  const { name, bio, image } = req.body;
  const newTeacher = new Teacher({ name, bio, image });
  const createdTeacher = await newTeacher.save();
  res.status(201).json(createdTeacher);
});

// Cập nhật giáo viên
router.put('/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (teacher) {
    teacher.name = req.body.name || teacher.name;
    teacher.bio = req.body.bio || teacher.bio;
    teacher.image = req.body.image || teacher.image;

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } else {
    res.status(404).json({ message: 'Teacher not found' });
  }
});

// Xóa giáo viên
router.delete('/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (teacher) {
    await teacher.deleteOne();
    res.json({ message: 'Teacher deleted' });
  } else {
    res.status(404).json({ message: 'Teacher not found' });
  }
});

export default router;
