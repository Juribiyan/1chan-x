"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _this3 = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// ==UserScript==
// @name         1chan-X
// @namespace    https://ochan.ru/userjs/
// @version      1.0.0
// @description  UX extension for 1chan.su and the likes
// @updateURL    https://juribiyan.github.io/1chan-x/dist/1chan-x.meta.js
// @downloadURL  https://juribiyan.github.io/1chan-x/dist/1chan-x.user.js
// @author       Snivy
// @match        https://1chan.su/*
// @match        https://1chan.ca/*
// @match        https://1chan.life/*
// @match        https://1chan.top/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.deleteValue
// @icon         https://juribiyan.github.io/1chan-x/icon.png
// ==/UserScript==

// ========================== General utilities and prototype extensions ==========================

var injector = {
  inject: function inject(alias, css) {
    var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "beforeend";
    var id = "injector:".concat(alias);
    var existing = document.getElementById(id);
    if (existing) {
      existing.innerHTML = css;
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    head.insertAdjacentHTML(position, "<style type=\"text/css\" id=\"".concat(id, "\">").concat(css, "</style>"));
  },
  remove: function remove(alias) {
    var id = "injector:".concat(alias);
    var style = document.getElementById(id);
    if (style) {
      var head = document.head || document.getElementsByTagName('head')[0];
      if (head) head.removeChild(document.getElementById(id));
    }
  }
};
// Shorthands aka jQuery for the poor
var $ = function $(sel) {
  return document.querySelector(sel);
};
var $$ = function $$(sel) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(context.querySelectorAll(sel));
};
window.Element.prototype._$ = function (sel) {
  // barbaric yet effective
  return this.querySelector(sel);
};
window.Element.prototype._$$ = function (sel) {
  return $$(sel, this);
};

// Insert adjacent HTML and immediately return the inserted element
window.Element.prototype._ins = function (position, html) {
  var returnInserted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  this.insertAdjacentHTML(position, html);
  if (!returnInserted) return;
  position = position.toLowerCase();
  if (position == 'afterbegin') return this.firstElementChild;else if (position == 'beforeend') return this.lastElementChild;else if (position == 'beforebegin') return this.previousElementSibling;else return this.nextElementSibling;
};
window.EventTarget.prototype.delegateEventListener = function (types, targetSelectors, listener, options) {
  if (!(targetSelectors instanceof Array)) targetSelectors = [targetSelectors];
  this.addMultiEventListener(types, function (ev) {
    targetSelectors.some(function (selector) {
      if (ev.target.matches(selector)) {
        listener.bind(ev.target)(ev);
        return true;
      }
    });
  }, options);
};
window.EventTarget.prototype.addMultiEventListener = function (types, listener, options) {
  var _this = this;
  if (!(types instanceof Array)) types = types.split(' ');
  types.forEach(function (type) {
    _this.addEventListener(type, function (ev) {
      listener.bind(ev.target)(ev);
    }, options);
  });
};
[window.Element.prototype, window.Text.prototype].forEach(function (e) {
  e.matches || (e.matches = e.matchesSelector || function (selector) {
    var _this2 = this;
    var matches = document.querySelectorAll(selector);
    return Array.prototype.some.call(matches, function (e) {
      return e === _this2;
    });
  });
  e.findParent = function (selector) {
    var node = this;
    while (node && !node.matches(selector)) {
      node = node.parentNode;
      if (!node.matches) return null;
    }
    return node;
  };
});
function LS_getJSON(key) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "x1";
  key = "".concat(prefix, "-").concat(key);
  var v = localStorage[key];
  if (!v) return null;
  try {
    var data = JSON.parse(v);
    return data;
  } catch (e) {
    localStorage.removeItem(key);
    console.warn("Deleted \"".concat(key, "\" from local storage due to wrong format"));
  }
}
function LS_saveJSON(key, data) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "x1";
  localStorage["".concat(prefix, "-").concat(key)] = JSON.stringify(data);
}
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function tryDecodeURI(uri) {
  try {
    return decodeURI(uri);
  } catch (e) {
    return false;
  }
}

// =============================== Greasemonkey utils and polyfills ===============================
// Greasemonkey switched to a fully async API since v.4, yet older versions must be supported

if (typeof GM == 'undefined') {
  (void 0).GM = {
    info: GM_info
  };
}
Object.entries({
  'GM_getValue': 'getValue',
  'GM_setValue': 'setValue',
  'GM_deleteValue': 'deleteValue',
  'GM_xmlhttpRequest': 'xmlHttpRequest'
}).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    oldKey = _ref2[0],
    newKey = _ref2[1];
  var old = _this3[oldKey];
  if (old && typeof GM[newKey] == 'undefined') {
    GM[newKey] = function () {
      var _this4 = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return new Promise(function (resolve, reject) {
        try {
          resolve(old.apply(_this4, args));
        } catch (e) {
          reject(e);
        }
      });
    };
  }
});
function GM_getJSON(_x2) {
  return _GM_getJSON.apply(this, arguments);
} // ======================================== Site settings =========================================
function _GM_getJSON() {
  _GM_getJSON = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(key) {
    var v, data;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return GM.getValue(key);
        case 2:
          v = _context19.sent;
          if (v) {
            _context19.next = 5;
            break;
          }
          return _context19.abrupt("return", null);
        case 5:
          _context19.prev = 5;
          data = JSON.parse(v);
          return _context19.abrupt("return", data);
        case 10:
          _context19.prev = 10;
          _context19.t0 = _context19["catch"](5);
          GM.deleteValue(key);
          console.warn("Deleted \"".concat(key, "\" from GM storage due to wrong format"));
        case 14:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[5, 10]]);
  }));
  return _GM_getJSON.apply(this, arguments);
}
var siteSpecific = {
  init: function init() {
    var _this$sites;
    var host = '_' + document.location.hostname.replace(/\./g, '_').toLowerCase();
    this.current = (_this$sites = this.sites) === null || _this$sites === void 0 ? void 0 : _this$sites[host];
    if (this.current.css) {
      injector.inject('x1' + host, this.current.css);
    }
  },
  sites: {
    _1chan_su: {
      imgSvc: {
        supported: ['imgur', 'catbox', 'generic']
      },
      css: "\n        .l-content-wrap {\n          border-radius: 23px 23px 8px 8px;\n        }\n      "
    },
    _1chan_ca: {
      imgSvc: {
        supported: ['imgur'],
        imgur: {
          key: ''
        }
      }
    },
    _1chan_life: {
      imgSvc: {
        supported: ['imgur', 'catbox']
      },
      css: "\n        .b-blog-panel_b-all span::before {\n          content: '';\n          height: 16px;\n          width: 16px;\n          display: inline-block;\n          vertical-align: middle;\n          margin-right: 6px;\n          background-image: url(/ico/favorites-false.png);\n        }\n      "
    },
    _1chan_top: {
      imgSvc: {
        supported: ['imgur', 'catbox', 'generic'],
        imgur: {
          key: ''
        },
        generic: {
          supportedHosts: ['cocaine.ninja', 'dmca.gripe', 'vgy.me', 'fuwafuwa.moe', 'lewd.host']
        },
        catbox: {
          key: false,
          supportedHosts: ['catbox.moe'],
          likeGeneric: true,
          getCompactCode: function getCompactCode(code) {
            return code.match(/^(?:https?\:\/\/)?files\.catbox\.moe\/([0-9a-z\.]+)$/i)[1];
          }
        }
      },
      css: "\n        .l-content-wrap {\n          border-radius: 23px 23px 8px 8px;\n        }\n        .b-blog-panel_b-all a::before {\n          content: '';\n          height: 16px;\n          width: 16px;\n          display: inline-block;\n          vertical-align: middle;\n          margin-right: 6px;\n          background-image: url(/ico/favorites-false.png);\n        }\n        .b-blog-panel ul {\n            display: flex;\n            width: calc(100% - 16px);\n        }\n      "
    }
  }
};

// ======================================= State management =======================================

var app = {
  state: 'undefined'
};
function determineState() {
  if ($('.b-board-header')) {
    if ($('.b-comment-form')) return 'thread';else return 'board';
  }
  if ($('.b-blog-entry')) {
    if ($('.l-comments-wrap')) return 'newsentry';else return 'news';
  }
  if ($('.b-chat')) return 'chat';
  if ($('#blog_form')) return 'form';
}
var stateHandlers = {};
stateHandlers.news = stateHandlers.newsentry = stateHandlers.board = stateHandlers.thread = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return formAugmentation.init();
      case 2:
        comments.init();
      case 3:
      case "end":
        return _context.stop();
    }
  }, _callee);
}));
stateHandlers.form = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return formAugmentation.init();
      case 2:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
}));

// ================================== Main functional components ==================================

