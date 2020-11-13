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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/contact.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/contact.js":
/*!******************************!*\
  !*** ./assets/js/contact.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/jq-helpers */ \"./assets/js/helpers/jq-helpers.js\");\n/* harmony import */ var form_validator_simple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! form-validator-simple */ \"./node_modules/form-validator-simple/dist/bundle.js\");\n/* harmony import */ var form_validator_simple__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(form_validator_simple__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n(function () {\n  if (Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.g-recaptcha')) {\n    checkReCaptcha();\n  }\n})();\n\nvar validatorConfig = {\n  errorTemplate: '<span class=\"help-block form-error\">%s</span>',\n  onFormValidate: function onFormValidate(isFormValid, form) {\n    form.querySelector('button.submit-btn').disabled = !isFormValid;\n  },\n  onError: function onError(e, form) {\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"form[id=\".concat(form.getAttribute('id'), \"] .generic-error\")).removeClass('d-none');\n  },\n  onSuccess: function onSuccess(e, form) {\n    if (form.dataset.hasNetlify) {\n      return;\n    }\n\n    e.preventDefault();\n    var id = form.getAttribute('id');\n    var $form = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"form[id=\".concat(id, \"]\"));\n    var action = $form.attr('action');\n    var genericSuccess = $form.$('.generic-success');\n    var genericError = $form.$('.generic-error');\n    genericSuccess.addClass('hidden');\n    genericError.addClass('d-none');\n    $form.removeClass('error').removeClass('success');\n    var serializedForm = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"#\".concat(id)).serialize();\n\n    if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse() === '') {\n      grecaptcha.execute();\n      return false;\n    }\n\n    $form.$('button.submit-btn').attr('disabled', true).addClass('disabled');\n    _helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(action, serializedForm, {\n      contentType: 'application/x-www-form-urlencoded'\n    }).then(function () {\n      genericSuccess.removeClass('hidden');\n      $form.addClass('success');\n      $form.$('button.submit-btn').removeAttr('disabled').removeClass('disabled');\n    })[\"catch\"](function () {\n      genericError.removeClass('d-none');\n      $form.addClass('error');\n      $form.$('button.submit-btn').removeAttr('disabled').removeClass('disabled');\n    });\n    return false;\n  }\n};\ndocument.querySelectorAll('form.contact').forEach(function (form) {\n  new form_validator_simple__WEBPACK_IMPORTED_MODULE_1___default.a(Object.assign(validatorConfig, {\n    form: form\n  }));\n  Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(form).$('#generic-success [data-action=\"return-form\"]').on('click', function () {\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(form).$('#generic-success').addClass('hidden');\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(form).removeClass('success');\n  });\n});\n\nfunction checkReCaptcha() {\n  if (document.querySelector('.g-recaptcha-container') && typeof grecaptcha === 'undefined') {\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.captcha-error').removeClass('d-none');\n    setTimeout(checkReCaptcha, 200);\n  } else if (document.querySelector('.g-recaptcha-container div div')) {\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.captcha-error').addClass('d-none');\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.g-recaptcha-filler').addClass('d-none');\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.g-recaptcha').attr('disabled', true);\n  }\n}\n\nwindow.onContactCaptcha = function ($form) {\n  var customEvent = document.createEvent('Event');\n  customEvent.initEvent('submit', true, true);\n  document.querySelector('form.contact').dispatchEvent(customEvent);\n};\n\nwindow.syna.stream.subscribe('contact:update', function (_ref) {\n  var name = _ref.name,\n      email = _ref.email,\n      phone = _ref.phone,\n      message = _ref.message;\n  var form = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('form.contact');\n  form.$('input[name=name]').attr('value', name || null)[0].focus(); // TODO: REVISIT: Remove the following line whenever firefox fixes center on focus\n\n  form[0].scrollIntoView({\n    behavior: 'instant',\n    block: 'center'\n  });\n  form.$('input[name=email]').attr('value', email || null);\n  form.$('input[name=phone]').attr('value', phone || null);\n  form.$('textarea[name=message]').$nodes.forEach(function (node) {\n    node.innerHTML = '';\n    node.appendChild(document.createTextNode(message || ''));\n  });\n});\n\n//# sourceURL=webpack:///./assets/js/contact.js?");

/***/ }),

