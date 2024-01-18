import User from './models/User.js';

export const user_register_controller = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const user_get_controller = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const user_edit_controller = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assuming you have an edit logic here, modify as needed
    user.username = req.body.username;
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;

    await user.save();
    res.json({ message: 'User edited successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const user_update_controller = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assuming you have an update logic here, modify as needed
    user.username = req.body.username || user.username;
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.role = req.body.role || user.role;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const user_delete_controller = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
