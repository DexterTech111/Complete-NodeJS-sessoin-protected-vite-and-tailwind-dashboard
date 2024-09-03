const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  googleId: { type: String },
});

module.exports = mongoose.model('Users', UserSchema);
