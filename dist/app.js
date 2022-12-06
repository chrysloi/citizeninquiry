"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _morgan = _interopRequireDefault(require("morgan"));
require('dotenv').config({
  path: '../.env'
});
var DB = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/citzens';
var PORT = process.env.PORT || 2022;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use('/api', function (req, res) {
  res.send({
    message: 'welcome to my server'
  });
});
app.listen(PORT, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var _mongoose$connect;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _mongoose["default"].set('strictQuery', false);
          _mongoose["default"].connect(DB, (_mongoose$connect = {
            useUnifiedTopology: true
          }, (0, _defineProperty2["default"])(_mongoose$connect, "useUnifiedTopology", true), (0, _defineProperty2["default"])(_mongoose$connect, "useNewUrlParser", true), _mongoose$connect)).then(function () {
            console.info('Connected to MongoDB');
            console.info("Listening to port ".concat(PORT));
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
var _default = app;
exports["default"] = _default;