/***/ "./assets/js/helpers/jq-helpers.js":
/*!*****************************************!*\
  !*** ./assets/js/helpers/jq-helpers.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serialize */ \"./assets/js/helpers/serialize.js\");\n\n\nfunction $(selector) {\n  var nodes = typeof selector === 'string' ? Array.from((this && Array.isArray(this) ? this[0] : document).querySelectorAll(selector)) : [selector];\n  var _returnee = {\n    $nodes: nodes,\n    $: $.bind(nodes),\n    on: function on(event, selector, callback) {\n      if (typeof callback === 'undefined') {\n        callback = selector;\n        selector = null;\n      }\n\n      if (selector) {\n        nodes.forEach(function (node) {\n          node.addEventListener(event, function (e) {\n            if (e.target.matches(selector)) {\n              callback.call(node, e);\n            }\n          });\n        });\n      } else {\n        nodes.forEach(function (node) {\n          return node[\"on\".concat(event)] = callback.bind(node);\n        });\n      }\n\n      return _returnee;\n    },\n    addClass: function addClass(className) {\n      nodes.forEach(function (node) {\n        return node.classList.add(className);\n      });\n      return _returnee;\n    },\n    removeClass: function removeClass(className) {\n      nodes.forEach(function (node) {\n        return node.classList.remove(className);\n      });\n      return _returnee;\n    },\n    attr: function attr(attribute, value) {\n      if (value === undefined && nodes.length > 1) {\n        throw new Error(\"Can't access value of several nodes' attributes\");\n      }\n\n      if (value === undefined) {\n        return nodes[0].getAttribute(attribute);\n      } else if (value !== null) {\n        nodes.forEach(function (node) {\n          return node.setAttribute(attribute, value);\n        });\n      }\n\n      return _returnee;\n    },\n    removeAttr: function removeAttr(attribute) {\n      nodes.forEach(function (node) {\n        return node.removeAttribute(attribute);\n      });\n      return _returnee;\n    },\n    append: function append(innerHTML) {\n      nodes.forEach(function (node) {\n        return node.insertAdjacentHTML('beforeend', innerHTML);\n      });\n      return _returnee;\n    },\n    html: function html(innerHTML) {\n      if (innerHTML === undefined) {\n        if (nodes.length > 1) {\n          throw new Error(\"Can't get several nodes innerHTML at once\");\n        }\n\n        return nodes[0].innerHTML;\n      }\n\n      nodes.forEach(function (node) {\n        return node.innerHTML = innerHTML;\n      });\n      return _returnee;\n    },\n    text: function text(innerText) {\n      if (innerText === undefined) {\n        if (nodes.length > 1) {\n          throw new Error(\"Can't get several nodes innerText at once\");\n        }\n\n        return nodes[0].innerText;\n      }\n\n      if (innerText !== null) {\n        nodes.forEach(function (node) {\n          return node.innerText = innerText;\n        });\n      }\n\n      return _returnee;\n    },\n    val: function val(value) {\n      if (value === undefined) {\n        if (nodes.length > 1) {\n          throw new Error(\"Can't get several nodes value at once\");\n        }\n\n        return nodes[0].value;\n      }\n\n      nodes.forEach(function (node) {\n        return node.value = value;\n      });\n      return _returnee;\n    },\n    submit: function submit() {\n      return nodes.forEach(function (node) {\n        return node.submit();\n      });\n    },\n    serialize: function serialize() {\n      var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n\n      if (nodes.length > 1) {\n        throw new Error(\"Can't serialize multiple forms at once\");\n      }\n\n      if (json) {\n        return Object(_serialize__WEBPACK_IMPORTED_MODULE_0__[\"serializeJSON\"])(nodes[0]);\n      }\n\n      return Object(_serialize__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(nodes[0]);\n    },\n    length: nodes.length\n  };\n  nodes.forEach(function (node, index) {\n    return _returnee[index] = node;\n  });\n  return _returnee;\n}\n\n$.scrollTo = function scrollTo(element, to, duration) {\n  if (duration <= 0) return;\n  var difference = to - element.scrollTop;\n  var perTick = difference / duration * 10;\n  setTimeout(function () {\n    element.scrollTop = element.scrollTop + perTick;\n    if (element.scrollTop === to) return;\n    scrollTo(element, to, duration - 10);\n  }, 10);\n};\n\n$.ajax = function ajax(_ref) {\n  var method = _ref.method,\n      url = _ref.url,\n      data = _ref.data,\n      _ref$options = _ref.options,\n      options = _ref$options === void 0 ? {\n    contentType: 'application/json;charset=UTF-8'\n  } : _ref$options;\n  var xhr = new XMLHttpRequest();\n  xhr.open(method.toUpperCase(), url);\n  xhr.setRequestHeader('Content-Type', options.contentType);\n  xhr.send(data);\n  return new Promise(function (resolve, reject) {\n    xhr.onreadystatechange = function () {\n      if (xhr.readyState == 4) {\n        if (xhr.status == 200) {\n          resolve(JSON.parse(xhr.responseXML || xhr.responseText));\n        } else {\n          reject(xhr.statusText);\n        }\n      }\n    };\n  });\n};\n\n$.post = function (url, data, options) {\n  return $.ajax({\n    method: 'post',\n    url: url,\n    data: data,\n    options: options\n  });\n};\n\nif (window && window.testingMode) {\n  window.jqHelpers = $;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ($);\n\n//# sourceURL=webpack:///./assets/js/helpers/jq-helpers.js?");

