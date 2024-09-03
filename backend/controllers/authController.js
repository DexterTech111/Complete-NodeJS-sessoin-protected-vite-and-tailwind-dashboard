const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(401).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

exports.googleAuth = async (req, res) => {
  const { email, googleId, username, image } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      username,
      email,
      googleId,
      image,
    });
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    image: user.image,
    token: generateToken(user._id),
  });
};


exports.updateUserProfile = async (req, res) => {
    const { username, email, password, newPassword } = req.body;
  
    const user = await User.findById(req.user._id);
  
    if (user && (await bcrypt.compare(password, user.password))) {
      user.username = username || user.username;
      user.email = email || user.email;
      if (newPassword) {
        user.password = await bcrypt.hash(newPassword, 12);
      }
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid password' });
    }
  };
  
  
  exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  
