import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    courseId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course', 
      required: true 
    },
    registrationDate: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
