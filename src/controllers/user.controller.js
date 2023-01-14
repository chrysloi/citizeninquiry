const { INTERNAL_SERVER_ERROR } = require('http-status');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class users {
  static async createUser(req, res) {
    try {
      const { name, email, password, phone, village, cell } =
        req.body;
      let salt, hash;

      if (
        !name ||
        !password ||
        !email ||
        !phone ||
        !village ||
        !cell
      ) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide all required fields',
        });
      }

      const userWithPhoneExists = await User.findOne({
        phone,
      });
      const userWithEmailExists = await User.findOne({
        email,
      });
      if (userWithPhoneExists) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists',
        });
      } else if (userWithEmailExists) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists',
        });
      } else {
        salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(password, salt);
      }

      const user = await User.create({
        password: hash,
        email,
        name,
        phone,
        cell,
        village,
      });
      const token = jwt.sign(
        { id: user._id, user },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
      );
      return res.status(201).json({
        message: 'User created',
        data: { token, user },
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
      const users = await User.find().select('-password').populate({
        path: 'cell village',
      });
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
      const { phone, password } = req.body;
      if (!phone || !password) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide all required fields',
        });
      }
      const user = await User.findOne({ phone }).populate({
        path: 'cell village',
        select: 'name name',
      });
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }
      const isMatch = await bcrypt.compare(password, password);
      if (!isMatch) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid credentials',
        });
      }
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return res.status(200).json({
        message: 'User logged in successfully',
        data: { token, user },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { userId } = req.query;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      return res.status(200).json({
        status: 200,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async getUserInfo(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select('-password');
      return res.status(200).json({
        status: 200,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async logoutUser(req, res) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const randomNumberToAppend = toString(
        Math.floor(Math.random() * 1000 + 1),
      );
      const hashedRandomNumberToAppend = await bcrypt.hash(
        randomNumberToAppend,
        10,
      );
      token = token + hashedRandomNumberToAppend;
      res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
      return res.status(500).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }
}

module.exports = users;
