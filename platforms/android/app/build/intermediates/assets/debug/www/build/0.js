webpackJsonp([0],{

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainPageModule", function() { return MainPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MainPageModule = /** @class */ (function () {
    function MainPageModule() {
    }
    MainPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__main__["a" /* MainPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__main__["a" /* MainPage */]),
            ],
        })
    ], MainPageModule);
    return MainPageModule;
}());

//# sourceMappingURL=main.module.js.map

/***/ }),

/***/ 337:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ 338:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(350);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(351);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55), __webpack_require__(338)))

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __filename) {
/**
 * Module dependencies.
 */

var fs = __webpack_require__(353)
  , path = __webpack_require__(354)
  , join = path.join
  , dirname = path.dirname
  , exists = fs.existsSync || path.existsSync
  , defaults = {
        arrow: process.env.NODE_BINDINGS_ARROW || ' → '
      , compiled: process.env.NODE_BINDINGS_COMPILED_DIR || 'compiled'
      , platform: process.platform
      , arch: process.arch
      , version: process.versions.node
      , bindings: 'bindings.node'
      , try: [
          // node-gyp's linked version in the "build" dir
          [ 'module_root', 'build', 'bindings' ]
          // node-waf and gyp_addon (a.k.a node-gyp)
        , [ 'module_root', 'build', 'Debug', 'bindings' ]
        , [ 'module_root', 'build', 'Release', 'bindings' ]
          // Debug files, for development (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Debug', 'bindings' ]
        , [ 'module_root', 'Debug', 'bindings' ]
          // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Release', 'bindings' ]
        , [ 'module_root', 'Release', 'bindings' ]
          // Legacy from node-waf, node <= 0.4.x
        , [ 'module_root', 'build', 'default', 'bindings' ]
          // Production "Release" buildtype binary (meh...)
        , [ 'module_root', 'compiled', 'version', 'platform', 'arch', 'bindings' ]
        ]
    }

/**
 * The main `bindings()` function loads the compiled bindings for a given module.
 * It uses V8's Error API to determine the parent filename that this function is
 * being invoked from, which is then used to find the root directory.
 */

function bindings (opts) {

  // Argument surgery
  if (typeof opts == 'string') {
    opts = { bindings: opts }
  } else if (!opts) {
    opts = {}
  }
  opts.__proto__ = defaults

  // Get the module root
  if (!opts.module_root) {
    opts.module_root = exports.getRoot(exports.getFileName())
  }

  // Ensure the given bindings name ends with .node
  if (path.extname(opts.bindings) != '.node') {
    opts.bindings += '.node'
  }

  var tries = []
    , i = 0
    , l = opts.try.length
    , n
    , b
    , err

  for (; i<l; i++) {
    n = join.apply(null, opts.try[i].map(function (p) {
      return opts[p] || p
    }))
    tries.push(n)
    try {
      b = opts.path ? /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) : !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
      if (!opts.path) {
        b.path = n
      }
      return b
    } catch (e) {
      if (!/not find/i.test(e.message)) {
        throw e
      }
    }
  }

  err = new Error('Could not locate the bindings file. Tried:\n'
    + tries.map(function (a) { return opts.arrow + a }).join('\n'))
  err.tries = tries
  throw err
}
module.exports = exports = bindings


/**
 * Gets the filename of the JavaScript file that invokes this function.
 * Used to help find the root directory of a module.
 * Optionally accepts an filename argument to skip when searching for the invoking filename
 */

exports.getFileName = function getFileName (calling_file) {
  var origPST = Error.prepareStackTrace
    , origSTL = Error.stackTraceLimit
    , dummy = {}
    , fileName

  Error.stackTraceLimit = 10

  Error.prepareStackTrace = function (e, st) {
    for (var i=0, l=st.length; i<l; i++) {
      fileName = st[i].getFileName()
      if (fileName !== __filename) {
        if (calling_file) {
            if (fileName !== calling_file) {
              return
            }
        } else {
          return
        }
      }
    }
  }

  // run the 'prepareStackTrace' function above
  Error.captureStackTrace(dummy)
  dummy.stack

  // cleanup
  Error.prepareStackTrace = origPST
  Error.stackTraceLimit = origSTL

  return fileName
}

/**
 * Gets the root directory of a module, given an arbitrary filename
 * somewhere in the module tree. The "root directory" is the directory
 * containing the `package.json` file.
 *
 *   In:  /home/nate/node-native-module/lib/index.js
 *   Out: /home/nate/node-native-module
 */

exports.getRoot = function getRoot (file) {
  var dir = dirname(file)
    , prev
  while (true) {
    if (dir === '.') {
      // Avoids an infinite loop in rare cases, like the REPL
      dir = process.cwd()
    }
    if (exists(join(dir, 'package.json')) || exists(join(dir, 'node_modules'))) {
      // Found the 'package.json' file or 'node_modules' dir; we're done
      return dir
    }
    if (prev === dir) {
      // Got to the top
      throw new Error('Could not find module root given file: "' + file
                    + '". Do you have a `package.json` file? ')
    }
    // Try the parent dir next
    prev = dir
    dir = join(dir, '..')
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(338), "/index.js"))

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/*
 * Copyright (c) 2012-2013, Eelco Cramer
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*jslint node: true*/
/*global require*/

(function () {
    "use strict";

    var util = __webpack_require__(339),
        EventEmitter = __webpack_require__(337).EventEmitter,
        btSerial = __webpack_require__(340)('BluetoothSerialPort.node'),
        DeviceINQ = __webpack_require__(355).DeviceINQ;

    /**
     * Creates an instance of the bluetooth-serial object.
     * @constructor
     * @name Connection
     * @param rpcHandler The RPC handler.
     */
    function BluetoothSerialPort() {
        EventEmitter.call(this);
        this.inq = new DeviceINQ();

        var self = this;

        this.found = function (address, name) {
            self.emit('found', address, name);
        }

        this.finish = function () {
            self.emit('finished');
        }
    }

    util.inherits(BluetoothSerialPort, EventEmitter);
    exports.BluetoothSerialPort = BluetoothSerialPort;

    BluetoothSerialPort.prototype.listPairedDevices = function (callback) {
        this.inq.listPairedDevices(callback);
    };

    BluetoothSerialPort.prototype.inquire = function () {
        this.inq.inquire(this.found, this.finish);
    };

    BluetoothSerialPort.prototype.inquireSync = function () {
        this.inq.inquireSync(this.found, this.finish);
    };

    BluetoothSerialPort.prototype.findSerialPortChannel = function (address, successCallback, errorCallback) {
        this.inq.findSerialPortChannel(address, function (channel) {
            if (channel >= 0) {
                successCallback(channel);
            } else if (errorCallback) {
                errorCallback();
            }
        });
    };

    BluetoothSerialPort.prototype.connect = function (address, channel, successCallback, errorCallback) {
        var self = this,
            read = function () {
                process.nextTick(function () {
                    if (self.connection) {
                        self.connection.read(function (err, buffer) {
                            if (!err && buffer) {
                                self.emit('data', buffer);
                            } else {
                                self.removeListener('data', dataListener);  // remove it to prevent
                                self.close();                               // calling self.on many
                                self.emit('failure', err);                  // times
                            }
                        });
                    }
                });
            },
            dataListener = function (buffer) { // event listenner
                if (buffer.length <= 0) {
                        // we are done reading. The remote device might have closed the device
                        // or we have closed it ourself. Lets cleanup our side anyway...
                        self.close();
                    } else {
                        read();
                    }
            },
            connection = new btSerial.BTSerialPortBinding(address, channel, function () {
                self.address = address;
                self.buffer = [];
                self.connection = connection;
                self.isReading = false;

                self.on('data', dataListener); // add listener to event 'data'

                read();

                successCallback();
            }, function (err) {
                // cleaning up the the failed connection
                connection.close(address);

                if (errorCallback) {
                    errorCallback(err);
                }
            });
    };

    BluetoothSerialPort.prototype.write = function (buffer, cb) {
        if (this.connection) {
            this.connection.write(buffer, this.address, cb);
        } else {
            var err = new Error("Not connected");
            cb.call(err);
        }
    };

    BluetoothSerialPort.prototype.close = function () {
        if (this.connection) {
            this.connection.close(this.address);
            this.connection = undefined;
        }

        this.emit('closed');
    };

    BluetoothSerialPort.prototype.isOpen = function () {
        return this.connection !== undefined;
    };
}());