/***/ }),

/***/ "./assets/js/helpers/serialize.js":
/*!****************************************!*\
  !*** ./assets/js/helpers/serialize.js ***!
  \****************************************/
/*! exports provided: default, serializeJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return serialize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serializeJSON\", function() { return serializeJSON; });\n// From https://code.google.com/archive/p/form-serialize/\nfunction serialize(form) {\n  if (!form || form.nodeName !== 'FORM') {\n    return;\n  }\n\n  var i,\n      j,\n      q = [];\n\n  for (i = form.elements.length - 1; i >= 0; i = i - 1) {\n    if (form.elements[i].name === '') {\n      continue;\n    }\n\n    switch (form.elements[i].nodeName) {\n      case 'INPUT':\n        switch (form.elements[i].type) {\n          case 'text':\n          case 'hidden':\n          case 'password':\n          case 'button':\n          case 'reset':\n          case 'submit':\n            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));\n            break;\n\n          case 'checkbox':\n          case 'radio':\n            if (form.elements[i].checked) {\n              q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));\n            }\n\n            break;\n\n          case 'file':\n            break;\n        }\n\n        break;\n\n      case 'TEXTAREA':\n        q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));\n        break;\n\n      case 'SELECT':\n        switch (form.elements[i].type) {\n          case 'select-one':\n            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));\n            break;\n\n          case 'select-multiple':\n            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {\n              if (form.elements[i].options[j].selected) {\n                q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].options[j].value));\n              }\n            }\n\n            break;\n        }\n\n        break;\n\n      case 'BUTTON':\n        switch (form.elements[i].type) {\n          case 'reset':\n          case 'submit':\n          case 'button':\n            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));\n            break;\n        }\n\n        break;\n    }\n  }\n\n  return q.join('&');\n}\nfunction serializeJSON(form) {\n  var obj = {};\n  var elements = form.querySelectorAll('input, select, textarea');\n\n  for (var i = 0; i < elements.length; ++i) {\n    var element = elements[i];\n    var name = element.name;\n    var value = element.value;\n\n    if (name) {\n      if (element.type === 'radio' || element.type === 'checkbox') {\n        if (element.checked) {\n          obj[name] = value;\n        }\n      } else if (element.type !== 'file') {\n        obj[name] = value;\n      }\n    }\n  }\n\n  return JSON.stringify(obj);\n}\n\n//# sourceURL=webpack:///./assets/js/helpers/serialize.js?");

/***/ }),

