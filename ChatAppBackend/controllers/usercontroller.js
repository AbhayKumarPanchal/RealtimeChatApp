const User = require('../models/usermodel');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const fetchedUser = await User.findOne({ name, password });
    if (!fetchedUser) {
      return res.status(401).json({ message: 'Invalid name or password' });
    }

    res.json(fetchedUser);
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

module.exports = { register, login };