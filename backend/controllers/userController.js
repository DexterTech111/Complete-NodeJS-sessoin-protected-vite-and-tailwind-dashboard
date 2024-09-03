const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');


  
  exports.getUserList = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users); // Return users as JSON
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
  };
  

  