(function () {
    "use strict";

    if (process.platform !== 'linux') {
        return;
    }

    var util = __webpack_require__(339),
        EventEmitter = __webpack_require__(337).EventEmitter,
        btSerial = __webpack_require__(340)('BluetoothSerialPortServer.node'),
        _SERIAL_PORT_PROFILE_UUID = '1101',
        _DEFAULT_SERVER_CHANNEL = 1,
        _ERROR_CLIENT_CLOSED_CONNECTION = 'Error: Connection closed by the client';

    /**
     * Creates an instance of the bluetooth-serial-server object.
     * @constructor
     */
    function BluetoothSerialPortServer() {
        EventEmitter.call(this);
    }

    util.inherits(BluetoothSerialPortServer, EventEmitter);
    exports.BluetoothSerialPortServer = BluetoothSerialPortServer;

    BluetoothSerialPortServer.prototype.listen = function (successCallback, errorCallback, options) {
        var _options = {};

        if(errorCallback &&
            typeof errorCallback !== 'function'){
            _options = errorCallback;
            errorCallback = null;
        }

        if(successCallback &&
            typeof successCallback !== 'function'){
            if(errorCallback)
            errorCallback("successCallback must be a function!");
            else
            this.emit("failure", "successCallback must be a function!");

            return;
        }

        options = options || _options;
        options.uuid = options.uuid || _SERIAL_PORT_PROFILE_UUID;
        options.channel = options.channel || _DEFAULT_SERVER_CHANNEL;

        var self = this;
        var read = function () {
            process.nextTick(function(){
                if (self.server) {
                    self.server.read(function (err, buffer) {
                        if (!err && buffer) {
                            self.emit('data', buffer);
                            read();
                        }else if(err != _ERROR_CLIENT_CLOSED_CONNECTION){
                            self.emit('failure', err);
                        }else{
                            // The client closed the connection, this is not a failure
                            // so we trigger the event but the RFCOMM socket still can
                            // receive new connections
                            self.emit('closed');
                        }
                    });
                }
            });
        };
        var server = new btSerial.BTSerialPortBindingServer(function (clientAddress) {
            self.server = server;
            read();
            successCallback(clientAddress);
        }, function (err) {
            // cleaning up the the failed connection
            if(this.server)
                this.server.close();
            if (typeof errorCallback === 'function') {
                errorCallback(err);
            }
        }, options);

    };

    BluetoothSerialPortServer.prototype.write = function (buffer, callback) {
        if (this.server) {
            this.server.write(buffer, callback);
        } else {
            callback(new Error("Not connected"));
        }
    };

    BluetoothSerialPortServer.prototype.close = function () {
        if (this.server) {
            this.server.close();
            this.server = undefined;
        }
    };

    BluetoothSerialPortServer.prototype.isOpen = function () {
        return this.server !== undefined;
    };
}());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(338)))

/***/ }),

/***/ 342:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 342;

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var wifiOBDReader;
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MainPage = /** @class */ (function () {
    function MainPage(navCtrl, navParams, ngZone, plt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ngZone = ngZone;
        this.plt = plt;
        this.host = "192.168.0.10:35000"; // ip:port 192.168.0.10:35000
        this.speed = "";
        this.temp = "";
        this.Distance = "";
        var OBDReader = __webpack_require__(345);
        wifiOBDReader = new OBDReader();
        var instance = this;
        this.counter = 0;
        wifiOBDReader.on('debug', function (data) { console.log("=>APP DEBUG:" + data); });
        wifiOBDReader.on('error', function (data) {
            console.log("=>APP ERROR:" + data);
        });
        wifiOBDReader.on('dataReceived', function (data) {
            console.log("=>APP: Received Data=" + JSON.stringify(data));
            if (data.name && data.name == 'vss') {
                var kph_1 = Math.round(data.value); // convert to mph
                setTimeout(function () {
                    instance.ngZone.run(function () {
                        instance.Speed = kph_1;
                        instance.counter += (kph_1 / 3600);
                        instance.Distance = instance.counter.toFixed(2);
                    });
                }, 0);
            }
        });
        wifiOBDReader.on('connected', function () {
            console.log("=>APP: Connected");
            this.stopPolling();
            this.removeAllPollers();
            this.addPoller("vss"); // 0,220 mph
            console.log("=======>ON START WE HAVE " + this.getNumPollers() + " pollers");
            this.startPolling(1000); //Request  values every 1 second.
        }); // conneceted
    }
    MainPage.prototype.start = function () {
        var _this = this;
        console.log(this.host);
        this.plt.ready().then(function () {
            console.log("Platform ready, instantiating OBD");
            wifiOBDReader.setProtocol(0);
            wifiOBDReader.autoconnect("TCP", _this.host);
        }); // ready
    };
    MainPage.prototype.stop = function () {
        this.plt.ready().then(function () {
            wifiOBDReader.removeAllPollers();
            wifiOBDReader.disconnect();
            wifiOBDReader.stopPolling();
            console.log("=======>ON STOP WE HAVE " + wifiOBDReader.getNumPollers() + " pollers");
        });
    };
    MainPage.prototype.sleep = function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };
    MainPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MainPage');
    };
    MainPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setInterval(function () {
            _this.ngZone.run(function () {
                _this.myRand = _this.random();
            });
        }, 5000);
    };
    MainPage.prototype.random = function () {
        var rand = Math.floor(Math.random() * 20) + 1;
        return rand;
    };
    MainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-main',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/main/main.html"*/'<ion-content class="app-background" padding>\n    <ion-header>\n        <ion-toolbar color="font-color">\n            <ion-buttons left>\n                <button ion-button icon-only color="icon-color">\n                    <ion-icon name="ios-notifications"></ion-icon>\n                </button>\n            </ion-buttons>\n            <ion-buttons right>\n                <button ion-button icon-only color="icon-color">\n                    <ion-icon name="ios-contact"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-toolbar>\n    </ion-header>\n    <br><br><br>\n\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6 class="speed-col">\n                <ion-card class="question-card">\n                    <ion-card-content text-center>\n                        <img class="main-icon" src="../assets/imgs/speed.png">\n                        <p style="margin-top:31px;color:#98999c">ความเร็ว</p>\n                        <p style="margin-top:7px;font-size:25px;">{{Speed}}</p>\n                        <p style="margin-top:-5px;color:#98999c">km/h</p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n            <ion-col col-6 class="distance-col">\n                <ion-card class="question-card">\n                    <ion-card-content text-center>\n                        <img class="main-icon" src="../assets/imgs/distance.png">\n                        <p style="margin-top:31px;color:#98999c">ระยะทาง</p>\n                        <p style="margin-top:7px;font-size:25px;">{{Distance}}</p>\n                        <p style="margin-top:-5px;color:#98999c">km</p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-grid>\n        <ion-row class="list-row">\n            <ion-col col-12 class="list-col">\n                <ion-card class="list-card">\n                    <ion-card-title text-left>\n                        น้ำมันเครื่อง\n                    </ion-card-title>\n                    <ion-card-content>\n                        <p></p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n        <ion-row class="list-row">\n            <ion-col col-12 class="list-col">\n                <ion-card class="list-card">\n                    <ion-card-title text-left>\n                        ผ้าเบรค\n                    </ion-card-title>\n                    <ion-card-content>\n                        <p></p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n        <ion-row class="list-row">\n            <ion-col col-12 class="list-col">\n                <ion-card class="list-card">\n                    <ion-card-title text-left>\n                        ยางล้อรถยนต์\n                    </ion-card-title>\n                    <ion-card-content>\n                        <p></p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n        <ion-row class="list-row">\n            <ion-col col-12 class="list-col">\n                <ion-card class="list-card">\n                    <ion-card-title text-left>\n                        ต่อภาษีรถยนต์\n                    </ion-card-title>\n                    <ion-card-content>\n                        <p></p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n        <ion-row class="list-row">\n            <ion-col col-12 class="list-col">\n                <ion-card class="list-card">\n                    <ion-card-title text-left>\n                        กรองอากาศเครื่องยนต์\n                    </ion-card-title>\n                    <ion-card-content>\n                        <p></p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <br>\n    <div class="fix-button">\n        <ion-row style="margin-left:-5px;margin-right:-15px;margin-bottom:-6px;">\n            <ion-col col-6>\n                <button ion-button full class="start-button" (click)="start()">เริ่ม</button>\n            </ion-col>\n            <ion-col col-6>\n                <button ion-button full class="stop-button" (click)="stop()" color="danger">หยุด</button>\n            </ion-col>\n        </ion-row>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/main/main.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], MainPage);
    return MainPage;
}());

