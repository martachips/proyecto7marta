const bcrypt = require('bcrypt');
const { generateSign } = require('../../../config/jwt');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      role: 'user'
    });

    const duplicatedUser = await User.findOne(
      { userName: req.body.userName },
      { email: req.body.email }
    );

    if (duplicatedUser) {
      return res.status(400).json('This username already exists');
    }

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).json('This user does not exist');
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json('Password incorrect');
    }
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deleteUser);
  } catch (error) {
    return res.status(400).json('no se pudo borrar el usuario');
  }
};

module.exports = { getUsers, register, login, deleteUser };
