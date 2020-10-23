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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/helpers/bootstrap-helper.js":
/*!***********************************************!*\
  !*** ./assets/js/helpers/bootstrap-helper.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _jq_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jq-helpers */ \"./assets/js/helpers/jq-helpers.js\");\n// Updated the script from https://stackoverflow.com/questions/43417452/animate-navbar-collapse-using-pure-js-css/43434017#43434017\n\nvar toggle = document.querySelectorAll('.navbar-toggler');\nvar collapse = document.querySelectorAll('.navbar-collapse');\nvar dropdowns = document.querySelectorAll('.dropdown') || [];\n\nfunction toggleMenu(node) {\n  var menu = document.querySelector(node.dataset.target);\n  menu.classList.toggle('in');\n}\n\nfunction closeMenus() {\n  Array.from(dropdowns || []).forEach(function (node) {\n    node.querySelector('.dropdown-toggle').classList.remove('dropdown-open');\n    node.classList.remove('open');\n  });\n}\n\nfunction closeMenusOnResize() {\n  if (document.body.clientWidth >= 768) {\n    closeMenus();\n    Array.from(collapse || []).forEach(function (node) {\n      return node.classList.remove('in');\n    });\n  }\n}\n\nfunction toggleDropdown() {\n  if (document.body.clientWidth < 768) {\n    var open = this.classList.contains('open');\n    closeMenus();\n\n    if (!open) {\n      this.querySelector('.dropdown-toggle').classList.toggle('dropdown-open');\n      this.classList.toggle('open');\n    }\n  }\n}\n\nwindow.addEventListener('resize', closeMenusOnResize, false);\nArray.from(dropdowns || []).forEach(function (node) {\n  return node.addEventListener('click', toggleDropdown);\n});\nArray.from(toggle || []).forEach(function (node) {\n  return node.addEventListener('click', function (e) {\n    return toggleMenu(node);\n  }, false);\n});\n\n//# sourceURL=webpack:///./assets/js/helpers/bootstrap-helper.js?");

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

/***/ "./assets/js/index.js":
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_bootstrap_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bootstrap-helper */ \"./assets/js/helpers/bootstrap-helper.js\");\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroll */ \"./assets/js/scroll.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ \"./assets/js/modal.js\");\n/* harmony import */ var _helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/jq-helpers */ \"./assets/js/helpers/jq-helpers.js\");\n\n\n\n\nObject(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(document).on('click', '.btn-group-toggle .btn', function (e) {\n  Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(e.target.closest('.btn-group-toggle')).$('label.btn.active').removeClass('active');\n  Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(e.target).addClass('active');\n}).on('click', '.dropdown-toggle', function (e) {\n  var parent = e.target.parentElement;\n  var dropdowns = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(parent).$('.dropdown-menu');\n\n  if (parent.classList.contains('show')) {\n    parent.classList.remove('show');\n    dropdowns.removeClass('show');\n  } else {\n    parent.classList.add('show');\n    dropdowns.addClass('show');\n  }\n}).on('click', '.dropdown-item', function (e) {\n  var dropdown = e.target.parentElement;\n  var button = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(dropdown.parentElement).$('.dropdown-toggle');\n\n  if (!button.$nodes[0].classList.contains('nav-link')) {\n    button.text(e.target.innerText);\n    button.attr('data-value', e.target.dataset.value);\n  }\n\n  Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(dropdown).removeClass('show');\n  Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(dropdown.parentElement).removeClass('show');\n}).on('click', 'a[href*=\"event=\"], a[href*=\"e=\"]', function (e) {\n  if (window.syna.stream._publishHashChange(e.target.href)) {\n    e.preventDefault();\n    return false;\n  }\n});\n\n//# sourceURL=webpack:///./assets/js/index.js?");

/***/ }),

