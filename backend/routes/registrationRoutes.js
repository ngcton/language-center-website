import express from 'express';
import Registration from '../models/Registration.js';
import Course from '../models/Course.js';

const router = express.Router();

// Lấy tất cả đăng ký kèm thông tin khóa học
router.get('/', async (req, res) => {
  const registrations = await Registration.find().populate('courseId', 'title');
  res.json(registrations);
});

// Đăng ký mới
router.post('/', async (req, res) => {
  const { name, email, courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const newRegistration = new Registration({
    name,
    email,
    courseId,
  });

  const createdReg = await newRegistration.save();
  res.status(201).json(createdReg);
});

// Xóa đăng ký học viên
router.delete('/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (registration) {
      await registration.deleteOne();
      res.json({ message: 'Đã xóa đăng ký thành công' });
    } else {
      res.status(404).json({ message: 'Đăng ký không tồn tại' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Lỗi khi xóa đăng ký' });
  }
});


export default router;
