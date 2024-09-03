const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');


  
  exports.getUserCount = async (req, res) => {
    try {
      // Count the number of documents in the User3 collection
      const count1 = await User.countDocuments({});
      
      // Return the count as a JSON response
      const data = [
        { count: count1, value: 1 },
        { count: 4*count1, value: 1 },
        { count: 4, value: 1 },
        { count: count1, value: 1 }
      ];
      res.status(200).json({ data });
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error('Error getting user count:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
