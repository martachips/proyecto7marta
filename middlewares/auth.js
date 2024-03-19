const { veryfyJWT } = require('../config/jwt');
const User = require('../src/api/models/user');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');

    const { id } = veryfyJWT(parsedToken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json('You are not authorized');
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');

    const { id } = veryfyJWT(parsedToken);
    const user = await User.findById(id);

    if (user.role === 'admin') {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res.status(400).json("You're not an Admin");
    }
  } catch (error) {
    return res.status(400).json('You are not authorized');
  }
};

module.exports = { isAuth, isAdmin };