//# sourceMappingURL=main.js.map

/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * (C) Copyright 2013, TNO
 * Author: Eric Smekens
 * 
 */

 // modified on Aug 28, 2017 to support TCP 



//Used for event emitting.
var EventEmitter = __webpack_require__(337).EventEmitter;
var util = __webpack_require__(339);

/**
 * obdInfo.js for all PIDS.
 * @type {*}
 */
var PIDS = __webpack_require__(352);

/**
 * Constant for defining delay between writes.
 * @type {number}
 */
var writeDelay = 50;

/**
 * Queue for writing
 * @type {Array}
 */
var queue = [];

// Class OBDReader
var OBDReader;

/**
 * Creates an instance of OBDReader.
 * @constructor
 * @param {string} address MAC-address of device that will be connected to.
 * @param {number} channel Channel that the serial port service runs on.
 * @this {OBDReader}
 */
OBDReader = function () {
    EventEmitter.call(this);
    this.connected = false;
    this.receivedData = "";
    this.protocol = '0';
    this.connType = '';
    return this;
};
util.inherits(OBDReader, EventEmitter);
/**
 * Find a PID-value by name.
 * @param name Name of the PID you want the hexadecimal (in ASCII text) value of.
 * @return {string} PID in hexadecimal ASCII
 */
function getPIDByName(name) {
    var i;
    for (i = 0; i < PIDS.length; i++) {
        if (PIDS[i].name === name) {
            if (PIDS[i].pid !== undefined) {
                return (PIDS[i].mode + PIDS[i].pid);
            }
            //There are modes which don't require a extra parameter ID.
            return (PIDS[i].mode);
        }
    }
}

/**
 * Parses a hexadecimal string to a reply object. Uses PIDS. (obdInfo.js)
 * @param {string} hexString Hexadecimal value in string that is received over the serialport.
 * @return {Object} reply - The reply.
 * @return {string} reply.value - The value that is already converted. This can be a PID converted answer or "OK" or "NO DATA".
 * @return {string} reply.name - The name. --! Only if the reply is a PID.
 * @return {string} reply.mode - The mode of the PID. --! Only if the reply is a PID.
 * @return {string} reply.pid - The PID. --! Only if the reply is a PID.
 */
function parseOBDCommand(hexString) {
    var reply,
        byteNumber,
        valueArray; //New object

    reply = {};
    if (hexString === "NO DATA" || hexString === "OK" || hexString === "?" || hexString === "UNABLE TO CONNECT" || hexString === "SEARCHING...") {
        //No data or OK is the response, return directly.
        reply.value = hexString;
        return reply;
    }

    hexString = hexString.replace(/ /g, ''); //Whitespace trimming //Probably not needed anymore?
    valueArray = [];

    for (byteNumber = 0; byteNumber < hexString.length; byteNumber += 2) {
        valueArray.push(hexString.substr(byteNumber, 2));
    }

    if (valueArray[0] === "41") {
        reply.mode = valueArray[0];
        reply.pid = valueArray[1];
        for (var i = 0; i < PIDS.length; i++) {
            if (PIDS[i].pid == reply.pid) {
                var numberOfBytes = PIDS[i].bytes;
                reply.name = PIDS[i].name;
                switch (numberOfBytes) {
                    case 1:
                        reply.value = PIDS[i].convertToUseful(valueArray[2]);
                        break;
                    case 2:
                        reply.value = PIDS[i].convertToUseful(valueArray[2], valueArray[3]);
                        break;
                    case 4:
                        reply.value = PIDS[i].convertToUseful(valueArray[2], valueArray[3], valueArray[4], valueArray[5]);
                        break;
                    case 8:
                        reply.value = PIDS[i].convertToUseful(valueArray[2], valueArray[3], valueArray[4], valueArray[5], valueArray[6], valueArray[7], valueArray[8], valueArray[9]);
                        break;
                }
                break; //Value is converted, break out the for loop.
            }
        }
    } else if (valueArray[0] === "43") {
        reply.mode = valueArray[0];
        for (var i = 0; i < PIDS.length; i++) {
            if (PIDS[i].mode == "03") {
                reply.name = PIDS[i].name;
                reply.value = PIDS[i].convertToUseful(valueArray[1], valueArray[2], valueArray[3], valueArray[4], valueArray[5], valueArray[6]);
            }
        }
    }
    return reply;
}
/**
 *  Converts a UTF8 Array to a string. cordova sockets returns a UTF8 array 
 * @param {*} array 
 */

 // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */

function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

/**
 * converts from string to Utf8 Array - used by TCP sockets
 * @param {*} dataString 
 */

function strToUtf8Array(dataString) {
    var data = new Uint8Array(dataString.length);
    for (var i = 0; i < data.length; i++) {
        data[i] = dataString.charCodeAt(i);
    }
    return data;
}

/**
 * Initializes the ODB channel with the right AT commands
 * @param {*} instance 
 */
function initComms (instance) {
    var self = instance;
    self.write('ATZ');
    //Turns off extra line feed and carriage return
    self.write('ATL0');
    //This disables spaces in in output, which is faster!
    self.write('ATS0');
    //Turns off headers and checksum to be sent.
    self.write('ATH0');
    //Turns off echo.
    self.write('ATE0');
    //Turn adaptive timing to 2. This is an aggressive learn curve for adjusting the timeout. Will make huge difference on slow systems.
    self.write('ATAT2');
    //Set timeout to 10 * 4 = 40msec, allows +20 queries per second. This is the maximum wait-time. ATAT will decide if it should wait shorter or not.
    //self.write('ATST0A');
    //http://www.obdtester.com/elm-usb-commands
    self.write('ATSP' + self.protocol);
}

/**
 * Set the protocol version number to use with your car.  Defaults to 0
 * which is to autoselect.
 *
 * Uses the ATSP command - see http://www.obdtester.com/elm-usb-commands
 *
 * @default 0
 * 
 */
OBDReader.prototype.setProtocol = function (protocol) {
    if (protocol.toString().search(/^[0-9]$/) === -1) {
        throw "setProtocol: Must provide a number between 0 and 9 - refer to ATSP section of http://www.obdtester.com/elm-usb-commands";
    }
    this.protocol = protocol;
}