/***/ "./assets/js/modal.js":
/*!****************************!*\
  !*** ./assets/js/modal.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/jq-helpers */ \"./assets/js/helpers/jq-helpers.js\");\n/* harmony import */ var _templates_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/modal */ \"./assets/js/templates/modal.js\");\n\n\nObject(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('body').append(_templates_modal__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\nvar setImage = function setImage(image, element) {\n  if (image) {\n    element.removeClass('hidden');\n    element[0].src = image;\n  } else {\n    element.addClass('hidden');\n  }\n};\n\nsetTimeout(function () {\n  var modal = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.modal');\n  var dialog = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.modal .modal-dialog');\n\n  function closeDialog() {\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('body').removeClass('modal-open');\n    modal.removeClass('show');\n  }\n\n  Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('[data-dismiss=\"modal\"]').on('click', closeDialog);\n  modal.on('click', function (e) {\n    if (!dialog[0].contains(e.target)) {\n      closeDialog();\n    }\n  });\n\n  (window.syna || (window.syna = {})).showModal = function (_ref) {\n    var title = _ref.title,\n        subtitle = _ref.subtitle,\n        background = _ref.background,\n        image = _ref.image,\n        icon = _ref.icon,\n        content = _ref.content,\n        labels = _ref.labels,\n        _ref$size = _ref.size,\n        size = _ref$size === void 0 ? '' : _ref$size;\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('body').addClass('modal-open');\n    modal.addClass('show');\n    dialog.$('.title').html(title || '');\n    dialog.$('.subtitle').html(subtitle || '');\n    setImage(image, dialog.$('.modal-asset-image'));\n    setImage(background, dialog.$('.modal-background-image'));\n\n    if (!background) {\n      dialog.$('.modal-asset-image').addClass('hidden');\n      setImage(image, dialog.$('.modal-background-image'));\n    }\n\n    if (labels) {\n      dialog.$('.badge-container').removeClass('hidden');\n      dialog.$('.badge-container').html(labels || '');\n    } else {\n      dialog.$('.badge-container').addClass('hidden');\n    }\n\n    if (icon) {\n      dialog.$('.icon-container').removeClass('hidden');\n      dialog.$('.icon-container').html(icon.replace(/fa-inverse/g, ''));\n    } else {\n      dialog.$('.icon-container').addClass('hidden');\n    }\n\n    if (content) {\n      dialog.$('.modal-body .content').html(content);\n      dialog.$('.modal-body .content').removeClass('hidden');\n    } else {\n      dialog.$('.modal-body .content').addClass('hidden');\n    }\n\n    dialog.removeClass('md').removeClass('lg').addClass(size);\n  };\n}, 0);\n\n//# sourceURL=webpack:///./assets/js/modal.js?");

/***/ }),

/***/ "./assets/js/scroll.js":
/*!*****************************!*\
  !*** ./assets/js/scroll.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/jq-helpers */ \"./assets/js/helpers/jq-helpers.js\");\n\n\n(function () {\n  handleScroll();\n  window.onscroll = handleScroll;\n  Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.scroll-to-top').on('click', scrollToTop);\n})();\n\nfunction handleScroll() {\n  if (window.scrollY > window.innerHeight / 2) {\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.scroll-to-top').removeClass('d-none');\n  } else {\n    Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.scroll-to-top').addClass('d-none');\n  }\n\n  var headers = Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.content-fragment h1, .content-fragment h2, .content-fragment h3, .content-fragment h4, .content-fragment h5, .content-fragment h6, .fragment');\n\n  for (var i = headers.length - 1; i >= 0; i--) {\n    var bounds = headers[i].getBoundingClientRect();\n\n    if (bounds.top < 64) {\n      Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.scroll-spy a:not(.default-active)').removeClass('active');\n      Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('.toc #TableOfContents li a').removeClass('active');\n\n      if (headers[i].id) {\n        Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\".toc #TableOfContents li a[href=\\\"\".concat(window.location.pathname, \"#\").concat(headers[i].id, \"\\\"]\")).addClass('active');\n        Object(_helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\".scroll-spy a[href=\\\"\".concat(window.location.pathname, \"#\").concat(headers[i].id, \"\\\"]\")).addClass('active');\n      }\n\n      break;\n    }\n  }\n}\n\nfunction scrollToTop() {\n  _helpers_jq_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].scrollTo(document.scrollingElement, 0, 250);\n}\n\n//# sourceURL=webpack:///./assets/js/scroll.js?");

/***/ }),

/***/ "./assets/js/templates/modal.js":
/*!**************************************!*\
  !*** ./assets/js/templates/modal.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar ModalTemplate = \"\\n<div class=\\\"modal fade\\\" tabindex=\\\"-1\\\" role=\\\"dialog\\\" aria-hidden=\\\"true\\\">\\n  <div class=\\\"modal-dialog\\\" role=\\\"document\\\">\\n    <div class=\\\"modal-content\\\">\\n      <div class=\\\"modal-header row mx-0\\\">\\n        <div class=\\\"modal-title col px-0\\\">\\n          <h5 class=\\\"title text-dark\\\"></h5>\\n          <h6 class=\\\"subtitle text-secondary\\\"></h6>\\n        </div>\\n        <button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\" aria-label=\\\"Close\\\">\\n          <span aria-hidden=\\\"true\\\">&times;</span>\\n        </button>\\n      </div>\\n      <div class=\\\"modal-background\\\">\\n        <img src=\\\"\\\" alt=\\\"\\\" class=\\\"img-fluid modal-background-image\\\">\\n        <img src=\\\"\\\" alt=\\\"\\\" class=\\\"img-fluid modal-asset-image\\\">\\n        <div class=\\\"modal-asset-icon icon-container pt-4\\\"></div>\\n      </div>\\n      <div class=\\\"modal-body p-3\\\">\\n        <div class=\\\"badge-container\\\"></div>\\n        <div class=\\\"content\\\"></div>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\";\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModalTemplate);\n\n//# sourceURL=webpack:///./assets/js/templates/modal.js?");

/***/ })

/******/ });