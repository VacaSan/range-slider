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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _range = __webpack_require__(1);

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.slider = new _range2.default('js-range', 500);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(id, max) {
    _classCallCheck(this, _class);

    // range
    this._max = max;

    // cache DOM
    this.component = document.getElementById(id);
    this.track = this.component.querySelector('#js-range__track');
    this.controls = {
      min: this.component.querySelector('[data-controls="min"]'),
      max: this.component.querySelector('[data-controls="max"]')
    };

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.update = this.update.bind(this);

    this._gBCR = this.component.getBoundingClientRect();
    this._eventTarget = null;
    this._knob = '';
    this._currentX = 0;
    this._state = {
      min: 0,
      max: this._toPx(this._max)
    };

    this._addEventListeners();
  }

  _createClass(_class, [{
    key: '_addEventListeners',
    value: function _addEventListeners() {
      document.addEventListener('mousedown', this.onStart);
      document.addEventListener('mousemove', this.onMove);
      document.addEventListener('mouseup', this.onEnd);
    }
  }, {
    key: 'onStart',
    value: function onStart(evt) {
      if (this._eventTarget) return;

      if (!evt.target.classList.contains('knob')) return;

      this._currentX = evt.pageX - this._gBCR.left;
      this._knob = evt.target.getAttribute('data-controls');
      this._eventTarget = this.controls[this._knob];
      this._state[this._knob] = evt.pageX - this._gBCR.left;
      this.rAF = requestAnimationFrame(this.update);

      this._eventTarget.classList.add('range__control--active');
    }
  }, {
    key: 'onMove',
    value: function onMove(evt) {
      if (!this._eventTarget) return;

      this._currentX = evt.pageX - this._gBCR.left;
    }
  }, {
    key: 'onEnd',
    value: function onEnd(evt) {
      if (!this._eventTarget) return;

      this._eventTarget.classList.remove('range__control--active');
      this._eventTarget = null;
    }
  }, {
    key: 'update',
    value: function update() {
      this.rAF = requestAnimationFrame(this.update);

      if (!this._eventTarget) return;

      var min = this._knob === 'min' ? 0 : this._state.min;
      var max = this._knob === 'max' ? this._toPx(this._max) : this._state.max;

      // Change rules for each knob
      if (this._currentX < min) this._currentX = min;else if (this._currentX > max) this._currentX = max;

      this._setState(_defineProperty({}, this._knob, this._currentX));
    }
  }, {
    key: '_render',
    value: function _render() {
      var _state = this._state,
          max = _state.max,
          min = _state.min;

      var trackWidth = (max - min) / this._gBCR.width;

      this.controls.max.style.transform = 'translateX(' + max + 'px) translate(-50%, -50%)';
      this.controls.min.style.transform = 'translateX(' + min + 'px) translate(-50%, -50%)';
      this.track.style.transform = 'translateX(' + min + 'px) scaleX(' + trackWidth + ')';
    }
  }, {
    key: '_toPx',
    value: function _toPx(val) {
      return val / this._max * this._gBCR.width; //px
    }
  }, {
    key: '_setState',
    value: function _setState(obj) {
      this._state = Object.assign({}, this._state, obj);
      this._render();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);