/**
 * Get the protocol version number set for this object.  Defaults to 0
 * which is to autoselect.
 *
 * Uses the ATSP command - see http://www.obdtester.com/elm-usb-commands
 *
 */
OBDReader.prototype.getProtocol = function () {
    return this.protocol;
}


/**
 * returns full PID object for name. Useful to get details like min/max/description for display/processing purposes
 */
OBDReader.prototype.getPIDObjectByName = function (name) {
    
    var i;
    for (i = 0; i < PIDS.length; i++) {
        if (PIDS[i].name == name) {
            break;
        }
    }
    return (i < PIDS.length ? PIDS[i]:undefined);
    
    }


/**
 * called by autoconnect if you wanted TCP
 * Don't know why I need to pass a this instance from one prototype to the other
 * but if I don't, the this instance is wrong. Let's chalk this up to my inxperience
 * 
 * url is of the format "host:port" (note this is TCP, so no url scheme)
 */ 
OBDReader.prototype.autoconnectTCP = function (url, instance) {
    var self = instance;
    self.emit('debug', 'TCP autoconnect called');
    var hp = url.split(':');
    var OBDSocket = new Socket();
    self.emit("Opening socket for:" + hp[0] + ":" + hp[1]);
    OBDSocket.open(hp[0], parseInt(hp[1]),
        function (succ) {
            self.connected = true;
            self.onTCPConnect();
            initComms(self);
            self.emit('connected');
        },
        function (err) {
            self.emit ("debug","OBDSocket open error. setting connection false");
            self.connected = false;
            self.onTCPError(err)
        });
    OBDSocket.onData = function (data) {
        self.onTCPEvent(data, self)
    };
    OBDSocket.onClose = function (data) {
        self.emit ("debug","OBDSocket onClose called. setting connection false");
        self.connected = false;
        self.onTCPDisconnect(data)
    };
    OBDSocket.onError = function (data) {
        self.emit ("debug","OBDSocket onError called. setting connection false");
        
        self.connected = false;
        self.onTCPError(data);
    };

    
    this.OBDSocket = OBDSocket; // save connection
    self.emit('debug', 'queue writer interval started');
    this.intervalWriter = setInterval(function () {
        if (queue.length > 0 && self.connected) {
            try {

                var data = queue.shift();
                self.OBDSocket.write(strToUtf8Array(data));

            } catch (err) {
                self.emit('error', 'Error while writing: ' + err);
                self.emit('error', 'OBD-II Listeners deactivated, connection is probably lost.');
                
               
            }
        }

    }, writeDelay); //Updated with Adaptive Timing on ELM327. 20 queries a second seems good enough.


}


// private
OBDReader.prototype.onTCPConnect = function () {
    this.emit("debug", "Connected to TCP dongle");

}

// private
OBDReader.prototype.onTCPError = function (data) {
   
    this.emit('error', "TCP Error: " + JSON.stringify(data));

}

// private
// receives UTF8 data from the OBD TCP socket and parses it
OBDReader.prototype.onTCPEvent = function (u8data, instance) {
    var data = Utf8ArrayToStr(u8data);
    var self = this;
    var currentString, arrayOfCommands;
    currentString = self.receivedData + data.toString('utf8'); // making sure it's a utf8 string

    arrayOfCommands = currentString.split('>');

    var forString;
    if (arrayOfCommands.length < 2) {
        self.receivedData = arrayOfCommands[0];
    } else {
        for (var commandNumber = 0; commandNumber < arrayOfCommands.length; commandNumber++) {
            forString = arrayOfCommands[commandNumber];
            if (forString === '') {
                continue;
            }

            var multipleMessages = forString.split('\r');
            for (var messageNumber = 0; messageNumber < multipleMessages.length; messageNumber++) {
                var messageString = multipleMessages[messageNumber];
                if (messageString === '') {
                    continue;
                }
                var reply;
                reply = parseOBDCommand(messageString);
                //Event dataReceived.
                self.emit('dataReceived', reply);
                self.receivedData = '';
            }
        }
    }


}

// private
OBDReader.prototype.onTCPDisconnect = function () {
    this.emit ('debug', 'TCP disconnected');

}

/**
 * wrapper function that either connects via bluetooth (default) or TCP
 * depending on the 'type' that is passed
 */
OBDReader.prototype.autoconnect = function (type='bluetooth', parameter) {
    this.connType = type;
    if (type == "TCP")
        OBDReader.prototype.autoconnectTCP(parameter, this);
    else
         OBDReader.prototype.autoconnectBluetooth(parameter, this)
     
}

/**
 * Attempts discovery of and subsequent connection to Bluetooth device and channel
 * @param {string} query Query string to be fuzzy-ish matched against device name/address
 */
OBDReader.prototype.autoconnectBluetooth = function (query, instance) {
    console.log("Autoconnect bluetooth called");
    var self = instance; //Enclosure
    var btSerial = new(__webpack_require__(341)).BluetoothSerialPort();
    var search = new RegExp(query.replace(/\W/g, ''), 'gi');

    btSerial.on('found', function (address, name) {
        var addrMatch = !query || address.replace(/\W/g, '').search(search) != -1;
        var nameMatch = !query || name.replace(/\W/g, '').search(search) != -1;

        if (addrMatch || nameMatch) {
            btSerial.removeAllListeners('finished');
            btSerial.removeAllListeners('found');
            self.emit('debug', 'Found device: ' + name + ' (' + address + ')');

            btSerial.findSerialPortChannel(address, function (channel) {
                self.emit('debug', 'Found device channel: ' + channel);
                self.connect(address, channel);
            }, function (err) {
                console.log("Error finding serialport: " + err);
            });
        } else {
            self.emit('debug', 'Ignoring device: ' + name + ' (' + address + ')');
        }
    });

    btSerial.on('finished', function () {
        self.emit('error', 'No suitable devices found');
    });

    btSerial.inquire();
}

/**
 * Connect/Open the bluetooth serial port and add events to bluetooth-serial-port.
 * Also starts the intervalWriter that is used to write the queue.
 * @this {OBDReader}
 */
OBDReader.prototype.connect = function (address, channel) {
    var self = this; //Enclosure
    var btSerial = new(__webpack_require__(341)).BluetoothSerialPort();

    btSerial.connect(address, channel, function () {
        self.connected = true;

        initComms(self);

        //Event connected
        self.emit('connected');

        btSerial.on('data', function (data) {
            var currentString, arrayOfCommands;
            currentString = self.receivedData + data.toString('utf8'); // making sure it's a utf8 string

            arrayOfCommands = currentString.split('>');

            var forString;
            if (arrayOfCommands.length < 2) {
                self.receivedData = arrayOfCommands[0];
            } else {
                for (var commandNumber = 0; commandNumber < arrayOfCommands.length; commandNumber++) {
                    forString = arrayOfCommands[commandNumber];
                    if (forString === '') {
                        continue;
                    }

                    var multipleMessages = forString.split('\r');
                    for (var messageNumber = 0; messageNumber < multipleMessages.length; messageNumber++) {
                        var messageString = multipleMessages[messageNumber];
                        if (messageString === '') {
                            continue;
                        }
                        var reply;
                        reply = parseOBDCommand(messageString);
                        //Event dataReceived.
                        self.emit('dataReceived', reply);
                        self.receivedData = '';
                    }
                }
            }
        });

        btSerial.on('failure', function (error) {
            self.emit('error', 'Error with OBD-II device: ' + error);
        });

    }, function (err) { //Error callback!
        self.emit('error', 'Error with OBD-II device: ' + err);
    });

    this.btSerial = btSerial; //Save the connection in OBDReader object.

    this.intervalWriter = setInterval(function () {

        if (queue.length > 0 && self.connected)
            try {


                self.btSerial.write(new Buffer(queue.shift(), "utf-8"), function (err, count) {
                    if (err)
                        self.emit('error', err);
                });


            } catch (err) {
                self.emit('error', 'Error while writing: ' + err);
                self.emit('error', 'OBD-II Listeners deactivated, connection is probably lost.');
                clearInterval(self.intervalWriter);
                self.removeAllPollers();
            }
    }, writeDelay); //Updated with Adaptive Timing on ELM327. 20 queries a second seems good enough.

    return this;
};

