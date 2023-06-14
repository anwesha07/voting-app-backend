const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  email: {
    type: String,
    min: 5,
    required: true,
    unique: true,
  },
  aadhaar: {
    type: String,
    minlength: 12,
    maxlength: 12,
    required: true,
    validate: {
      validator(value) {
        return /^[0-9]+$/.test(value);
      },
      message: 'Field should contain exactly 12 digits',
    },
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

const saveNewUser = async (userDetails) => {
  const newUser = new User(userDetails);
  return newUser.save();
};

const getUserByUserName = async (userName) => User.findOne({ userName });
const getUserByEmail = async (email) => User.findOne({ email });
const getUserByAadhaar = async (aadhaar) => User.findOne({ aadhaar });

const getUserByUserId = async (userId) => User.findById(userId);

const updateToken = (id, token) =>
  User.findByIdAndUpdate(id, { token }, { new: true });

const resetTokenByUserId = (id) =>
  User.findByIdAndUpdate(id, { token: null }, { new: true });

module.exports = {
  saveNewUser,
  getUserByUserName,
  getUserByEmail,
  getUserByAadhaar,
  updateToken,
  getUserByUserId,
  resetTokenByUserId,
};
