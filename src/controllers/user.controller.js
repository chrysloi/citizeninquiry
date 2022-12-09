// import User from '../models/user.model';
const { INTERNAL_SERVER_ERROR } = require('http-status');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class users {
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      let salt, hash;

      console.log(req.body);
      if (!name || !password || !email) {
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
      } else {
        salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(password, salt);
      }

      const user = await User.create({ password, email, name });
      const token = jwt.sign(
        { id: user._id, user },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
      );
      return res.status(201).json({
        message: 'User created',
        data: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async getUsers(req, res) {
    try {
      const { userId } = req.query;

      if (userId) {
        const user = await User.findById(userId).select('-password');
        return res.status(200).json({
          status: 200,
          data: user,
        });
      }
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

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide all required fields',
        });
      }
      const user = await User.findOne({ $where: { email } });
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid credentials',
        });
      }
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
      );
      return res.status(200).json({
        message: 'User logged in successfully',
        data: { token, user },
      });
    } catch (error) {
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }
}

module.exports = users;