var comments = {
  init: function init() {
    var _document$location$pa,
      _this5 = this;
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : app.state;
    this.boardPrefix = state == 'thread' || state == 'board' ? ((_document$location$pa = document.location.pathname.split('/')) === null || _document$location$pa === void 0 ? void 0 : _document$location$pa[1]) + '_' : '';
    $$('.b-blog-entry').forEach(function (post) {
      _this5.processComment(post);
    });
    if (state == 'newsentry' || state == 'thread' || state == 'board') {
      $$('.b-comment').reverse() // iterate replies in reverse order for in-place reply map generation
      .forEach(function (com) {
        return _this5.processComment(com);
      });
      $$('div[id^="placeholder_comment"]').forEach(function (placeholder) {
        new MutationObserver(_this5.observe.bind(_this5)).observe(placeholder, {
          childList: true
        });
      });
      this.setupPreviews();
    }
    this.setupSelection();
  },
  observe: function observe(mutationList) {
    var _this6 = this;
    var _iterator = _createForOfIteratorHelper(mutationList),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var mutation = _step.value;
        if (mutation.type == 'childList') {
          [].filter.call(mutation.addedNodes, function (com) {
            var _com$classList;
            return (_com$classList = com.classList) === null || _com$classList === void 0 ? void 0 : _com$classList.contains('b-comment');
          }).forEach(function (com) {
            return _this6.processComment(com, true);
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  replyMap: {},
  processComment: function processComment(com) {
    var _this7 = this,
      _this$replyMap;
    var isNew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var type = com.classList.contains('b-comment') ? 'comment' : 'post',
      n = com.id.match(/_([0-9]+)$/)[1];

    // find references to previous replies
    com._$$('.js-cross-link').forEach(function (ref) {
      var _this7$replyMap, _this7$replyMap$rn;
      var rn = ref.innerText.slice(2); // remove ">>"
      if (!((_this7$replyMap = _this7.replyMap) !== null && _this7$replyMap !== void 0 && (_this7$replyMap$rn = _this7$replyMap[rn]) !== null && _this7$replyMap$rn !== void 0 && _this7$replyMap$rn.includes(n))) {
        var _this7$replyMap2;
        _this7.replyMap[rn] = [].concat(_toConsumableArray(((_this7$replyMap2 = _this7.replyMap) === null || _this7$replyMap2 === void 0 ? void 0 : _this7$replyMap2[rn]) || []), [n]);
        if (isNew) {
          var rc = $("#comment_".concat(_this7.boardPrefix).concat(rn));
          if (rc) {
            _this7.addReplyMap(rc, [n], rn);
          }
        }
      }
    });
    // find self in reply map
    if ((_this$replyMap = this.replyMap) !== null && _this$replyMap !== void 0 && _this$replyMap[n]) {
      this.addReplyMap(com, this.replyMap[n], n);
    }

    // Add hide/unhide buttons
    if (hiddenItems.checkPost(com)) {
      com.classList.add('x1-post-hidden', 'x1-hidden-by-id');
    }
    var eye = "<img src=\"/ico/oh-my-eyes.png\" width=\"16\" height=\"16\">",
      huh = "<button class=\"x1-transparent-btn x1-hideunhide x1-hide-post\" title=\"\u0421\u043A\u0440\u044B\u0442\u044C\">".concat(eye, "</button>\n      <button class=\"x1-transparent-btn x1-hideunhide x1-unhide-post\" title=\"\u0420\u0430\u0441\u043A\u0440\u044B\u0442\u044C\">").concat(eye, "</button>");
    if (type == 'comment') {
      com._$('.b-comment_b-info')._ins('beforeend', huh);
    } else {
      var _com$_$;
      (_com$_$ = com._$('.js-hide-link')) === null || _com$_$ === void 0 ? void 0 : _com$_$.remove();
      com._$('.js-favorite-button')._ins('afterend', huh);
      // Convert native hide into userscript hide
      if (com.classList.contains('m-hide')) {
        com.classList.remove('m-hide');
        hiddenItems.addPost(com, true);
      }
    }
    com._$('.x1-transparent-btn.x1-hide-post').addEventListener('click', function () {
      return hiddenItems.addPost(com);
    });
    com._$('.x1-transparent-btn.x1-unhide-post').addEventListener('click', function () {
      return hiddenItems.removePost(com);
    });

    // Previewing hidden posts
    var hiddenPreviewing = function hiddenPreviewing(ev) {
      if (ev.type == 'mouseenter') {
        if (com.classList.contains('x1-post-hidden')) {
          com.classList.add('x1-hidden-post-preview');
        }
      }
      if (ev.type == 'mouseleave') {
        if (com.classList.contains('x1-hidden-post-preview')) {
          com.classList.remove('x1-hidden-post-preview');
        }
      }
      if (type == 'post' && ev.type == 'click' && com.classList.contains('x1-post-hidden')) {
        ev.preventDefault();
        ev.stopPropagation();
        hiddenItems.removePost(com);
        com.classList.remove('x1-hidden-post-preview');
      }
    };
    if (type == 'post') {
      com._$('.b-blog-entry_b-header a:last-of-type').addMultiEventListener(['mouseenter', 'mouseleave', 'click'], hiddenPreviewing);
    } else {
      com._$$('.x1-hideunhide').forEach(function (e) {
        return e.addMultiEventListener(['mouseenter', 'mouseleave', 'click'], hiddenPreviewing);
      });
    }

    // Text selection in post for hiding
    com._$(type == "post" ? '.b-blog-entry_b-header' : '.b-comment_b-info')._ins('beforeend', "<button class=\"x1-btn x1-hide-selected-text\" title=\"\u0421\u043A\u0440\u044B\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442\">\u0421\u043A\u0440\u044B\u0442\u044C</button>", true).addEventListener('click', function () {
      if (_this7.selection) {
        hiddenItems.addText(_this7.selection);
        com.classList.remove('x1-has-selected-text');
      }
    });
    this.processBody(com, n, type);
  },
  processBody: function () {
    var _processBody = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(com, n, type) {
      var _this8 = this;
      var body;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            body = com._$(".b-".concat(type == 'comment' ? 'comment' : 'blog-entry', "_b-body"));
            if (body) {
              _context3.next = 4;
              break;
            }
            console.warn('No body?', com);
            return _context3.abrupt("return");
          case 4:
            hiddenItems.scanPost(com, body, true);
            this.replaceSmileys(body);
            [].concat(_toConsumableArray(body._$$('img:not(.smiley):not(.x1-warning)')), _toConsumableArray(body._$$('video'))).forEach(function (img) {
              _this8.processImage(img, com);
            });

            // Search for sus links
            body._$$('a').forEach(function (a) {
              var sus = false,
                href = tryDecodeURI(a.href) || a.href;
              if (a.innerText) {
                var spl = a.innerText.trim().split('…'),
                  doubleShortened = spl.length == 3,
                  _ref5 = [].concat(_toConsumableArray(spl), ['']),
                  start = _ref5[0],
                  end = _ref5[1];
                sus =
                // Check if the link is not misleading:
                start.indexOf('http') == 0 // It looks like a raw link
                && (
                // but at the same time
                // the start of its description doesn't match the start of its URL:
                href.indexOf(start) != 0 ||
                // or

                end // the end/middle of its description (if the link is shortened)
                &&
                // doesn't match the end/middle of its URL:
                !(doubleShortened ? ~href.indexOf(end) // (double-shortened links are kinda sussy but ok...)
                : href.indexOf(end) + end.length == href.length)) ||
                // OR:
                // It looks like a safe internal link
                start.indexOf('Читать дальше') == 0 &&
                // but it really isn't:
                href.indexOf(document.location.origin) != 0;
              } else sus = a._$('img.smiley') && 'smiley'; // smiles that are links are also sus
              if (sus) {
                a._ins('afterbegin', "<img class=\"x1-warning".concat(sus == 'smiley' ? ' x1-link-sus-with-smiley' : '', "\"  src=\"/ico/warning.png\">"));
                a.classList.add('x1-link-sus');
                a.title = "Подозрительная ссылка";
              }
            });
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function processBody(_x3, _x4, _x5) {
      return _processBody.apply(this, arguments);
    }
    return processBody;
  }(),
  // Replace codes with samileys which may be present on server, falling back if not
  replaceSmileys: function replaceSmileys(postBody) {
    var walker = document.createTreeWalker(postBody, NodeFilter.SHOW_TEXT, null, false);
    var node,
      nodes = [];
    while (node = walker.nextNode()) {
      if (node.textContent) nodes.push(node);
    }
    nodes.forEach(function (node) {
      var r = node.textContent.replace(/\:([0-9a-z_]+)\:/ig, function (code, s) {
        var ext = formAugmentation.smile_map[s];
        if (ext) {
          return "<img class=\"smiley\" src=\"/img/".concat(s, ".").concat(ext, "\" alt=\"").concat(code, "\">");
        } else return code;
      });
      if (r != node.textContent) {
        var span = document.createElement('span');
        span.style.display = "contents";
        span.innerHTML = r;
        span._$('img').addEventListener('error', function () {
          span.innerHTML = this.alt;
        });
        node.replaceWith(span);
      }
    });
  },
  processImage: function () {
    var _processImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(img, post) {
      var imgData, link, linkURL, imgURL, svc, code, internalThumb, sameURL, linkSus, thumb, hideByImg, hideByLink, added;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.getImgData(img);
          case 2:
            imgData = _context4.sent;
            if (imgData) {
              _context4.next = 5;
              break;
            }
            return _context4.abrupt("return");
          case 5:
            // some images like youtube previews won't be parsed
            link = imgData.link, linkURL = imgData.linkURL, imgURL = imgData.imgURL, svc = imgData.svc, code = imgData.code, internalThumb = imgData.internalThumb, sameURL = imgData.sameURL, linkSus = imgData.linkSus, thumb = imgData.thumb, hideByImg = imgData.hideByImg, hideByLink = imgData.hideByLink;
            if (linkSus) {
              link._ins('beforeend', "<img class=\"x1-warning\" src=\"/ico/warning.png\">");
              link.classList.add('x1-imglink-sus');
              link.title = "Подозрительная ссылка";
            }
            // Add snippet buttons
            if (svc) {
              link.dataset.svcCode = "".concat(svc, ":").concat(code);
              added = formAugmentation.findImageSnippet(svc, code);
              if (added) {
                link.classList.add('x1-snippet-added');
                // add a thumbnail
                if (thumb) {
                  added.thumb = thumb;
                  formAugmentation.saveImgSnippets();
                }
              }
              link._ins('afterbegin', "<div class=\"x1-floating-btn-group x1-addremove-group\">\n        <div class=\"x1-floating-btn x1-snippet-add\" title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044E\"></div>\n        <div class=\"x1-floating-btn x1-snippet-delete\" title=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0438\u0437 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438\"></div>\n      </div>");
              link._$('.x1-snippet-add').addEventListener('click', function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                formAugmentation.addImageSnippet({
                  service: svc,
                  code: code,
                  thumb: thumb
                });
              });
              link._$('.x1-snippet-delete').addEventListener('click', function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                formAugmentation.deleteImageSnippet(svc, code);
              });
            }
            // Check against blacklist
            if (hiddenItems.isImgHidden(link, hideByImg, hideByLink) && !hiddenItems.isUnhidden(post)) {
              post.classList.add('x1-post-hidden', 'x1-hidden-by-image');
            }
            // Add hide/unhide buttons
            link._ins('afterbegin', "<div class=\"x1-floating-btn-group x1-hideunhide-group\">\n        <div class=\"x1-floating-btn x1-snippet-collapse x1-imglink-hideunhide x1-hideby x1-by-image\" title=\"\u0421\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0441\u0442\u044B \u043F\u043E \u044D\u0442\u043E\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0435\"></div>\n        <div class=\"x1-floating-btn x1-snippet-uncollapse x1-imglink-hideunhide x1-unhideby x1-by-image\" title=\"\u041D\u0435 \u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0441\u0442\u044B \u043F\u043E \u044D\u0442\u043E\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0435\"></div>" + (hideByLink ? "<div class=\"x1-floating-btn x1-snippet-collapse x1-imglink-hideunhide x1-hideby x1-by-link\" title=\"\u0421\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0441\u0442\u044B \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435\"></div>\n            <div class=\"x1-floating-btn x1-snippet-uncollapse x1-imglink-hideunhide x1-unhideby x1-by-link\" title=\"\u041D\u0435\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0441\u0442\u044B \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435\"></div>" : '') + "</div>");
            link._$$('.x1-imglink-hideunhide').forEach(function (link) {
              return link.addEventListener('click', function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                var item = link.classList.contains('x1-by-image') ? hideByImg : hideByLink;
                hiddenItems[(link.classList.contains('x1-hideby') ? 'add' : 'remove') + (link.classList.contains('x1-by-image') ? 'Image' : 'Text')](item);
              });
            });
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function processImage(_x6, _x7) {
      return _processImage.apply(this, arguments);
    }
    return processImage;
  }(),
  getImgData: function () {
    var _getImgData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(img) {
      var link, linkURL, imgURL, _yield$formAugmentati, _yield$formAugmentati2, svc, code, _yield$formAugmentati3, _yield$formAugmentati4, iSvc, iCode, internalThumb, sameURL, linkSus, thumb, hideByImg, hideByLink;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            // refer to /util/imglink_parsing_logic.xlsx
            link = img.parentElement;
            if (!(link.tagName != 'A')) {
              _context5.next = 3;
              break;
            }
            return _context5.abrupt("return");
          case 3:
            link.classList.add('x1-image-link');
            linkURL = new URL(link.href);
            imgURL = new URL(img.src);
            _context5.next = 8;
            return formAugmentation.parseLink(link.href);
          case 8:
            _yield$formAugmentati = _context5.sent;
            _yield$formAugmentati2 = _slicedToArray(_yield$formAugmentati, 2);
            svc = _yield$formAugmentati2[0];
            code = _yield$formAugmentati2[1];
            _context5.next = 14;
            return formAugmentation.parseLink(img.src);
          case 14:
            _yield$formAugmentati3 = _context5.sent;
            _yield$formAugmentati4 = _slicedToArray(_yield$formAugmentati3, 2);
            iSvc = _yield$formAugmentati4[0];
            iCode = _yield$formAugmentati4[1];
            internalThumb = imgURL.host == document.location.host;
            sameURL = svc && iSvc == svc && iCode == code;
            linkSus = !sameURL && (!svc || !internalThumb) && linkURL.host != document.location.host;
            thumb = svc && internalThumb && img.src;
            hideByImg = internalThumb ? link.href : img.src;
            hideByLink = linkSus && !internalThumb && link.href;
            if (!(svc && (sameURL || internalThumb))) {
              svc = iSvc;
              code = iCode;
            }
            return _context5.abrupt("return", {
              link: link,
              linkURL: linkURL,
              imgURL: imgURL,
              svc: svc,
              code: code,
              internalThumb: internalThumb,
              sameURL: sameURL,
              linkSus: linkSus,
              thumb: thumb,
              hideByImg: hideByImg,
              hideByLink: hideByLink
            });
          case 26:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    function getImgData(_x8) {
      return _getImgData.apply(this, arguments);
    }
    return getImgData;
  }(),
  addReplyMap: function addReplyMap(com, ids, selfID) {
    var existing = com._$('.x1-reply-map');
    var content = ids.map(function (id) {
      return "<a href=\"#".concat(id, "\" class=\"x1-cross-link\">&gt;&gt").concat(id, "</a>");
    }).join(', ');
    if (existing) {
      existing.innerHTML += ',' + content;
    } else {
      var replyMap = "<div id=\"x1-rm-".concat(selfID, "\" class=\"x1-reply-map\">\u041E\u0442\u0432\u0435\u0442\u044B: ").concat(content, "</div>"),
        postInfo = com._$('.b-blog-entry_b-info');
      if (postInfo) {
        postInfo._ins('beforeBegin', replyMap);
      } else {
        com._ins('beforeEnd', replyMap);
      }
    }
  },
  setupPreviews: function setupPreviews() {
    var _document$location$pa2;
    var boardPrefix = app.state == 'thread' || app.state == 'board' ? ((_document$location$pa2 = document.location.pathname.split('/')) === null || _document$location$pa2 === void 0 ? void 0 : _document$location$pa2[1]) + '_' : '';
    document.body.delegateEventListener(['mouseenter', 'mouseleave'], ['.x1-comment-preview .js-cross-link', '.x1-cross-link', '.x1-comment-preview'], function (ev) {
      var isLink = !this.classList.contains('x1-comment-preview'),
        link = isLink ? this : this === null || this === void 0 ? void 0 : this._boundLink,
        preview = isLink ? this === null || this === void 0 ? void 0 : this._boundPreview : this;
      if (ev.type == 'mouseenter') {
        if (!preview) {
          // Create preview
          var n = this.innerText.slice(2),
            refCom = $("#comment_".concat(boardPrefix).concat(n));
          if (refCom) {
            var top = link.offsetParent.offsetTop + link.offsetTop + link.offsetHeight - 4,
              left = link.offsetParent.offsetLeft + link.offsetLeft;
            preview = document.body._ins('beforeend', "<div class=\"b-comment m-tip x1-comment-preview\"\n              style=\"top: ".concat(top, "px; left: ").concat(left, "px; transform: scaleY(0);\">\n              ").concat(refCom.innerHTML, "</div>"), true);
            setTimeout(function () {
              return preview.style.transform = '';
            }, 50);
            // cross-reference link and preview
            preview._boundLink = link;
            link._boundPreview = preview;
            // cross-reference stacked previews
            var parent = link.findParent('.b-comment');
            if (parent !== null && parent !== void 0 && parent.classList.contains('m-tip')) {
              parent._childPreview = preview;
              preview._parentPreview = parent;
            }
          }
        } else {
          // Save previews from exiting
          while (preview) {
            var _preview, _preview2;
            clearTimeout((_preview = preview) === null || _preview === void 0 ? void 0 : _preview._exitTimeout);
            preview._exitTimeout = null;
            preview = (_preview2 = preview) === null || _preview2 === void 0 ? void 0 : _preview2._parentPreview;
          }
        }
      } else {
        var _loop = function _loop() {
          var _preview3;
          // Schedule preview exiting
          var p = preview,
            l = (_preview3 = preview) === null || _preview3 === void 0 ? void 0 : _preview3._boundLink;
          if (!preview._exitTimeout) {
            preview._exitTimeout = setTimeout(function () {
              p._exitTimeout = null;
              p.style.transform = "scaleY(0)";
              setTimeout(function () {
                return p.remove();
              }, 200);
              if (l) {
                l._boundPreview = null;
              }
            }, 200);
          }
          preview = isLink ? p === null || p === void 0 ? void 0 : p._childPreview : p === null || p === void 0 ? void 0 : p._parentPreview;
        };
        // Mouseleave
        while (preview) {
          _loop();
        }
      }
    }, {
      capture: true
    });
  },
  setupSelection: function setupSelection() {
    var _this9 = this;
    var debounce = null;
    document.addEventListener('selectionchange', function () {
      _this9.selection = '';
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(function () {
        _this9.handleSelection();
      }, 200);
    });
  },
  selection: '',
  handleSelection: function handleSelection() {
    var sel = window.getSelection();
    $$('.x1-has-selected-text').forEach(function (e) {
      return e.classList.remove('x1-has-selected-text');
    });
    if (sel.isCollapsed) return;
    var start = sel.anchorNode.findParent('.b-comment') || sel.anchorNode.findParent('.b-blog-entry');
    if (!start) return;
    var end = sel.focusNode.findParent('.b-comment') || sel.focusNode.findParent('.b-blog-entry');
    if (!end || start != end) return;
    end.classList.add('x1-has-selected-text');
    this.selection = sel.toString();
  }
};
var formAugmentation = {
  init: function () {
    var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var _this10 = this;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            this.area = this.getTextArea();
            if (!this.area) {
              _context7.next = 7;
              break;
            }
            _context7.next = 4;
            return this.setupExtraPanel();
          case 4:
            this.setupMarkupPanel();
            this.setupImgLinkPasting();
            ['smileys', 'snippets'].forEach( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(type) {
                return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return _this10["init_".concat(type)]();
                    case 2:
                      return _context6.abrupt("return", _context6.sent);
                    case 3:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x9) {
                return _ref6.apply(this, arguments);
              };
            }());
          case 7:
            this.init_images(); // always needed so a user can add image snippets
          case 8:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this);
    }));
    function init() {
      return _init.apply(this, arguments);
    }
    return init;
  }(),
  getTextArea: function getTextArea() {
    var _this11 = this;
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : app.state;
    if (state == 'newsentry' || state == 'thread') return $('#comment_form_text');else if (state == 'form') {
      var multiAreas = $('#blog_form')._$$('textarea:not(#template_last_posts)');
      multiAreas.forEach(function (area) {
        area.addEventListener('focus', function () {
          return _this11.area = area;
        });
      });
      return multiAreas[0];
    } else {
      return false;
    }
  },
  getExtraPanelLocation: function getExtraPanelLocation() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : app.state;
    if (state == 'newsentry' || state == 'thread') {
      return ['.b-comment-form', 'beforebegin'];
    }
    if (state == 'form') {
      return ['textarea[name=text]', 'beforebegin'];
    }
  },
  setupExtraPanel: function () {
    var _setupExtraPanel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var state,
        _this$getExtraPanelLo,
        _this$getExtraPanelLo2,
        selector,
        relativePosition,
        supportedPanes,
        btns,
        panes,
        p,
        panel,
        _args8 = arguments;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            state = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : app.state;
            _this$getExtraPanelLo = this.getExtraPanelLocation(), _this$getExtraPanelLo2 = _slicedToArray(_this$getExtraPanelLo, 2), selector = _this$getExtraPanelLo2[0], relativePosition = _this$getExtraPanelLo2[1], supportedPanes = {
              'smileys': 'Смайлики',
              'snippets': 'Сниппеты',
              'images': ['newsentry', 'form'].includes(state) && 'Картинки'
            }, btns = '', panes = '';
            for (p in supportedPanes) {
              if (supportedPanes[p]) {
                btns += "<button class=\"x1-btn\" data-pane=\"".concat(p, "\">").concat(supportedPanes[p], "</button>");
                panes += "<div class=\"x1-xp-pane\" id=\"x1-xp-pane-".concat(p, "\" style=\"display:none\"></div>");
              }
            }
            panel = $(selector)._ins(relativePosition, "\n      <div class=\"x1-form-extra-panel\">\n        <div class=\"x1-xp-pane-switcher x1-btn-group\">".concat(btns, "</div>\n        ").concat(panes, "\n      </div>"), true);
            panes = panel._$$('.x1-xp-pane');
            btns = panel._$$('.x1-xp-pane-switcher .x1-btn');
            btns.forEach(function (btn) {
              btn.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                panes.forEach(function (pane) {
                  if (pane.id == "x1-xp-pane-".concat(btn.dataset.pane)) {
                    if (pane.style.display == 'none') {
                      pane.style.display = '';
                      btn.classList.add('x1-xp-switcher-selected');
                    } else {
                      pane.style.display = 'none';
                      btn.classList.remove('x1-xp-switcher-selected');
                    }
                  } else {
                    pane.style.display = 'none';
                  }
                });
                btns.forEach(function (b) {
                  if (b.dataset.pane != btn.dataset.pane) {
                    b.classList.remove('x1-xp-switcher-selected');
                  }
                });
              });
            });
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this);
    }));
    function setupExtraPanel() {
      return _setupExtraPanel.apply(this, arguments);
    }
    return setupExtraPanel;
  }(),
  known_smileys: {
    gif: ["coolface", "desu", "nyan", "sobak", "trollface", "slon", "ssaksa", "sraksa", "sosak", "makak", "pauk", "popka", "popka2", "cheez", "weed"],
    png: ["awesome", "ffuu", "okay", "rage", "deb", "oru", "doge", "sheez", "poo", "hero", "yajka", "joseph", "ussr", "kpss", "yes"],
    jpg: ["cuni"]
  },
  smile_map: {
    "poo_target": "png"
  },
  init_smileys: function init_smileys() {
    var _this12 = this;
    var _loop2 = function _loop2(ext) {
      _this12.known_smileys[ext].forEach(function (s) {
        var code = ":".concat(s, ":"),
          smil = $('#x1-xp-pane-smileys')._ins('beforeend', "<img class=\"smiley x1-snippet-img x1-insert-smiley\" src=\"/img/".concat(s, ".").concat(ext, "\" alt=\"").concat(code, "\" title=\"").concat(code, "\">"), true);
        smil.addEventListener('click', function () {
          _this12.insertText({
            end: code
          });
        });
        _this12.smile_map[s] = ext;
        // Remove unsupported smileys
        smil.addEventListener('error', function (ev) {
          smil.remove();
        });
      });
    };
    for (var ext in this.known_smileys) {
      _loop2(ext);
    }
  },
  insertText: function insertText() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref7$start = _ref7.start,
      start = _ref7$start === void 0 ? '' : _ref7$start,
      _ref7$end = _ref7.end,
      end = _ref7$end === void 0 ? '' : _ref7$end,
      _ref7$forceInline = _ref7.forceInline,
      forceInline = _ref7$forceInline === void 0 ? false : _ref7$forceInline,
      _ref7$innerNewLine = _ref7.innerNewLine,
      innerNewLine = _ref7$innerNewLine === void 0 ? false : _ref7$innerNewLine,
      _ref7$outerNewLine = _ref7.outerNewLine,
      outerNewLine = _ref7$outerNewLine === void 0 ? false : _ref7$outerNewLine,
      _ref7$replace = _ref7.replace,
      replace = _ref7$replace === void 0 ? false : _ref7$replace;
    var val = this.area.value,
      selStart = this.area.selectionStart,
      selEnd = this.area.selectionEnd,
      before = val.slice(0, selStart),
      inside = val.slice(selStart, selEnd),
      after = val.slice(selEnd),
      insideMultiline = '';
    if (forceInline) {
      var lines = inside.split('\n');
      if (lines.length > 1) insideMultiline = lines.map(function (line) {
        return line.length ? start + line + end : line;
      }).join('\n');
    }
    innerNewLine = innerNewLine ? '\n' : '';
    var preNewLine = outerNewLine && start && !(before == '' || before.slice(-1) == '\n') ? '\n' : '',
      postNewLine = outerNewLine && end && !(after == '' || after.slice(0, 1) == '\n') ? '\n' : '',
      textPre = before + preNewLine + (insideMultiline ? '' : start + innerNewLine),
      textIn = insideMultiline || (replace ? '' : inside),
      textPost = (insideMultiline ? '' : innerNewLine + end) + postNewLine + after;
    this.area.value = textPre + textIn + textPost;
    if (start && end) {
      this.area.selectionStart = textPre.length;
      this.area.selectionEnd = textPre.length + textIn.length;
    }
    this.area.focus();
  },
  setupMarkupPanel: function setupMarkupPanel() {
    var _this13 = this;
    var markPan = this.area._ins('beforebegin', "<div class=\"x1-markup-panel\">\n      <button class=\"x1-btn x1-add-text-snippet\" title=\"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043A\u0430\u043A \u0437\u0430\u0433\u043E\u0442\u043E\u0432\u043A\u0443\" style=\"float:right\">+ \u0421\u043D\u0438\u043F\u043F\u0435\u0442</button>\n      <div class=\"x1-btn-group x1-inline-btn-group\">\n        <button class=\"x1-btn x1-bb-code\" title=\"\u0416\u0438\u0440\u043D\u044B\u0439\" data-start=\"**\" data-end=\"**\"><b>\u0416</b></button>\n        <button class=\"x1-btn x1-bb-code\" title=\"\u041A\u0443\u0440\u0441\u0438\u0432\" data-start=\"*\" data-end=\"*\"><i>\u041A</i></button>\n        <button class=\"x1-btn x1-bb-code x1-bb-force-inline\" title=\"\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u043E\" data-start=\"--\" data-end=\"--\"><s>Z</s></button>\n        <button class=\"x1-btn x1-bb-code\" title=\"\u0421\u043F\u043E\u0439\u043B\u0435\u0440\" data-start=\"%%\" data-end=\"%%\"><span class=\"b-spoiler-text\">%</span></button>\n      </div> <div class=\"x1-btn-group x1-inline-btn-group\">  \n        <button class=\"x1-btn x1-bb-code x1-bb-force-inline x1-bb-outer-newline\" title=\"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A\" data-start=\"=== \" data-end=\" ===\"><span style=\"transform: scale(1.25); display: block\">H2</span></button>\n        <button class=\"x1-btn x1-bb-code x1-bb-force-inline x1-bb-outer-newline\" title=\"\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A\" data-start=\"## \" data-end=\" ##\">H3</button>\n      </div> <div class=\"x1-btn-group x1-inline-btn-group\"> \n        <button class=\"x1-btn x1-btn-monospace x1-bb-code x1-bb-force-inline\" title=\"\u041C\u043E\u043D\u043E\u0448\u0438\u0440\u0438\u043D\u043D\u044B\u0439\" data-start=\"&#96;\" data-end=\"&#96;\">();</button>\n        <button class=\"x1-btn x1-btn-monospace x1-bb-code x1-bb-outer-newline x1-bb-inner-newline\" title=\"\u041C\u043E\u043D\u043E\u0448\u0438\u0440\u0438\u043D\u043D\u044B\u0439 \u0431\u043B\u043E\u043A\" data-start=\"/---\" data-end=\"&#92;---\"><span>{</span><span>}</span></button>\n      </div> <div class=\"x1-btn-group x1-inline-btn-group\">  \n        <button class=\"x1-btn x1-bb-code x1-bb-force-inline\" title=\"\u0426\u0438\u0442\u0430\u0442\u0430\" data-start=\"&gt;&gt;\" data-end=\"&lt;&lt;\" style=\"color:#789922\">\xAB\xBB</button>\n        <button class=\"x1-btn x1-bb-code x1-bb-force-inline x1-bb-outer-newline\" title=\"\u041F\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u043E\u0435 \u0446\u0438\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\" data-start=\"&gt; \" style=\"color:#789922\">&gt; </button>\n      </div>\n      <button class=\"x1-btn x1-insert-url\" title=\"\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443\"><div class=\"x1-url-icon\"></div></button>\n    </div>", true);
    markPan._$$('.x1-bb-code').forEach(function (bb) {
      bb.addEventListener('click', function (ev) {
        ev.preventDefault();
        _this13.insertText({
          start: bb.dataset.start || '',
          end: bb.dataset.end || '',
          forceInline: bb.classList.contains('x1-bb-force-inline'),
          innerNewLine: bb.classList.contains('x1-bb-inner-newline'),
          outerNewLine: bb.classList.contains('x1-bb-outer-newline')
        });
      });
    });
    markPan._$('.x1-add-text-snippet').addEventListener('click', function (ev) {
      ev.preventDefault();
      _this13.addTextSnippet();
    });
    markPan._$('.x1-insert-url').addEventListener('click', function (ev) {
      ev.preventDefault();
      var url = prompt('Введите адрес ссылки');
      _this13.insertText({
        start: "\"",
        end: "\":".concat(url, " ")
      });
    });
  },
  defaultImageServices: {
    imgur: {
      analyze: function () {
        var _analyze = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(txt) {
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", new Promise(function (resolve, reject) {
                  var m = txt.match(/^(?:https?\:\/\/)?(?:i\.)?imgur\.com\/(.+\/)?([^\/\.\s]+)(?:\..*)?$/i);
                  if (!m) resolve(false);
                  if (m[1]) {
                    // A case when a pasted link is a link to a post rather than an image
                    GM.xmlHttpRequest({
                      method: "GET",
                      url: txt,
                      onload: function onload(res) {
                        var _res$responseText;
                        var p = res === null || res === void 0 ? void 0 : (_res$responseText = res.responseText) === null || _res$responseText === void 0 ? void 0 : _res$responseText.match(/meta property="og\:image".+?content=".+?imgur\.com\/([^\.]+)/);
                        if (p) resolve(p[1]);
                      }
                    });
                  } else {
                    resolve(m[2]);
                  }
                }));
              case 1:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        }));
        function analyze(_x10) {
          return _analyze.apply(this, arguments);
        }
        return analyze;
      }(),
      key: 'i',
      getImg: function getImg(code) {
        return "https://i.imgur.com/".concat(code, ".png");
      }
    },
    catbox: {
      exp: /^(?:https?\:\/\/)?files\.catbox\.moe\/([0-9a-z\.]+)$/i,
      key: 'c',
      getImg: function getImg(code) {
        return "https://files.catbox.moe/".concat(code);
      }
    },
    generic: {
      exp: /^(https\:\/\/.+?\/[^\s\/]+\.(?:jpe?g|png|gif|webp)(?:\?\S+)?)$/i,
      getImg: function getImg(code) {
        return code;
      },
      key: false
    }
  },
  wrapImgCode: function wrapImgCode(svc, code) {
    var service = this.imageServices[svc],
      key = service.key;
    return svc == 'generic' || service.likeGeneric ? "[".concat(service.getImg(code), "]") : "[".concat(key, ":").concat(code, ":]");
  },
  imageServices: {},
  parseLink: function () {
    var _parseLink = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(txt) {
      var svc, _txt$match, service, code;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.t0 = _regeneratorRuntime().keys(this.imageServices);
          case 1:
            if ((_context10.t1 = _context10.t0()).done) {
              _context10.next = 18;
              break;
            }
            svc = _context10.t1.value;
            service = this.imageServices[svc];
            if (!service.analyze) {
              _context10.next = 10;
              break;
            }
            _context10.next = 7;
            return service.analyze(txt);
          case 7:
            _context10.t2 = _context10.sent;
            _context10.next = 11;
            break;
          case 10:
            _context10.t2 = (_txt$match = txt.match(service.exp)) === null || _txt$match === void 0 ? void 0 : _txt$match[1];
          case 11:
            code = _context10.t2;
            if (!code) {
              _context10.next = 16;
              break;
            }
            // For the case when a service behaves like generic but must store data like named to be used by other sites
            if (service.getCompactCode) code = service.getCompactCode(code);
            return _context10.abrupt("return", [svc, code]);
          case 16:
            _context10.next = 1;
            break;
          case 18:
            return _context10.abrupt("return", [null, null]);
          case 19:
          case "end":
            return _context10.stop();
        }
      }, _callee10, this);
    }));
    function parseLink(_x11) {
      return _parseLink.apply(this, arguments);
    }
    return parseLink;
  }(),
  setupImgLinkPasting: function setupImgLinkPasting() {
    var _this14 = this;
    this.area.addEventListener('paste', /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(ev) {
        var _ev$clipboardData;
        var txt, _yield$_this14$parseL, _yield$_this14$parseL2, service, code, codeWrapped;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              txt = ev === null || ev === void 0 ? void 0 : (_ev$clipboardData = ev.clipboardData) === null || _ev$clipboardData === void 0 ? void 0 : _ev$clipboardData.getData('text');
              _context11.next = 3;
              return _this14.parseLink(txt);
            case 3:
              _yield$_this14$parseL = _context11.sent;
              _yield$_this14$parseL2 = _slicedToArray(_yield$_this14$parseL, 2);
              service = _yield$_this14$parseL2[0];
              code = _yield$_this14$parseL2[1];
              if (code) {
                codeWrapped = _this14.addImageSnippet({
                  service: service,
                  code: code
                });
                window.requestAnimationFrame(function () {
                  _this14.area.value = _this14.area.value.replace(txt, codeWrapped);
                });
              }
            case 8:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      return function (_x12) {
        return _ref8.apply(this, arguments);
      };
    }());
  },
  forceRevealPane: function forceRevealPane(id) {
    var _$;
    return (_$ = $(".x1-btn:not(.x1-xp-switcher-selected)[data-pane=".concat(id, "]"))) === null || _$ === void 0 ? void 0 : _$.click();
  },
  imageSnippets: [],
  textSnippets: [],
  saveImgSnippets: function saveImgSnippets() {
    var shortForm = this.imageSnippets.map(function (s) {
      return "".concat(s.service, " ").concat(s.code, " ").concat(s.thumb || '=');
    });
    GM.setValue('image-snippets', JSON.stringify(shortForm));
  },
  saveTxtSnippets: function saveTxtSnippets() {
    GM.setValue('text-snippets', JSON.stringify(this.textSnippets));
  },
  init_images: function () {
    var _init_images = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var _this15 = this;
      var images, _iterator2, _step2, entry, svc, code, thumb, _entry$split, _entry$split2, skip, service;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            // Filter and modify image services for the specific site, generate reverse expressions
            siteSpecific.current.imgSvc.supported.forEach(function (svc) {
              var _siteSpecific$current;
              var service = Object.assign(_this15.defaultImageServices[svc], ((_siteSpecific$current = siteSpecific.current.imgSvc) === null || _siteSpecific$current === void 0 ? void 0 : _siteSpecific$current[svc]) || {});
              // Named image service expressions
              if (service.key !== false) {
                service.reverseExp = new RegExp("^\\[".concat(service.key, "\\:([^\\s\\/\\:]+)\\:"), 'i');
              }
              // Unnamed image services with a list of hosts
              else if (service.supportedHosts) {
                var expr = "(https\\:\\/\\/[\\S]*(?:" + service.supportedHosts.map(function (host) {
                  return host.replace(/\./, '\\.');
                }).join('|') + ")\\/[^\\s\\:]+\\.(?:jpe?g|png|gif|webp))";
                service.exp = new RegExp("^".concat(expr, "$"), 'i');
                service.reverseExp = new RegExp("^\\[".concat(expr, "\\]$"), 'i');
              }
              // Generic service (any host)
              else if (svc == 'generic') {
                service.reverseExp = new RegExp("^\\[".concat(service.exp.source.slice(1, -1), "\\]$"), 'i');
              }
              if (service.reverseExp) {
                _this15.imageServices[svc] = service;
              } else {
                console.warn('Unable to generate reverse expression for: ', svc);
              }
            });
            _context12.next = 3;
            return GM_getJSON('image-snippets');
          case 3:
            images = _context12.sent;
            if (!(images !== null && images !== void 0 && images.length)) {
              _context12.next = 36;
              break;
            }
            _iterator2 = _createForOfIteratorHelper(images);
            _context12.prev = 6;
            _iterator2.s();
          case 8:
            if ((_step2 = _iterator2.n()).done) {
              _context12.next = 28;
              break;
            }
            entry = _step2.value;
            svc = void 0, code = void 0, thumb = void 0;
            _context12.prev = 11;
            _entry$split = entry.split(' ');
            _entry$split2 = _slicedToArray(_entry$split, 3);
            svc = _entry$split2[0];
            code = _entry$split2[1];
            thumb = _entry$split2[2];
            _context12.next = 23;
            break;
          case 19:
            _context12.prev = 19;
            _context12.t0 = _context12["catch"](11);
            console.warn('Image snippet has wrong format: ', entry);
            return _context12.abrupt("continue", 26);
          case 23:
            // Unsupported snippets will be added to the model to keep it 
            skip = true; // consistent across sites but no actual snipet will be created
            if (svc && svc in this.imageServices) {
              service = this.imageServices[svc];
              if (svc != 'generic' || code.match(service.exp)) {
                skip = false;
              } else {
                console.warn("Unsupported host @ \"".concat(entry, "\""));
              }
            } else {
              console.warn("Unsupported service: ".concat(svc, " @ \"").concat(entry, "\""));
            }
            this.addImageSnippet({
              skip: skip,
              service: svc,
              code: code,
              thumb: thumb == "=" ? false : thumb,
              save: false
            });
          case 26:
            _context12.next = 8;
            break;
          case 28:
            _context12.next = 33;
            break;
          case 30:
            _context12.prev = 30;
            _context12.t1 = _context12["catch"](6);
            _iterator2.e(_context12.t1);
          case 33:
            _context12.prev = 33;
            _iterator2.f();
            return _context12.finish(33);
          case 36:
          case "end":
            return _context12.stop();
        }
      }, _callee12, this, [[6, 30, 33, 36], [11, 19]]);
    }));
    function init_images() {
      return _init_images.apply(this, arguments);
    }
    return init_images;
  }(),
  findImageSnippet: function findImageSnippet(svc, code) {
    return this.imageSnippets.find(function (img) {
      return img.service == svc && img.code == code;
    });
  },
  deleteImageSnippet: function deleteImageSnippet(svc, code, imgLink) {
    var _imgLink;
    this.imageSnippets = this.imageSnippets.filter(function (img) {
      return img.service != svc && img.code != code;
    });
    if (!imgLink) {
      imgLink = $(".x1-img-snippet[title=\"".concat(this.wrapImgCode(svc, code), "\"]"));
    }
    $$(".x1-image-link[data-svc-code=\"".concat(svc, ":").concat(code, "\"]")).forEach(function (linkInPost) {
      linkInPost.classList.remove('x1-snippet-added');
    });
    (_imgLink = imgLink) === null || _imgLink === void 0 ? void 0 : _imgLink.remove();
    this.saveImgSnippets();
  },
  addImageSnippet: /*async*/function addImageSnippet() {
    var _$2,
      _this16 = this;
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      service = _ref9.service,
      code = _ref9.code,
      _ref9$thumb = _ref9.thumb,
      thumb = _ref9$thumb === void 0 ? false : _ref9$thumb,
      _ref9$save = _ref9.save,
      save = _ref9$save === void 0 ? true : _ref9$save,
      _ref9$skip = _ref9.skip,
      skip = _ref9$skip === void 0 ? false : _ref9$skip,
      _ref9$fromPost = _ref9.fromPost,
      fromPost = _ref9$fromPost === void 0 ? false : _ref9$fromPost;
    var dup = this.findImageSnippet(service, code);
    if (dup) {
      console.warn('Image already present');
    } else {
      this.imageSnippets.push({
        service: service,
        code: code,
        thumb: thumb
      });
    }
    $$(".x1-image-link[data-svc-code=\"".concat(service, ":").concat(code, "\"]")).forEach(function (linkInPost) {
      linkInPost.classList.add('x1-snippet-added');
    });
    if (save) {
      this.saveImgSnippets();
    }
    if (!this.area || skip) return;
    var codeWrapped = this.wrapImgCode(service, code);
    if (dup) return codeWrapped;
    var url = this.imageServices[service].getImg(code),
      isVideo = !thumb && code.match(/\.(?:webm|mp4)$/i),
      imgLink = (_$2 = $('#x1-xp-pane-images')) === null || _$2 === void 0 ? void 0 : _$2._ins('afterbegin', "<a href=\"".concat(url, "\" class=\"x1-img-snippet x1-snippet-img x1-snippet\" title=\"").concat(codeWrapped, "\">\n        ").concat(isVideo ? "<video autoplay loop muted src=\"".concat(url, "\"></video>") : "<img src=\"".concat(thumb || url, "\">"), "\n        <div class=\"x1-floating-btn x1-snippet-action x1-snippet-delete\" title=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u0433\u043E\u0442\u043E\u0432\u043A\u0443\"></div>\n      </a>"), true);
    if (imgLink) {
      imgLink.addEventListener('click', function (ev) {
        ev.preventDefault();
        _this16.insertText({
          end: codeWrapped
        });
      });
      imgLink._$('.x1-snippet-delete').addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        _this16.deleteImageSnippet(service, code, imgLink);
      });
      if (save) {
        this.forceRevealPane('images');
      }
    }
    return codeWrapped;
  },
  init_snippets: function () {
    var _init_snippets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var _this17 = this;
      var snippets;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return GM_getJSON('text-snippets');
          case 2:
            snippets = _context13.sent;
            if (snippets !== null && snippets !== void 0 && snippets.length) {
              snippets.forEach(function (txt) {
                if (typeof txt == 'string') {
                  _this17.addTextSnippet(txt, false);
                }
              });
            }
          case 4:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }));
    function init_snippets() {
      return _init_snippets.apply(this, arguments);
    }
    return init_snippets;
  }(),
  addTextSnippet: function addTextSnippet() {
    var _this18 = this;
    var txt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.area.value.slice(this.area.selectionStart, this.area.selectionEnd);
    var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (!txt.length || this.textSnippets.includes(txt)) return;
    // Check if selected text is actually an image code (will not match if text contains any extra characters)
    var imgFound = false;
    for (var svc in this.imageServices) {
      var match = txt.match(this.imageServices[svc].reverseExp);
      if (match) {
        var code = match[1];
        if (this.imageServices[svc].getCompactCode) code = this.imageServices[svc].getCompactCode(code);
        this.addImageSnippet({
          service: svc,
          code: code
        });
        imgFound = true;
        break;
      }
    }
    if (!imgFound) {
      var snippet = $('#x1-xp-pane-snippets')._ins('afterbegin', "<div class=\"x1-snippet x1-txt-snippet\">\n        ".concat(escapeHtml(txt).replace(/\n/g, ' <br>'), "\n        <div class=\"x1-floating-btn x1-snippet-action x1-snippet-expand\" title=\"\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C\"></div>\n        <div class=\"x1-floating-btn x1-snippet-action x1-snippet-collapse\" title=\"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C\"></div>\n        <div class=\"x1-floating-btn x1-snippet-action x1-snippet-delete\" title=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C\"></div>\n      </div>"), true);
      snippet.addEventListener('click', function (ev) {
        return _this18.insertText({
          end: txt
        });
      });
      snippet._$$('.x1-snippet-action').forEach(function (btn) {
        var action;
        if (btn.classList.contains('x1-snippet-expand')) {
          action = function action() {
            return snippet.classList.add('x1-snippet-expanded');
          };
        }
        if (btn.classList.contains('x1-snippet-collapse')) {
          action = function action() {
            return snippet.classList.remove('x1-snippet-expanded');
          };
        }
        if (btn.classList.contains('x1-snippet-delete')) {
          action = function action() {
            _this18.textSnippets = _this18.textSnippets.filter(function (s) {
              return s != txt;
            });
            _this18.saveTxtSnippets();
            snippet.remove();
          };
        }
        if (action) btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          action();
        });
      });
      this.textSnippets.push(txt);
      if (save) {
        this.forceRevealPane('snippets');
        this.saveTxtSnippets();
      }
    }
  }
};
var hiddenItems = {
  init: function () {
    var _init2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            this.initPosts();
            _context14.next = 3;
            return this.initText();
          case 3:
            _context14.next = 5;
            return this.initImages();
          case 5:
          case "end":
            return _context14.stop();
        }
      }, _callee14, this);
    }));
    function init() {
      return _init2.apply(this, arguments);
    }
    return init;
  }(),
  // ---------------------------- Images ----------------------------
  imgURLs: [],
  addImage: function addImage(url) {
    var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (this.imgURLs.includes(url)) return;
    this.imgURLs.push(url);
    if (!initial) {
      this.saveImages();
      this.updateImageUI();
      this.rescan();
    }
  },
  removeImage: function removeImage(url) {
    var found = false;
    this.imgURLs = this.imgURLs.filter(function (u) {
      if (u == url) {
        found = true;
        return false;
      } else return true;
    });
    if (found) {
      this.saveImages();
      this.updateImageUI();
      this.rescan();
    }
  },
  saveImages: function saveImages() {
    GM.setValue('image-hidelist', JSON.stringify(this.imgURLs));
  },
  updateImageUI: function updateImageUI() {
    var fromUI = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.url_area.value = this.imgURLs.join('\n');
    this.url_area.rows = Math.max(4, this.imgURLs.length + 1);
    if (fromUI) settings.flashLabel('image-hidelist');
  },
  updateImagesFromUI: function updateImagesFromUI() {
    // On user save
    this.imgURLs = [];
    var lines = this.url_area.value.split(/\n/);
    if (lines !== null && lines !== void 0 && lines.length) {
      this.processImageList(lines);
    }
    this.updateImageUI(true);
    this.rescan();
    this.saveImages();
  },
  initImages: function () {
    var _initImages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var _this19 = this;
      var images;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            this.url_area = $('#x1-url-hidelist');
            $('#x1-update-url-hidelist').addEventListener('click', function () {
              return _this19.updateImagesFromUI();
            });
            _context15.next = 4;
            return GM_getJSON('image-hidelist');
          case 4:
            images = _context15.sent;
            if (images !== null && images !== void 0 && images.length) {
              this.processImageList(images);
              this.updateImageUI();
            }
          case 6:
          case "end":
            return _context15.stop();
        }
      }, _callee15, this);
    }));
    function initImages() {
      return _initImages.apply(this, arguments);
    }
    return initImages;
  }(),
  processImageList: function processImageList(images) {
    var _this20 = this;
    images.map(function (url) {
      return url.trim();
    }).filter(function (url) {
      return url.length;
    }).forEach(function (url) {
      return _this20.addImage(url, true);
    });
  },
  // ----------------------------- Text -----------------------------
  texts: [],
  regExps: [],
  normalizeText: function normalizeText(txt) {
    return txt.trim().toLowerCase();
  },
  addText: function addText(txt) {
    var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref10$refresh = _ref10.refresh,
      refresh = _ref10$refresh === void 0 ? true : _ref10$refresh,
      _ref10$tryRegExp = _ref10.tryRegExp,
      tryRegExp = _ref10$tryRegExp === void 0 ? false : _ref10$tryRegExp;
    txt = this.normalizeText(txt);
    if (!txt || this.texts.includes(txt)) return;
    var rx = false;
    if (tryRegExp) {
      var maybeRegExp = txt.match(/^\/(.+)\/([imgy]{0,4})$/i);
      if (maybeRegExp) {
        var _maybeRegExp$slice = maybeRegExp.slice(1),
          _maybeRegExp$slice2 = _slicedToArray(_maybeRegExp$slice, 2),
          exp = _maybeRegExp$slice2[0],
          flags = _maybeRegExp$slice2[1];
        flags = "i".concat(~flags.indexOf('m') ? 'm' : '');
        try {
          rx = new RegExp(exp, flags);
        } catch (e) {
          console.warn('Error parsing RegExp:', txt, e);
        }
      }
    }
    if (rx) {
      this.texts.push("/".concat(rx.source, "/").concat(rx.flags));
      this.regExps.push(rx);
    } else {
      this.texts.push(txt);
      this.regExps.push(new RegExp(escapeRegExp(txt), 'i'));
    }
    if (refresh) {
      this.saveTexts();
      this.updateTextUI();
      this.rescan();
    }
  },
  removeText: function removeText(txt) {
    var found = false;
    var textsFiltered = this.texts.filter(function (t) {
      if (t == txt) {
        found = true;
        return false;
      } else return true;
    });
    if (found) {
      this.processTextList(textsFiltered);
      this.saveTexts();
      this.updateTextUI();
      this.rescan();
    }
  },
  updateTextFromUI: function updateTextFromUI() {
    // On user save
    var lines = this.text_area.value.split(/\n/);
    this.processTextList(lines);
    this.updateTextUI(true);
    this.saveTexts();
    this.rescan();
  },
  processTextList: function processTextList(lines) {
    var _this21 = this;
    this.texts = [];
    this.regExps = [];
    lines.forEach(function (line) {
      _this21.addText(line, {
        refresh: false,
        tryRegExp: true
      });
    });
  },
  updateTextUI: function updateTextUI() {
    var fromUI = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.text_area.value = this.texts.join('\n');
    this.text_area.rows = Math.max(4, this.texts.length + 1);
    if (fromUI) settings.flashLabel('text-hidelist');
  },
  initText: function () {
    var _initText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var _this22 = this;
      var texts;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            this.text_area = $('#x1-text-hidelist');
            $('#x1-update-text-hidelist').addEventListener('click', function () {
              return _this22.updateTextFromUI();
            });
            _context16.next = 4;
            return GM_getJSON('text-hidelist');
          case 4:
            texts = _context16.sent;
            if (texts !== null && texts !== void 0 && texts.length) {
              this.processTextList(texts);
              this.updateTextUI();
              this.saveTexts();
            }
          case 6:
          case "end":
            return _context16.stop();
        }
      }, _callee16, this);
    }));
    function initText() {
      return _initText.apply(this, arguments);
    }
    return initText;
  }(),
  saveTexts: function saveTexts() {
    GM.setValue('text-hidelist', JSON.stringify(this.texts));
  },
  // ---------------------------- Posts -----------------------------
  hiddenPosts: [],
  unHiddenPosts: [],
  initPosts: function initPosts() {
    this.hiddenPosts = LS_getJSON('post-hidelist') || [];
    this.unHiddenPosts = LS_getJSON('post-showlist') || [];
  },
  savePosts: function savePosts() {
    LS_saveJSON('post-hidelist', this.hiddenPosts);
    LS_saveJSON('post-showlist', this.unHiddenPosts);
  },
  addPost: function addPost(post) {
    var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var id = this.getPostID(post);
    var wasUnhidden = false;
    this.unHiddenPosts = this.unHiddenPosts.filter(function (p) {
      if (p == id) {
        wasUnhidden = true;
        return false;
      } else return true;
    });
    var pushed = false;
    if (!wasUnhidden || !this.isImplicitlyHidden(post)) {
      if (this.hiddenPosts.includes(id)) return;
      this.hiddenPosts.push(id);
      pushed = true;
    }
    if (!wasUnhidden && !pushed) return;
    if (!passive) this.rescan();
    this.savePosts();
  },
  isImplicitlyHidden: function isImplicitlyHidden(post) {
    return post.classList.contains('x1-hidden-by-text') || post.classList.contains('x1-hidden-by-image');
  },
  removePost: function removePost(post) {
    var id = this.getPostID(post);
    if (this.unHiddenPosts.includes(id)) return;
    var found = false;
    this.hiddenPosts = this.hiddenPosts.filter(function (p) {
      if (p == id) {
        found = true;
        return false;
      } else return true;
    });
    // Check if the post was hidden by other means
    if (this.isImplicitlyHidden(post)) {
      this.unHiddenPosts.push(id);
    } else if (!found) return; // No need to rescan
    this.rescan();
    this.savePosts();
  },
  getPostID: function getPostID(post) {
    var _post$id, _post$id$split;
    return post === null || post === void 0 ? void 0 : (_post$id = post.id) === null || _post$id === void 0 ? void 0 : (_post$id$split = _post$id.split(/(?:post|comment)_/)) === null || _post$id$split === void 0 ? void 0 : _post$id$split[1];
  },
  checkPost: function checkPost(post) {
    var id = this.getPostID(post);
    return this.hiddenPosts.includes(id) && !this.unHiddenPosts.includes(id);
  },
  isUnhidden: function isUnhidden(post) {
    var id = this.getPostID(post);
    return this.unHiddenPosts.includes(id);
  },
  // --------------------------- General ----------------------------
  rescan: function rescan() {
    var _this23 = this;
    ;
    ['b-blog-entry', 'b-comment'].forEach(function (sel) {
      $$(".".concat(sel)).forEach(function (post) {
        var body = post._$(".".concat(sel, "_b-body"));
        if (body) _this23.scanPost(post, body);
      });
    });
  },
  scanPost: function scanPost(post, body) {
    var skipImg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var id = this.getPostID(post),
      isUnhidden = this.unHiddenPosts.includes(id);
    post.classList.remove('x1-post-hidden', 'x1-hidden-by-text', 'x1-hidden-by-id');
    if (this.hiddenPosts.includes(id) && !isUnhidden) {
      post.classList.add('x1-post-hidden', 'x1-hidden-by-id');
    }
    var txt = this.normalizeText(body.innerText),
      header = post._$('.b-blog-entry_b-header');
    header = header && this.normalizeText(header.innerText);
    var _iterator3 = _createForOfIteratorHelper(this.regExps),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var exp = _step3.value;
        if ((exp.test(txt) || header && exp.test(header)) && !isUnhidden) {
          post.classList.add('x1-post-hidden', 'x1-hidden-by-text');
          if (skipImg) return true;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (!skipImg) {
      for (var _i2 = 0, _arr2 = [].concat(_toConsumableArray(body._$$('img:not(.smiley):not(.x1-warning)')), _toConsumableArray(body._$$('video'))); _i2 < _arr2.length; _i2++) {
        var img = _arr2[_i2];
        this.scanImage(img, post, isUnhidden);
      }
    } else return false;
  },
  scanImage: function () {
    var _scanImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(img, post, isUnhidden) {
      var toHide, imgData, _yield$comments$getIm, hideByImg, hideByLink, link;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            post.classList.remove('x1-hidden-by-image');
            toHide = false;
            _context17.next = 4;
            return comments.getImgData(img);
          case 4:
            imgData = _context17.sent;
            if (!imgData) {
              _context17.next = 14;
              break;
            }
            _context17.next = 8;
            return comments.getImgData(img);
          case 8:
            _yield$comments$getIm = _context17.sent;
            hideByImg = _yield$comments$getIm.hideByImg;
            hideByLink = _yield$comments$getIm.hideByLink;
            link = _yield$comments$getIm.link;
            link.classList.remove('x1-img-hidden', 'x1-img-hidden-by-img', 'x1-img-hidden-by-link');
            if (this.isImgHidden(link, hideByImg, hideByLink) && !isUnhidden) post.classList.add('x1-post-hidden', 'x1-hidden-by-image');
          case 14:
          case "end":
            return _context17.stop();
        }
      }, _callee17, this);
    }));
    function scanImage(_x13, _x14, _x15) {
      return _scanImage.apply(this, arguments);
    }
    return scanImage;
  }(),
  isImgHidden: function isImgHidden(link, hideByImg, hideByLink) {
    var toHide = false;
    if (this.imgURLs.includes(hideByImg)) {
      link.classList.add('x1-img-hidden', 'x1-img-hidden-by-img');
      toHide = 'img';
    }
    if (hideByLink) {
      hideByLink = this.normalizeText(hideByLink);
      var _iterator4 = _createForOfIteratorHelper(this.regExps),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var exp = _step4.value;
          if (exp.test(hideByLink)) {
            link.classList.add('x1-img-hidden', 'x1-img-hidden-by-link');
            toHide = 'link';
            break;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    return toHide;
  }
};
var settings = {
  init: function init() {
    var cw = $('.l-content-wrap'),
      rp = $('.l-right-panel-wrap');
    if (!(cw && rp)) {
      console.warn('Unable to initialize settings');
      return;
    }
    rp._ins('beforeend', "<center><button id=\"x1-settings-open\" class=\"x1-btn\">1chan-X</button></center>", true).addEventListener('click', function () {
      if (cw !== null && cw !== void 0 && cw.classList) {
        if (cw.classList.contains('x1-settings-enabled')) cw.classList.remove('x1-settings-enabled');else cw.classList.add('x1-settings-enabled');
      }
      rp.classList.remove('x1-panel-shown');
    });
    this.panel = $('.l-content-wrap')._ins('beforeend', "<div class=\"x1-settings b-blog-form\">\n      <h1>1chan-x <i>v.".concat(GM.info.script.version, "</i></h1>\n      <div class=\"b-blog-form_b-form\">\n        <div class=\"b-blog-form_b-form_b-field\">\n          <h2>\u0410\u0432\u0442\u043E\u0441\u043A\u0440\u044B\u0442\u0438\u0435 \u0442\u0435\u043A\u0441\u0442\u0430 <div id=\"text-hidelist-label\" class=\"x1-label x1-label-succ\">\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E</div></h2>\n          <p>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0438\u043B\u0438 /\u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F/</p>\n          <textarea rows=\"4\" id=\"x1-text-hidelist\"></textarea>\n          <center><button id=\"x1-update-text-hidelist\" class=\"x1-btn\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button></center>\n        </div>\n        <div class=\"b-blog-form_b-form_b-field\">\n          <h2>\u0410\u0432\u0442\u043E\u0441\u043A\u0440\u044B\u0442\u0438\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439 <div id=\"image-hidelist-label\" class=\"x1-label x1-label-succ\">\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E</div></h2>\n          <p>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 URL \u0438\u0437\u043E\u0431\u043E\u0430\u0436\u0435\u043D\u0438\u044F</p>\n          <textarea rows=\"4\" id=\"x1-url-hidelist\"></textarea>\n          <center><button id=\"x1-update-url-hidelist\" class=\"x1-btn\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button></center>\n        </div>\n      </div>\n      <center><button id=\"x1-settings-close\" class=\"x1-btn\">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button></center>\n    </div>"), true);
    this.panel._$('#x1-settings-close').addEventListener('click', function () {
      var _cw$classList;
      return cw === null || cw === void 0 ? void 0 : (_cw$classList = cw.classList) === null || _cw$classList === void 0 ? void 0 : _cw$classList.remove('x1-settings-enabled');
    });
  },
  flashLabel: function flashLabel(id) {
    var label = $("#".concat(id, "-label"));
    if (!label) return;
    label.classList.add('x1-label-shown');
    setTimeout(function () {
      return label.classList.remove('x1-label-shown');
    }, 2000);
  }
};
function setupPanels() {
  $('.b-top-panel')._ins('afterbegin', "\n    <div class=\"x1-panel-toggle x1-panel-toggle-inmenu x1-panel-toggle-inmenu-left\" data-panel=\"left\"></div>\n    <div class=\"x1-panel-toggle x1-panel-toggle-inmenu x1-panel-toggle-inmenu-right\" data-panel=\"right\"></div>");
  $$('.x1-panel-toggle-inmenu').forEach(function (t) {
    var sel = ".l-".concat(t.dataset.panel, "-panel-wrap");
    t.addEventListener('click', function () {
      var p = $(sel);
      if (!p.classList.contains('x1-panel-shown')) {
        p.classList.add('x1-panel-shown', 'x1-panel-transition');
      }
    });
  });
  ['left', 'right'].forEach(function (lr) {
    var p = $(".l-".concat(lr, "-panel-wrap"));
    var hide = function hide() {
      p.classList.remove('x1-panel-shown');
      setTimeout(function () {
        return p.classList.remove('x1-panel-transition');
      }, 200);
    };
    p.addEventListener('click', function (ev) {
      var bcr = p.getBoundingClientRect();
      if (lr == 'left' && ev.pageX > bcr.width || lr == 'right' && ev.pageX < bcr.x) {
        hide();
      }
    });
    p._ins('afterbegin', "<div class=\"x1-panel-toggle x1-panel-toggle-inpanel\"></div>", true).addEventListener('click', hide);
  });
}

// ============================================= Main =============================================

(function () {
  var _main = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
    var cssURL, state, val;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          // Add CSS
          cssURL = "https://juribiyan.github.io/1chan-x/css/1chan-x.css";
          document.head.insertAdjacentHTML('beforeend', "<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(cssURL, "\">")); // temp

          // Add viewport
          document.head.insertAdjacentHTML('afterbegin', "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no\">");
          siteSpecific.init();
          settings.init();
          _context18.next = 7;
          return hiddenItems.init();
        case 7:
          state = determineState();
          if (state) {
            app.state = state;
            $('.l-wrap').classList.add("x1-state-".concat(state));
          }
          if (!(stateHandlers !== null && stateHandlers !== void 0 && stateHandlers[state])) {
            _context18.next = 12;
            break;
          }
          _context18.next = 12;
          return stateHandlers[state]();
        case 12:
          setupPanels();

          // Easter egg
          val = $('a[href^="https://validator.w3.org"]');
          if (val) {
            val._ins('beforeend', "<img class=\"smiley\" src=\"/img/makak.gif\">");
          }
        case 15:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  function main() {
    return _main.apply(this, arguments);
  }
  return main;
})()(); // Always last