/**
 * Disconnects/closes the port.
 *
 * @param {Function} cb Callback function when the serial connection is closed
 * @this {OBDReader}
 */
OBDReader.prototype.disconnect = function (cb) {
    clearInterval(this.intervalWriter);
    queue.length = 0; //Clears queue
    if (typeof cb === 'function') {
        this.btSerial.on('closed', cb);
    }
    if (this.connType == 'bluetooth') this.btSerial.close()
    else {
        this.OBDSocket.close();
        
        this.emit ("debug","OBDSocket disconnect called. setting connection false");
        console.log ("OBDSocket disconnect called. setting connection false");
    }
    this.connected = false;
};



/**
 * Writes a message to the port. (Queued!) All write functions call this function.
 * @this {OBDReader}
 * @param {string} message The PID or AT Command you want to send. Without \r or \n!
 * @param {number} replies The number of replies that are expected. Default = 0. 0 --> infinite
 * AT Messages --> Zero replies!!
 */
OBDReader.prototype.write = function (message, replies) {
    
    if (replies === undefined) {
        replies = 0;
    }
    //console.log("Queue write called with " + message);
    //console.log ("Inside write, with qlen="+queue.length+ " connected="+this.connected)
    if (this.connected) {
        if (queue.length < 256) {
            if (replies !== 0) {
                queue.push(message + replies + '\r');
            } else {
                queue.push(message + '\r');
            }
        } else {
            this.emit('error', 'Queue-overflow!');
        }
    } else {
        this.emit('error', ' device is not connected.');
        clearInterval(self.intervalWriter);
        self.removeAllPollers();
    }
};
/**
 * Writes a PID value by entering a pid supported name.
 * @this {OBDReader}
 * @param {string} name Look into obdInfo.js for all PIDS.
 */
OBDReader.prototype.requestValueByName = function (name) {
    this.write(getPIDByName(name));
};



var activePollers = [];
/**
 * Adds a poller to the poller-array.
 * @this {OBDReader}
 * @param {string} name Name of the poller you want to add.
 */
OBDReader.prototype.addPoller = function (name) {
    var stringToSend = getPIDByName(name);
    activePollers.push(stringToSend);
};
/**
 * Removes an poller.
 * @this {OBDReader}
 * @param {string} name Name of the poller you want to remove.
 */
OBDReader.prototype.removePoller = function (name) {
    var stringToDelete = getPIDByName(name);
    var index = activePollers.indexOf(stringToDelete);
    activePollers.splice(index, 1);
};
/**
 * Removes all pollers.
 * @this {OBDReader}
 */
OBDReader.prototype.removeAllPollers = function () {
      activePollers.length = 0; //This does not delete the array, it just clears every element.
};


OBDReader.prototype.getNumPollers = function () {
    return activePollers.length;
};


/**
 * Writes all active pollers.
 * @this {OBDReader}
 */
OBDReader.prototype.writePollers = function () {
    var i;
    for (i = 0; i < activePollers.length; i++) {
        this.write(activePollers[i], 1);
    }
};

var pollerInterval;
/**
 * Starts polling. Lower interval than activePollers * 50 will probably give buffer overflows. See writeDelay.
 * @this {OBDReader}
 * @param {number} interval Frequency how often all variables should be polled. (in ms). If no value is given, then for each activePoller 75ms will be added.
 */
OBDReader.prototype.startPolling = function (interval) {
    if (interval === undefined) {
        interval = activePollers.length * (writeDelay * 2); //Double the delay, so there's room for manual requests.
    }

    var self = this;
    pollerInterval = setInterval(function () {
        self.writePollers();
    }, interval);
};
/**
 * Stops polling.
 * @this {OBDReader}
 */
OBDReader.prototype.stopPolling = function () {
    clearInterval(pollerInterval);
};

var exports = module.exports = OBDReader;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(346).Buffer))

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(347)
var ieee754 = __webpack_require__(348)
var isArray = __webpack_require__(349)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 348:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 349:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 350:
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 351:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * (C) Copyright 2013, TNO
 * Author: Eric Smekens
 */


