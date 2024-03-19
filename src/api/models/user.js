const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    email: { type: String, required: true },
    birthYear: { type: Number },
    role: {
      type: String,
      trim: true,
      required: true,
      enum: ['admin', 'user'],
      required: true
    },
    imgProfile: { type: String }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

//!para encriptar la contraseña del usuario
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');
module.exports = User;
