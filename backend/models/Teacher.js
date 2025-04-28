import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    image: {
      type: String, // link hình ảnh upload
    },
  },
  {
    timestamps: true, // tự động tạo createdAt và updatedAt
  }
);

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
