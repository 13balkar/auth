const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('./redisUtil');
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const comparison = await bcrypt.compare(password, hashedPassword);
  return comparison;
};

const generateToken = async (username) => {
  const key = process.env.JWT_SECRET_KEY || 'secret';
  const data = {
    username: username,
    time: Date()
  };
  return jwt.sign(data, key);
};

const validateToken = async (token) => {

  const key = process.env.JWT_SECRET_KEY || 'secret';
  const redisClient = redis;
  const redisToken = await redisClient.get(token);
  if (redisToken !== undefined) {
    const decodedToken = jwt.verify(token, key);
    return decodedToken;
  }
  else {
    return false;
  }
};

const storeToken = async (token) => {
  const redisClient = redis;
  await redisClient.set(token, token, 'EX', 3600);

};
const authUtils = { encryptPassword, comparePassword, generateToken, validateToken, storeToken };
module.exports = authUtils;