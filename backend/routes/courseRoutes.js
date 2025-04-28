import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Lấy tất cả khóa học
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Lấy chi tiết khóa học
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Tạo khóa học mới
router.post('/', async (req, res) => {
  const { title, description, teacher, startDate, endDate, image } = req.body;
  const newCourse = new Course({ title, description, teacher, startDate, endDate, image });
  const createdCourse = await newCourse.save();
  res.status(201).json(createdCourse);
});

// Cập nhật khóa học
router.put('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.teacher = req.body.teacher || course.teacher;
    course.startDate = req.body.startDate || course.startDate;
    course.endDate = req.body.endDate || course.endDate;
    course.image = req.body.image || course.image;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Xóa khóa học
router.delete('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.deleteOne();
    res.json({ message: 'Course deleted' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

export default router;
