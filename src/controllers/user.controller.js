// import User from '../models/user.model';
const { INTERNAL_SERVER_ERROR } = require('http-status');
const User = require('../models/user.model');

class users {
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide all required fields',
        });
      }

      const userExists = await User.findOne({
        email: req.body.email,
      });
      if (userExists) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists',
        });
      }

      const user = await User.create(req.body);
      return res.status(201).json({
        status: 201,
        message: 'User created',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: 'Server error',
      });
    }
  }
  static async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json({
        status: 200,
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: 'Server error',
      });
    }
  }
}

module.exports = users;
