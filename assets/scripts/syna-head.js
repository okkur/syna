/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/head.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/head.js":
/*!***************************!*\
  !*** ./assets/js/head.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Stream = function () {\n  function Stream() {\n    _classCallCheck(this, Stream);\n\n    this._topics = {};\n    this.subUid = -1;\n    this.subscribe = this.subscribe.bind(this);\n    this.publish = this.publish.bind(this);\n    this.unsubscribe = this.unsubscribe.bind(this);\n  }\n\n  _createClass(Stream, [{\n    key: 'subscribe',\n    value: function subscribe(topic, func) {\n      if (!this._topics[topic]) {\n        this._topics[topic] = [];\n      }\n      var token = (++this.subUid).toString();\n      this._topics[topic].push({ token: token, func: func });\n      return token;\n    }\n  }, {\n    key: 'publish',\n    value: function publish(topic, argsText) {\n      var _this = this;\n\n      if (!this._topics[topic]) {\n        return false;\n      }\n      setTimeout(function () {\n        var subscribers = _this._topics[topic];\n        var args = argsText.split(',').reduce(function (tmp, param) {\n          var _param$split = param.split(':'),\n              _param$split2 = _slicedToArray(_param$split, 2),\n              key = _param$split2[0],\n              value = _param$split2[1];\n\n          tmp[key] = value;\n          return tmp;\n        }, {});\n\n        var len = subscribers ? subscribers.length : 0;\n        while (len--) {\n          subscribers[len].func.call(null, args);\n        }\n      }, 0);\n      return true;\n    }\n  }, {\n    key: 'unsubscribe',\n    value: function unsubscribe(token) {\n      for (var topic in this._topics) {\n        if (this._topics[topic]) {\n          for (var i = 0, j = this._topics[topic].length; i < j; i++) {\n            if (this._topics[topic][i].token === token) {\n              this._topics[topic].splice(i, 1);\n              return token;\n            }\n          }\n        }\n      }\n      return false;\n    }\n  }]);\n\n  return Stream;\n}();\n\nvar SynaAPI = function () {\n  function SynaAPI() {\n    _classCallCheck(this, SynaAPI);\n\n    this._registry = {};\n    this.register = this.register.bind(this);\n    this.update = this.update.bind(this);\n    this.get = this.get.bind(this);\n    this.getScope = this.getScope.bind(this);\n    this.toArray = this.toArray.bind(this);\n  }\n\n  _createClass(SynaAPI, [{\n    key: 'register',\n    value: function register(scope, id, value) {\n      if (!this._registry[scope]) {\n        this._registry[scope] = {};\n      }\n\n      this._registry[scope][id] = value;\n    }\n  }, {\n    key: 'update',\n    value: function update(scope, id, value) {\n      if (!this._registry[scope] || !this._registry[scope][id]) {\n        return null;\n      }\n\n      this._registry[scope][id] = value;\n      return value;\n    }\n  }, {\n    key: 'get',\n    value: function get(scope, id) {\n      if (!this._registry[scope]) {\n        return null;\n      }\n\n      return this._registry[scope][id];\n    }\n  }, {\n    key: 'getScope',\n    value: function getScope(scope) {\n      return this._registry[scope];\n    }\n  }, {\n    key: 'toArray',\n    value: function toArray(scope) {\n      if (!this._registry[scope]) {\n        return null;\n      }\n\n      return Object.values(this._registry[scope]);\n    }\n  }]);\n\n  return SynaAPI;\n}();\n\nwindow.syna = {\n  api: new SynaAPI(),\n  stream: new Stream()\n};\nwindow.synaPortals = {};\n\n//# sourceURL=webpack:///./assets/js/head.js?");

/***/ })

/******/ });