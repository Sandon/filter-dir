'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Sandon on 2017/1/22.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _ignore = require('ignore');

var _ignore2 = _interopRequireDefault(_ignore);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = function () {
  return new FilterDir();
};

var FilterDir = function () {
  function FilterDir() {
    _classCallCheck(this, FilterDir);

    this._patterns = [];
    this._ig = null;
  }

  _createClass(FilterDir, [{
    key: 'add',
    value: function add(patterns) {
      if (Array.isArray(patterns)) {
        this._patterns = this._patterns.concat(patterns);
      } else if (typeof patterns === 'string' || patterns instanceof String) {
        this._patterns.push(patterns);
      } else {
        throw new Error('patterns must be String or Array');
      }
    }
  }, {
    key: 'filter',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dir) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._ig = (0, _ignore2.default)().add(this._patterns);
                _context.next = 3;
                return this._filterDir(dir, '');

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function filter(_x) {
        return _ref.apply(this, arguments);
      }

      return filter;
    }()
  }, {
    key: '_filterDir',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(dirPath, unprefixedPath) {
        var self, stat, files, len, i, item, itemDirPath, itemUnprefixedPath;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                _context2.next = 3;
                return _fs2.default.stat(dirPath);

              case 3:
                stat = _context2.sent;

                if (stat.isDirectory()) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', true);

              case 6:
                _context2.next = 8;
                return _fs2.default.readdir(dirPath);

              case 8:
                files = _context2.sent;
                len = files.length;
                i = 0;

              case 11:
                if (!(i !== len)) {
                  _context2.next = 27;
                  break;
                }

                item = files[i];
                itemDirPath = _path2.default.join(dirPath, item);
                itemUnprefixedPath = _path2.default.join(unprefixedPath, item);

                if (!this._ig.ignores(itemUnprefixedPath)) {
                  _context2.next = 20;
                  break;
                }

                _context2.next = 18;
                return remove(itemDirPath);

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.next = 22;
                return self._filterDir(itemDirPath, itemUnprefixedPath);

              case 22:
                if (_context2.sent) {
                  _context2.next = 24;
                  break;
                }

                return _context2.abrupt('return', false);

              case 24:
                i++;
                _context2.next = 11;
                break;

              case 27:
                return _context2.abrupt('return', true);

              case 28:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _filterDir(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return _filterDir;
    }()
  }, {
    key: 'getPatterns',
    value: function getPatterns() {
      return this._patterns;
    }
  }, {
    key: 'addIgnoreFile',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(path) {
        var exists, patterns;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _fs2.default.exists(path);

              case 2:
                exists = _context3.sent;

                if (exists) {
                  _context3.next = 5;
                  break;
                }

                throw new Error(path + ' doesn\'t exist.');

              case 5:
                _context3.next = 7;
                return _fs2.default.readFile(path, 'utf8');

              case 7:
                patterns = _context3.sent;

                this._patterns = this._patterns.concat(patterns.split(/\n/g));

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addIgnoreFile(_x4) {
        return _ref3.apply(this, arguments);
      }

      return addIgnoreFile;
    }()
  }]);

  return FilterDir;
}();

function remove(path) {
  return new Promise(function (resolve, reject) {
    _fsExtra2.default.remove(path, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}