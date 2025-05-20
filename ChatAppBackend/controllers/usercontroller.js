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

const logout = async (req, res ) => {
  try{
    const  id  = req.params.id;

    const fetchedUser = await User.findByIdAndDelete(id);

    if(!fetchedUser){
      res.send("user not found")
    }
    return res.send(fetchedUser);
  }catch( err ){
    console.error(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = { register, login };
