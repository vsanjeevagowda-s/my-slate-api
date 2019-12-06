const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hmve = require('hmve');
const { User } = require('../../../models');
const config = require('../../../config/environment');

const session = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) throw new Error('username/password is invalid');
    const user = await User.findOne({ email }, { email: 1, password: 1 })
    if (!(user && bcrypt.compareSync(password, user.password))) throw new Error('username/password is invalid');
    const token = jwt.sign({
      id: user.id,
      email: user.email,
    }, config.jwt_secret_key);
    message = 'Logged in Successfully!!';
    return res.status(201).json({ message, user: { email: user.email }, token });
  } catch (error) {
    return res.status(400).json({ message: hmve(User, error).message });
  }
};

module.exports = { session };