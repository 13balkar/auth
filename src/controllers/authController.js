const httpError = require('../../errors/httpErrors');
const services = require('../services/authService');
const { JsonWebTokenError } = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await services.create(username, password);
    res.status(201).json(user);
  }
  catch (err) {
    console.log(err);
    if (err instanceof httpError) {
      res.status(err.code).json(err.message);
    }
    else {
      res.status(500).json('Internal server error');
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await services.login(username, password);
    res.status(200).json(user);
  }
  catch (err) {
    console.log(err);
    if (err instanceof httpError) {
      res.status(err.code).json(err.message);
    }
    else {
      res.status(500).json('Internal server error');
    }
  }
};

const validateHandler = async (req, res) => {
  try {
    const { token } = req.headers;
    const user = await services.validateHandler(token);
    res.status(200).json(user);
  }
  catch (err) {
    console.log(err);
    if (err instanceof httpError) {
      res.status(err.code).json(err.message);
    } else if (err instanceof JsonWebTokenError) {
      res.status(401).json('Invalid Token');
    }
    else {
      res.status(500).json('Internal server error');
    }
  }
};

module.exports = { createUser, loginUser, validateHandler };