function checkHex(n){
    return/^[0-9A-Fa-f]{1,64}$/.test(n);
}
function Hex2Bin(n){
    if(!checkHex(n)){
        return 0;
    }
    return zeroFill(parseInt(n,16).toString(2),4);
}
function zeroFill( number, width ){
  width -= number.toString().length;
  if ( width > 0 ){
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}
function bitDecoder(byte) {
    return parseInt(byte, 2);
}
function convertPIDSupported(byteA, byteB, byteC, byteD) {
    var hexstring = byteA + byteB + byteC + byteD;
    var pidHex = hexstring.split('');
    var pidStatus = [];
    pidHex.forEach(function(hex){
        var hexPerm = Hex2Bin(hex).split('');
        hexPerm.forEach(function(perm){
            pidStatus.push( perm === "1" ? true : false );
        });
    });
    return pidStatus;
}
function convertFuelSystem(byteA, byteB){
    var reply = {};
    reply.system1 = bitDecoder(byteA);
    if( byteB ){
        reply.system2 = bitDecoder(byteB);
    }
    return reply;
}
function convertDTCCheck(byteA, byteB, byteC, byteD) {
    //ByteB, ByteC and ByteD are not read. These bytes are for testing purposes, which is not supported in this module.
    var byteValue, mil, numberOfDTCs, reply;
    byteValue = parseInt(byteA, 16);
    if ((byteValue >> 7) === 1) {
        mil = 1;
    } else {
        mil = 0;
    }
    numberOfDTCs = byteValue % 128;
    reply = {};
    reply.numberOfErrors = numberOfDTCs;
    reply.mil = mil;
    return reply;
}
function convertDTCRequest(byteA, byteB, byteC, byteD, byteE, byteF) {
    var reply = {};
    reply.errors = [];

    var decodeDTCCode = function (byte1, byte2) {
        var codeString = "", firstChar;

        //If 00 00 --> No code.
        if ((byte1 === '00') && (byte2 === '00')) {
            return '-';
        }

        var firstByte = parseInt(byte1, 16);
        var firstCharBytes = firstByte >> 6;
        switch(firstCharBytes) {
            case 0:
                firstChar = 'P';
                break;
            case 1:
                firstChar = 'C';
                break;
            case 2:
                firstChar = 'B';
                break;
            case 3:
                firstChar = 'U';
                break;
            default:
                console.log('Error with DTC');
                break;
        }
        var secondChar = (firstByte >> 4) % 4;
        var thirdChar = firstByte % 16;
        codeString = firstChar + secondChar + thirdChar + byte2;
        return codeString;
    };

    reply.errors[0] = decodeDTCCode(byteA, byteB);
    reply.errors[1] = decodeDTCCode(byteC, byteD);
    reply.errors[2] = decodeDTCCode(byteE, byteF);
    return reply;
}
function convertLoad(byte) {
    return parseInt(byte, 16) * (100 / 256);
}
function convertTemp(byte) {
    return parseInt(byte, 16) - 40;
}
function convertFuelTrim(byte) {
    return (parseInt(byte, 16) - 128) * (100 / 128);
}
function convertFuelRailPressure(byte) {
    return parseInt(byte, 16) * 3;
}
function convertIntakePressure(byte) {
    return parseInt(byte, 16);
}
function convertRPM(byteA, byteB) {
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 4;
}
function convertSpeed(byte) {
    return parseInt(byte, 16);
}
function convertSparkAdvance(byte) {
    return (parseInt(byte, 16) / 2) - 64;
}
function convertAirFlowRate(byteA, byteB) {
    return ((parseInt(byteA, 16) * 256.0) + parseInt(byteB, 16)) / 100;
}
function convertThrottlePos(byte) {
    return (parseInt(byte, 16) * 100) / 255;
}
function convertOxygenSensorOutput(byte) {
    return parseInt(byte, 16) * 0.005;
}
function convertRuntime(byteA, byteB){
    return (parseInt(byteA, 16) * 256.0) + parseInt(byteB, 16);
}
function convertfrpm(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) * 0.079;
}
function convertfrpd(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) * 10
}
function convertLambda(byteA, byteB, byteC, byteD){
    var reply = {};
    reply.ratio = ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) * 2 / 65535;
    reply.voltage = ((parseInt(byteC, 16) * 256) + parseInt(byteD, 16)) * 8 / 65535;
    return reply;
}
function convertPercentA(byte){
    return parseInt(byte, 16) * 100 / 255;
}
function convertPercentB(byte){
    return (parseInt(byte, 16) - 128) * 100 / 128;
}
function convertDistanceSinceCodesCleared(byteA, byteB){
    return (parseInt(byteA, 16) * 256) + parseInt(byteB, 16);
}
function convertLambda2(byteA, byteB, byteC, byteD){
    var reply = {};
    reply.ratio = ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 32768;
    reply.voltage = ((parseInt(byteC, 16) * 256) + parseInt(byteD, 16)) / 256 - 128;
    return reply;
}
function convertCatalystTemperature(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 10 - 40;
}
function convertControlModuleVoltage(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 1000;
}
function convertAbsoluteLoad(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) * 100 / 255;
}
function convertLambda3(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 32768;
}
function convertAmbientAirTemp(byte){
    return parseInt(byte, 16) - 40;
}
function convertMinutes(byteA, byteB){
    return (parseInt(byteA, 16) * 256) + parseInt(byteB, 16);
}
function convertExternalTestEquipment(byteA, byteB, byteC, byteD){
    var reply = {};
    reply.te1 = bitDecoder(byteA);
    reply.te2 = bitDecoder(byteB);
    reply.te3 = bitDecoder(byteC);
    reply.te4 = bitDecoder(byteD) * 10;
    return reply;
}
function convertExternalTestEquipment2(byteA, byteB, byteC, byteD){
    var reply = {};
    reply.te1 = bitDecoder(byteA) * 10;
    reply.te2 = bitDecoder(byteB);
    reply.te3 = bitDecoder(byteC);
    reply.te4 = bitDecoder(byteD);
    return reply;
}
function convertAbsoluteVaporPressure(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 200;   
}
function convertSystemVaporPressure(byteA, byteB){
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) - 32767;   
}
function convertShortOxygenSensorOutput(byteA, byteB){
    var reply = {};
    reply.bank1 = (parseInt(byteA, 16) - 128) * 100 / 128;
    reply.bank2 = (parseInt(byteB, 16) - 128) * 100 / 128;
    return reply;
}
function convertFuelRailPressureAbs(byteA, byteB) {
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) * 10;
}
function convertFuelInjectionTiming(byteA, byteB) {
    return (((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) - 26880) / 128;
}
function convertEngineFuelRate(byteA, byteB) {
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) * 0.05;
}

function convertEngineTorque(byte){
    return parseInt(byte, 16) - 125;
}

function convertExhastGasTemperature(byteA, byteB){
    return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 10 - 40;
}
//DTC
function notSupported() {
   console.log("There is no answer. This should not be happening.");
   return;
}
//VIN
function convertVIN_count(byte) {
    return byte;
}
function convertVIN(byte) {
    byte = byte.split("");
    var tmp=[], vin="";
    for(var i in byte){
        tmp[i] = parseInt(byte[i]);
        tmp[i] = parseInt(tmp[i], 16);
        vin += String.fromCharCode(tmp[i]);
    }
    return vin;
}

var responsePIDS;
var modeRealTime = "01";
var modeRequestDTC = "03";
var modeClearDTC = "04";
var modeVin = "09";

