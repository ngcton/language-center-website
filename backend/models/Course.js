import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  image: { type: String }, // 📷 Thêm field hình ảnh
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
