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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/events.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/events.js":
/*!*****************************!*\
  !*** ./assets/js/events.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar fragments = (window.syna || {}).fragments || [];\n\nif (!window.syna.listeners) {\n  window.syna.listeners = {};\n}\n\nvar listeners = window.syna.listeners;\n\nvar Stream = function () {\n  function Stream() {\n    var _this = this;\n\n    _classCallCheck(this, Stream);\n\n    this.eventTracker = this.eventTracker.bind(this);\n    this.listen = this.listen.bind(this);\n\n    fragments.forEach(function (fragment) {\n      if (!document.querySelector(fragment)) {\n        return;\n      }\n\n      var eles = document.querySelector(fragment).querySelectorAll('[data-event]');\n      eles.forEach(function (el) {\n        el.addEventListener(el.dataset.event, _this.eventTracker(fragment, el.dataset.event, el.dataset.eventName));\n      });\n    });\n\n    if (listeners.window && listeners.window.url) {\n      listeners.window.url.forEach(function (callback) {\n        return callback(window.document.location.href);\n      });\n    }\n  }\n\n  _createClass(Stream, [{\n    key: 'eventTracker',\n    value: function eventTracker(fragment, event, eventName) {\n      var name = eventName ? event + '-' + eventName : event;\n      return function (e) {\n        if (!listeners[fragment] || !listeners[fragment][name]) {\n          return;\n        }\n\n        listeners[fragment][name].forEach(function (callback) {\n          return callback(e);\n        });\n      };\n    }\n  }, {\n    key: 'listen',\n    value: function listen(fragment, event, callback) {\n      if (!listeners[fragment]) {\n        listeners[fragment] = {};\n      }\n\n      if (!listeners[fragment][event]) {\n        listeners[fragment][event] = [];\n      }\n\n      listeners[fragment][event].push(callback);\n    }\n  }]);\n\n  return Stream;\n}();\n\nwindow.syna.stream = new Stream();\n\n//# sourceURL=webpack:///./assets/js/events.js?");

/***/ })

/******/ });