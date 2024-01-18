import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  credit_hours: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
