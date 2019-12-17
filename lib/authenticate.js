const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models');
const hmve = require('hmve');
const config = require('../config/environment');

const authUser = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(401).json({ message: 'Authorization not found!!' });
    const decodedUser = jsonwebtoken.verify(token, config.jwt_secret_key);
    req.currentUser = decodedUser.email;
    return next();
  } catch (error) {
    return res.status(422).json({ message: hmve(User, error).message });
  }
}

module.exports = authUser;