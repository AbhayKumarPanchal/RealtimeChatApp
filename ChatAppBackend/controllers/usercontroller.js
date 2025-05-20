const mongoose = require('mongoose');
const User = require('../models/usermodel.js');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.send(newUser);
};

const login = async (req, res) => {
  const { name, password } = req.body;

  const fetchedUser = await User.findOne({ name, password });
  if (!fetchedUser) {
    return res.send('name or password is wrong!');
  }
  res.send(fetchedUser);
};

module.exports = { register, login };