/***/ "./node_modules/form-validator-simple/dist/bundle.js":
/*!***********************************************************!*\
  !*** ./node_modules/form-validator-simple/dist/bundle.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function (global, factory) {\n   true ? module.exports = factory() :\n  undefined;\n}(this, (function () { 'use strict';\n\n  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n  var options = {\n    errors: {\n      email: 'Invalid email',\n      default: 'Invalid value'\n    },\n    regexes: {\n      email: /^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$/\n    }\n  };\n\n  var Validator = function () {\n    function Validator() {\n      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n          _ref$regexes = _ref.regexes,\n          regexes = _ref$regexes === undefined ? {} : _ref$regexes,\n          _ref$errors = _ref.errors,\n          errors = _ref$errors === undefined ? {} : _ref$errors,\n          onFormValidate = _ref.onFormValidate,\n          onError = _ref.onError,\n          onSuccess = _ref.onSuccess,\n          _ref$errorTemplate = _ref.errorTemplate,\n          errorTemplate = _ref$errorTemplate === undefined ? '' : _ref$errorTemplate,\n          form = _ref.form;\n\n      _classCallCheck(this, Validator);\n\n      this.regexes = _extends({}, options.regexes, regexes);\n      this.errors = _extends({}, options.errors, errors);\n      this.onError = onError;\n      this.onSuccess = onSuccess;\n      this.errorTemplate = errorTemplate;\n\n      this._fieldTimers = {};\n\n      if (onFormValidate) {\n        this._onFormValidate = this._onFormValidate(onFormValidate);\n      } else {\n        this._onFormValidate = function () {};\n      }\n\n      if (form) {\n        this.init(form);\n      }\n\n      this._validate = this._validate.bind(this);\n      this.init = this.init.bind(this);\n    }\n\n    Validator.prototype.init = function init(form) {\n      var _this = this;\n\n      var fields = {};\n\n      try {\n        fields = form.querySelectorAll('[data-validation]');\n      } catch (err) {\n        throw new Error('Finding inputs in the form failed. Are you sure \"form\" is an HTML element?');\n      }\n\n      if (fields.length > 0) {\n        form.onsubmit = this._handleSubmit(form);\n      }\n\n      fields.forEach(function (field) {\n        field.setAttribute('data-validation-valid', _this._validateInput(field));\n\n        var id = Math.random();\n        field.addEventListener('input', _this._validate(field));\n        field.addEventListener('focus', function () {\n          _this._fieldTimers[id] = setInterval(_this._validate(field), 200);\n        });\n        field.addEventListener('blur', function () {\n          clearInterval(_this._fieldTimers[id]);\n          _this._fieldTimers[id] = null;\n        });\n      });\n\n      var isFormValid = this._isFormValid(form);\n      this._onFormValidate(isFormValid, form);\n      form.setAttribute('data-validation-valid', isFormValid);\n    };\n\n    Validator.prototype._handleSubmit = function _handleSubmit(form) {\n      var _this2 = this;\n\n      return function (e) {\n        if (form.getAttribute('data-validation-valid') === 'false') {\n          e.preventDefault();\n          e.stopPropagation();\n\n          if (_this2.onError) {\n            _this2.onError(e, form);\n          }\n\n          return false;\n        } else if (_this2.onSuccess) {\n          _this2.onSuccess(e, form);\n        }\n      };\n    };\n\n    Validator.prototype._isFormValid = function _isFormValid(form) {\n      return !Array.from(form.querySelectorAll('[data-validation]')).some(function (field) {\n        return field.getAttribute('data-validation-valid') === 'false';\n      });\n    };\n\n    Validator.prototype._onFormValidate = function _onFormValidate(callback) {\n      return function (validity, form) {\n        callback(validity, form);\n      };\n    };\n\n    Validator.prototype._validate = function _validate(field) {\n      var _this3 = this;\n\n      return function () {\n        var form = field.closest('form');\n        var errorContainer = field.closest('div').querySelector('[data-error]');\n        var isFieldValid = _this3._validateInput(field);\n        var isFormValid = isFieldValid ? _this3._isFormValid(form) : false;\n        field.setAttribute('data-validation-valid', isFieldValid);\n\n        if (isFieldValid) {\n          form.setAttribute('data-validation-valid', isFormValid);\n          field.classList.remove('error');\n          field.classList.add('valid');\n          _this3._hideError(field, errorContainer);\n        } else {\n          form.setAttribute('data-validation-valid', false);\n          field.classList.add('error');\n          field.classList.remove('valid');\n          _this3._displayError(field, errorContainer);\n        }\n\n        _this3._onFormValidate(isFormValid, form);\n      };\n    };\n\n    Validator.prototype._displayError = function _displayError(field, errorContainer) {\n      if (errorContainer) {\n        var errorMsg = field.getAttribute('data-validation-error-msg');\n        errorContainer.innerHTML = this._formatError(errorMsg || this.errors[field.getAttribute('data-validation')] || this.errors.default);\n        errorContainer.classList.add('has-error');\n      }\n    };\n\n    Validator.prototype._hideError = function _hideError(field, errorContainer) {\n      if (errorContainer) {\n        errorContainer.innerHTML = '';\n        errorContainer.classList.remove('has-error');\n      }\n    };\n\n    Validator.prototype._validateInput = function _validateInput(field) {\n      var value = field.value;\n      var validation = field.getAttribute('data-validation');\n      var regex = field.getAttribute('data-validation-regex');\n      var required = field.required;\n\n      switch (validation) {\n        case '':\n          return required ? !!value : true;\n\n        case 'regex':\n          return new RegExp(regex).test(value);\n\n        default:\n          return new RegExp(this.regexes[validation]).test(value);\n      }\n    };\n\n    Validator.prototype._formatError = function _formatError(string) {\n      return this.errorTemplate.replace('%s', string);\n    };\n\n    return Validator;\n  }();\n\n  return Validator;\n\n})));\n//# sourceMappingURL=bundle.js.map\n\n\n//# sourceURL=webpack:///./node_modules/form-validator-simple/dist/bundle.js?");

/***/ })

/******/ });