responsePIDS = [
    //Realtime data
    {mode: modeRealTime, pid: "00", bytes: 4, name: "pidsupp0",     description: "PIDs supported 00-20", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: convertPIDSupported},
    {mode: modeRealTime, pid: "01", bytes: 4, name: "dtc_cnt",      description: "Monitor status since DTCs cleared", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: convertDTCCheck},
    {mode: modeRealTime, pid: "02", bytes: 2, name: "dtcfrzf",      description: "DTC that caused required freeze frame data storage", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "03", bytes: 2, name: "fuelsys",      description: "Fuel system 1 and 2 status", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: convertFuelSystem},
    {mode: modeRealTime, pid: "04", bytes: 1, name: "load_pct",     description: "Calculated LOAD Value", min: 0, max: 100, unit: "%", convertToUseful: convertLoad},
    {mode: modeRealTime, pid: "05", bytes: 1, name: "temp",         description: "Engine Coolant Temperature", min: -40, max: 215, unit: "Celsius", convertToUseful: convertTemp},
    {mode: modeRealTime, pid: "06", bytes: 1, name: "shrtft13",     description: "Short Term Fuel Trim - Bank 1,3", min: -100, max: 99.22, unit: "%", convertToUseful: convertFuelTrim},
    {mode: modeRealTime, pid: "07", bytes: 1, name: "longft13",     description: "Long Term Fuel Trim - Bank 1,3", min: -100, max: 99.22, unit: "%", convertToUseful: convertFuelTrim},
    {mode: modeRealTime, pid: "08", bytes: 1, name: "shrtft24",     description: "Short Term Fuel Trim - Bank 2,4", min: -100, max: 99.22, unit: "%", convertToUseful: convertFuelTrim},
    {mode: modeRealTime, pid: "09", bytes: 1, name: "longft24",     description: "Long Term Fuel Trim - Bank 2,4", min: -100, max: 99.22, unit: "%", convertToUseful: convertFuelTrim},
    {mode: modeRealTime, pid: "0A", bytes: 1, name: "frp",          description: "Fuel Pressure", min: 0, max: 765, unit: "kPa", convertToUseful: convertFuelRailPressure},
    {mode: modeRealTime, pid: "0B", bytes: 1, name: "map",          description: "Intake Manifold Absolute Pressure", min: 0, max: 255, unit: "kPa", convertToUseful: convertIntakePressure},
    {mode: modeRealTime, pid: "0C", bytes: 2, name: "rpm",          description: "Engine RPM", min: 0, max: 16383.75, unit: "rev/min", convertToUseful: convertRPM},
    {mode: modeRealTime, pid: "0D", bytes: 1, name: "vss",          description: "Vehicle Speed Sensor", min: 0, max: 255, unit: "km/h", convertToUseful: convertSpeed},
    {mode: modeRealTime, pid: "0E", bytes: 1, name: "sparkadv",     description: "Ignition Timing Advance for #1 Cylinder", min: -64, max: 63.5, unit: "degrees relative to #1 cylinder",  convertToUseful: convertSparkAdvance},
    {mode: modeRealTime, pid: "0F", bytes: 1, name: "iat",          description: "Intake Air Temperature", min: -40, max: 215, unit: "Celsius", convertToUseful: convertTemp},
    {mode: modeRealTime, pid: "10", bytes: 2, name: "maf",          description: "Air Flow Rate from Mass Air Flow Sensor", min: 0, max: 655.35, unit: "g/s", convertToUseful: convertAirFlowRate},
    {mode: modeRealTime, pid: "11", bytes: 1, name: "throttlepos",  description: "Absolute Throttle Position", min: 1, max: 100, unit: "%", convertToUseful: convertThrottlePos},
    {mode: modeRealTime, pid: "12", bytes: 1, name: "air_stat",     description: "Commanded Secondary Air Status", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "13", bytes: 1, name: "o2sloc",       description: "Location of Oxygen Sensors", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "14", bytes: 2, name: "o2s11",        description: "Bank 1 - Sensor 1/Bank 1 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput},
    {mode: modeRealTime, pid: "15", bytes: 2, name: "o2s12",        description: "Bank 1 - Sensor 2/Bank 1 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput},
    {mode: modeRealTime, pid: "16", bytes: 2, name: "o2s13",        description: "Bank 1 - Sensor 3/Bank 2 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput},
    {mode: modeRealTime, pid: "17", bytes: 2, name: "o2s14",        description: "Bank 1 - Sensor 4/Bank 2 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput},
    {mode: modeRealTime, pid: "18", bytes: 2, name: "o2s21",        description: "Bank 2 - Sensor 1/Bank 3 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput},
    {mode: modeRealTime, pid: "19", bytes: 2, name: "o2s22",        description: "Bank 2 - Sensor 2/Bank 3 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput},
    {mode: modeRealTime, pid: "1A", bytes: 2, name: "o2s23",        description: "Bank 2 - Sensor 3/Bank 4 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput},
    {mode: modeRealTime, pid: "1B", bytes: 2, name: "o2s24",        description: "Bank 2 - Sensor 4/Bank 4 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: convertOxygenSensorOutput}, 
    {mode: modeRealTime, pid: "1C", bytes: 1, name: "obdsup",       description: "OBD requirements to which vehicle is designed", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "1D", bytes: 1, name: "o2sloc2",      description: "Location of oxygen sensors", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "1E", bytes: 1, name: "pto_stat",     description: "Auxiliary Input Status", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "1F", bytes: 2, name: "runtm",        description: "Time Since Engine Start", min: 0, max: 65535, unit: "seconds", convertToUseful: convertRuntime},
    {mode: modeRealTime, pid: "20", bytes: 4, name: "piddsupp2",    description: "PIDs supported 21-40", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: convertPIDSupported},
    {mode: modeRealTime, pid: "21", bytes: 2, name: "mil_dist",     description: "Distance Travelled While MIL is Activated", min: 0, max: 65535, unit: "km", convertToUseful: convertRuntime},
    {mode: modeRealTime, pid: "22", bytes: 2, name: "frpm",         description: "Fuel Rail Pressure relative to manifold vacuum", min: 0, max: 5177.265, unit: "kPa", convertToUseful: convertfrpm},
    {mode: modeRealTime, pid: "23", bytes: 2, name: "frpd",         description: "Fuel Rail Pressure (diesel)", min: 0, max: 655350, unit: "kPa", convertToUseful: convertfrpd},
    {mode: modeRealTime, pid: "24", bytes: 4, name: "lambda11",     description: "Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "25", bytes: 4, name: "lambda12",     description: "Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "26", bytes: 4, name: "lambda13",     description: "Bank 1 - Sensor 3 /Bank 2 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "27", bytes: 4, name: "lambda14",     description: "Bank 1 - Sensor 4 /Bank 2 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "28", bytes: 4, name: "lambda21",     description: "Bank 2 - Sensor 1 /Bank 3 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "29", bytes: 4, name: "lambda22",     description: "Bank 2 - Sensor 2 /Bank 3 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "2A", bytes: 4, name: "lambda23",     description: "Bank 2 - Sensor 3 /Bank 4 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "2B", bytes: 4, name: "lambda24",     description: "Bank 2 - Sensor 4 /Bank 4 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda},
    {mode: modeRealTime, pid: "2C", bytes: 1, name: "egr_pct",      description: "Commanded EGR", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "2D", bytes: 1, name: "egr_err",      description: "EGR Error", min: -100, max: 99.22, unit: "%", convertToUseful: convertPercentB},
    {mode: modeRealTime, pid: "2E", bytes: 1, name: "evap_pct",     description: "Commanded Evaporative Purge", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "2F", bytes: 1, name: "fli",          description: "Fuel Level Input", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "30", bytes: 1, name: "warm_ups",     description: "Number of warm-ups since diagnostic trouble codes cleared", min: 0, max: 255, unit: "", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "31", bytes: 2, name: "clr_dist",     description: "Distance since diagnostic trouble codes cleared", min: 0, max: 65535, unit: "km", convertToUseful: convertDistanceSinceCodesCleared},
    // <-- pending
    {mode: modeRealTime, pid: "32", bytes: 2, name: "evap_vp",      description: "Evap System Vapour Pressure", min: -8192, max: 8192, unit: "Pa", convertToUseful: bitDecoder},
    // pending -->
    {mode: modeRealTime, pid: "33", bytes: 1, name: "baro",         description: "Barometric Pressure", min: 0, max: 255, unit: "kPa", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "34", bytes: 4, name: "lambdac11",    description: "Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "35", bytes: 4, name: "lambdac12",    description: "Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "36", bytes: 4, name: "lambdac13",    description: "Bank 1 - Sensor 3/Bank 2 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "37", bytes: 4, name: "lambdac14",    description: "Bank 1 - Sensor 4/Bank 2 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "38", bytes: 4, name: "lambdac21",    description: "Bank 2 - Sensor 1/Bank 3 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "39", bytes: 4, name: "lambdac22",    description: "Bank 2 - Sensor 2/Bank 3 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "3A", bytes: 4, name: "lambdac23",    description: "Bank 2 - Sensor 3/Bank 4 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "3B", bytes: 4, name: "lambdac24",    description: "Bank 2 - Sensor 4/Bank 4 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda2},
    {mode: modeRealTime, pid: "3C", bytes: 2, name: "catemp11",     description: "Catalyst Temperature Bank 1 /  Sensor 1", min: -40, max: 6513.5, unit: "Celsius", convertToUseful: convertCatalystTemperature},
    {mode: modeRealTime, pid: "3D", bytes: 2, name: "catemp21",     description: "Catalyst Temperature Bank 2 /  Sensor 1", min: -40, max: 6513.5, unit: "Celsius", convertToUseful: convertCatalystTemperature},
    {mode: modeRealTime, pid: "3E", bytes: 2, name: "catemp12",     description: "Catalyst Temperature Bank 1 /  Sensor 2", min: -40, max: 6513.5, unit: "Celsius", convertToUseful: convertCatalystTemperature},
    {mode: modeRealTime, pid: "3F", bytes: 2, name: "catemp22",     description: "Catalyst Temperature Bank 2 /  Sensor 2", min: -40, max: 6513.5, unit: "Celsius", convertToUseful: convertCatalystTemperature},

    {mode: modeRealTime, pid: "40", bytes: 4, name: "piddsupp4",    description: "PIDs supported 41-60", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: convertPIDSupported},
    // <-- pending
    {mode: modeRealTime, pid: "41", bytes: 4, name: "monitorstat",  description: "Monitor status this driving cycle", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    // pending -->
    {mode: modeRealTime, pid: "42", bytes: 2, name: "vpwr",         description: "Control module voltage", min: 0, max: 65535, unit: "V", convertToUseful: convertControlModuleVoltage},
    {mode: modeRealTime, pid: "43", bytes: 2, name: "load_abs",     description: "Absolute Load Value", min: 0, max: 25700, unit: "%", convertToUseful: convertAbsoluteLoad},
    {mode: modeRealTime, pid: "44", bytes: 2, name: "lambda",       description: "Fuel/air Commanded Equivalence Ratio", min: 0, max: 2, unit: "(ratio)", convertToUseful: convertLambda3},
    {mode: modeRealTime, pid: "45", bytes: 1, name: "tp_r",         description: "Relative Throttle Position", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "46", bytes: 1, name: "aat",          description: "Ambient air temperature", min: -40, max: 215, unit: "Celsius", convertToUseful: convertAmbientAirTemp},
    {mode: modeRealTime, pid: "47", bytes: 1, name: "tp_b",         description: "Absolute Throttle Position B", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "48", bytes: 1, name: "tp_c",         description: "Absolute Throttle Position C", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "49", bytes: 1, name: "app_d",        description: "Accelerator Pedal Position D", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "4A", bytes: 1, name: "app_e",        description: "Accelerator Pedal Position E", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "4B", bytes: 1, name: "app_f",        description: "Accelerator Pedal Position F", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "4C", bytes: 1, name: "tac_pct",      description: "Commanded Throttle Actuator Control", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "4D", bytes: 2, name: "mil_time",     description: "Time run by the engine while MIL activated", min: 0, max: 65535, unit: "minutes", convertToUseful: convertMinutes},
    {mode: modeRealTime, pid: "4E", bytes: 2, name: "clr_time",     description: "Time since diagnostic trouble codes cleared", min: 0, max: 65535, unit: "minutes", convertToUseful: convertMinutes},
    {mode: modeRealTime, pid: "4F", bytes: 4, name: "exttest1",     description: "External Test Equipment Configuration #1", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: convertExternalTestEquipment},
    {mode: modeRealTime, pid: "50", bytes: 4, name: "exttest2",     description: "External Test Equipment Configuration #2", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: convertExternalTestEquipment2},
    {mode: modeRealTime, pid: "51", bytes: 1, name: "fuel_type",    description: "Fuel Type", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},
    {mode: modeRealTime, pid: "52", bytes: 1, name: "alch_pct",     description: "Ethanol fuel %", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "53", bytes: 2, name: "abs_vp",       description: "Absolute Evap system Vapor Pressure", min: 0, max: 327675, unit: "kPa", convertToUseful: convertAbsoluteVaporPressure},
    {mode: modeRealTime, pid: "54", bytes: 2, name: "system_vp",    description: "Evap system vapor pressure", min: -32767, max: 32767, unit: "Pa", convertToUseful: convertSystemVaporPressure},
    {mode: modeRealTime, pid: "55", bytes: 2, name: "s02b13",       description: "Short term secondary oxygen sensor trim bank 1 and bank 3", min: -100, max: 99.22, unit: "%", convertToUseful: convertShortOxygenSensorOutput},
    {mode: modeRealTime, pid: "56", bytes: 2, name: "l02b13",       description: "Long term secondary oxygen sensor trim bank 1 and bank 3", min: -100, max: 99.22, unit: "%", convertToUseful: convertShortOxygenSensorOutput},
    {mode: modeRealTime, pid: "57", bytes: 2, name: "s02b24",       description: "Short term secondary oxygen sensor trim bank 2 and bank 4", min: -100, max: 99.22, unit: "%", convertToUseful: convertShortOxygenSensorOutput},
    {mode: modeRealTime, pid: "58", bytes: 2, name: "l02b24",       description: "Long term secondary oxygen sensor trim bank 2 and bank 4", min: -100, max: 99.22, unit: "%", convertToUseful: convertShortOxygenSensorOutput},
    {mode: modeRealTime, pid: "59", bytes: 2, name: "frp_abs",      description: "Fuel rail pressure (absolute)", min: 0, max: 655350, unit: "kPa", convertToUseful: convertFuelRailPressureAbs},
    {mode: modeRealTime, pid: "5A", bytes: 1, name: "pedalpos",     description: "Relative accelerator pedal position", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "5B", bytes: 1, name: "hybridlife",   description: "Hybrid battery pack remaining life", min: 0, max: 100, unit: "%", convertToUseful: convertPercentA},
    {mode: modeRealTime, pid: "5C", bytes: 1, name: "engineoilt",   description: "Engine oil temperature", min: -40, max: 210, unit: "°C", convertToUseful: convertTemp},
    {mode: modeRealTime, pid: "5D", bytes: 2, name: "finjtiming",   description: "Fuel injection timing", min: -210.00, max: 301.992, unit: "°", convertToUseful: convertFuelInjectionTiming},
    {mode: modeRealTime, pid: "5E", bytes: 2, name: "enginefrate",  description: "Engine fuel rate", min: 0, max: 3212.75, unit: "L/h", convertToUseful: convertEngineFuelRate},
    {mode: modeRealTime, pid: "5F", bytes: 1, name: "emmissionreq", description: "Emission requirements to which vehicle is designed", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: bitDecoder},

    //added some new pid entries
    {mode: modeRealTime, pid: "62", bytes: 1, name: "aet",          description: "Actual engine - percent torque", min: -125, max: 125, unit: "%", convertToUseful: convertEngineTorque},
    {mode: modeRealTime, pid: "67", bytes: 3, name: "ect",          description: "Engine coolant temperature", min: -40, max: 215, unit: "Celsius"},
    {mode: modeRealTime, pid: "6B", bytes: 5, name: "egrt",         description: "Exhaust gas recirculation temperature", min: -40, max: 215, unit: "Celsius"},
    {mode: modeRealTime, pid: "6D", bytes: 6, name: "fpc",          description: "Fuel pressure control system", min: -40, max: 215, unit: "Celsius"},
    {mode: modeRealTime, pid: "6E", bytes: 5, name: "ipct",         description: "Injection pressure control system", min: -40, max: 215, unit: "Celsius"},
    {mode: modeRealTime, pid: "73", bytes: 5, name: "ep",           description: "Exhaust pressure", min: -40, max: 215, unit: "Celsius"},
    {mode: modeRealTime, pid: "78", bytes: 9, name: "egt",          description: "Exhaust Gas temperature Bank 1", min: -40, max: 215, unit: "Celsius", convertToUseful: convertExhastGasTemperature},



    //DTC's
    {mode: modeRequestDTC, pid: undefined, bytes: 6, name: "requestdtc", description: "Requested DTC", convertToUseful: convertDTCRequest}, //n*6 --> For each code, 6 bytes.
    {mode: modeClearDTC, pid: undefined, bytes: 0, name: "cleardtc", description: "Clear Trouble Codes (Clear engine light)", convertToUseful: notSupported},

    //VIN
    {mode: modeVin, pid: "00", bytes: 4, name: "vinsupp0", description: "Vehicle Identification Number", convertToUseful: bitDecoder},
    {mode: modeVin, pid: "01", bytes: 1, name: "vin_mscout", description: "VIN message count", convertToUseful: convertVIN_count},
    {mode: modeVin, pid: "02", bytes: 1, name: "vin", description: "Vehicle Identification Number", convertToUseful: convertVIN}
];

var exports = module.exports = responsePIDS;

/***/ }),

/***/ 353:
/***/ (function(module, exports) {



/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(338)))

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2012-2013, Eelco Cramer
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*jslint node: true*/
/*global require */

(function () {
    "use strict";

    // javascript shim that lets our object inherit from EventEmitter
    var DeviceINQ = __webpack_require__(340)('BluetoothSerialPort.node').DeviceINQ,
        events = __webpack_require__(337);

    // extend prototype
    function inherits(target, source) {
        var k;

        for (k in source.prototype) {
            target.prototype[k] = source.prototype[k];
        }
    }

    inherits(DeviceINQ, events.EventEmitter);
    exports.DeviceINQ = DeviceINQ;

}());


/***/ })

});
//# sourceMappingURL=0.js.map