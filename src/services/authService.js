const { Users } = require('../../database/models');
const httpError = require('../../errors/httpErrors');
const { encryptPassword, comparePassword, generateToken, validateToken, storeToken } = require('../utils/authUtil');

const create = async (username, password) => {
  const userExists = await Users.findOne({ where: { username: username } });
  if (userExists) {
    throw new httpError('User already exists', 409);
  }
  else {
    password = await encryptPassword(password);
    await Users.create({ username, password });
    return ({ message: 'User created successfully' });
  }
};

const login = async (username, password) => {
  const userExists = await Users.findOne({ where: { username: username } });
  if (!userExists) {
    throw new httpError('User not found', 404);
  }
  else {
    if (await comparePassword(password, userExists.password)) {
      const token = await generateToken(username);
      storeToken(token);
      return ({ token });
    }
    else
      throw new httpError('Invalid Password', 401);
  }
};

const validateHandler = async (token) => {

  const validatedToken = await validateToken(token);
  if (!validatedToken) {
    console.log(37);
    throw new httpError('Invalid Token', 401);
  }
  else {
    const userExists = await Users.findOne({ where: { username: validatedToken.username } });
    if (!userExists) {
      throw new httpError('User not found', 404);
    } else {
      return userExists;
    }
  }
};
module.exports = { create, login, validateHandler };