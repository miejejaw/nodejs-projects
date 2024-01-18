import Course from '../models/CourseSchema.js';

export const create_course_controller = async (req, res) => {
    try {
      const { course_id, course_name, credit_hours } = req.body;
  
      // Ensure all required fields are provided
      if (!course_id || !course_name || !credit_hours) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const newCourse = new Course({ course_id, course_name, credit_hours });
      await newCourse.save();
      res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const get_course_controller = async (req, res) => {
  const { course_id } = req.params;

  try {
    const course = await Course.findOne({ course_id });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const edit_course_controller = async (req, res) => {
  const { course_id } = req.params;

  try {
    const course = await Course.findOne({ course_id });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Assuming you have an edit logic here, modify as needed
    course.course_name = req.body.course_name;

    await course.save();
    res.json({ message: 'Course edited successfully', course });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const update_course_controller = async (req, res) => {
  const { course_id } = req.params;

  try {
    const course = await Course.findOne({ course_id });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Assuming you have an update logic here, modify as needed
    course.course_name = req.body.course_name || course.course_name;

    await course.save();
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const delete_course_controller = async (req, res) => {
  const { course_id } = req.params;

  try {
    const course = await Course.findOne({ course_id });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await course.remove();
    res.json({ message: 'Course deleted successfully', course });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
