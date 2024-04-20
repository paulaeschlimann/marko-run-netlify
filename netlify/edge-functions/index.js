// dist/index.mjs
var pageResponseInit = {
  status: 200,
  headers: { "content-type": "text/html;charset=UTF-8" }
};
function pageResponse(template, input) {
  return new Response(template.stream(input), pageResponseInit);
}
var NotHandled = Symbol();
var NotMatched = Symbol();
globalThis.MarkoRun ?? (globalThis.MarkoRun = {
  NotHandled,
  NotMatched,
  route(handler) {
    return handler;
  }
});
var serializedGlobals = { params: true, url: true };
function createContext(route, request, platform, url = new URL(request.url)) {
  const context = route ? {
    request,
    url,
    platform,
    meta: route.meta,
    params: route.params,
    route: route.path,
    serializedGlobals
  } : {
    request,
    url,
    platform,
    meta: {},
    params: {},
    route: "",
    serializedGlobals
  };
  let input;
  return [
    context,
    (data) => {
      input ?? (input = {
        $global: context
      });
      return data ? Object.assign(input, data) : input;
    }
  ];
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var encoder = new TextEncoder();
var noop$3 = function() {
};
var indexBrowser = function(data) {
  var transformStream = new TransformStream();
  var writer = transformStream.writable.getWriter();
  var facade = {
    write: function(string) {
      writer.write(encoder.encode(string));
    },
    end: function() {
      writer.close();
    }
  };
  var out = this.createOut(
    data && data.$global,
    facade,
    void 0,
    this._U_
  );
  out.once("error", (err) => {
    facade.write = facade.end = noop$3;
    writer.abort(err);
  });
  this.render(data, out);
  out.end();
  return transformStream.readable;
};
var slice = Array.prototype.slice;
function isFunction(arg) {
  return typeof arg === "function";
}
function checkListener(listener) {
  if (!isFunction(listener)) {
    throw TypeError("Invalid listener");
  }
}
function invokeListener(ee, listener, args) {
  switch (args.length) {
    case 1:
      listener.call(ee);
      break;
    case 2:
      listener.call(ee, args[1]);
      break;
    case 3:
      listener.call(ee, args[1], args[2]);
      break;
    default:
      listener.apply(ee, slice.call(args, 1));
  }
}
function addListener(eventEmitter, type, listener, prepend) {
  checkListener(listener);
  var events = eventEmitter.$e || (eventEmitter.$e = {});
  var listeners = events[type];
  if (listeners) {
    if (isFunction(listeners)) {
      events[type] = prepend ? [listener, listeners] : [listeners, listener];
    } else {
      if (prepend) {
        listeners.unshift(listener);
      } else {
        listeners.push(listener);
      }
    }
  } else {
    events[type] = listener;
  }
  return eventEmitter;
}
function EventEmitter$1() {
  this.$e = this.$e || {};
}
EventEmitter$1.EventEmitter = EventEmitter$1;
EventEmitter$1.prototype = {
  $e: null,
  emit: function(type) {
    var args = arguments;
    var events = this.$e;
    if (!events) {
      return;
    }
    var listeners = events && events[type];
    if (!listeners) {
      if (type === "error") {
        var error = args[1];
        if (!(error instanceof Error)) {
          var context = error;
          error = new Error("Error: " + context);
          error.context = context;
        }
        throw error;
      }
      return false;
    }
    if (isFunction(listeners)) {
      invokeListener(this, listeners, args);
    } else {
      listeners = slice.call(listeners);
      for (var i = 0, len = listeners.length; i < len; i++) {
        var listener = listeners[i];
        invokeListener(this, listener, args);
      }
    }
    return true;
  },
  on: function(type, listener) {
    return addListener(this, type, listener, false);
  },
  prependListener: function(type, listener) {
    return addListener(this, type, listener, true);
  },
  once: function(type, listener) {
    checkListener(listener);
    function g() {
      this.removeListener(type, g);
      if (listener) {
        listener.apply(this, arguments);
        listener = null;
      }
    }
    this.on(type, g);
    return this;
  },
  // emits a 'removeListener' event iff the listener was removed
  removeListener: function(type, listener) {
    checkListener(listener);
    var events = this.$e;
    var listeners;
    if (events && (listeners = events[type])) {
      if (isFunction(listeners)) {
        if (listeners === listener) {
          delete events[type];
        }
      } else {
        for (var i = listeners.length - 1; i >= 0; i--) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
          }
        }
      }
    }
    return this;
  },
  removeAllListeners: function(type) {
    var events = this.$e;
    if (events) {
      delete events[type];
    }
  },
  listenerCount: function(type) {
    var events = this.$e;
    var listeners = events && events[type];
    return listeners ? isFunction(listeners) ? 1 : listeners.length : 0;
  }
};
var src$1 = EventEmitter$1;
var selfClosingTags$1 = { exports: {} };
var svgElements = [
  "circle",
  "ellipse",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "use"
];
var voidElements = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
selfClosingTags$1.exports = voidElements.concat(svgElements);
selfClosingTags$1.exports.voidElements = voidElements;
selfClosingTags$1.exports.svgElements = svgElements;
var selfClosingTagsExports = selfClosingTags$1.exports;
var extend$3 = function extend(target, source) {
  if (!target) {
    target = {};
  }
  if (source) {
    for (var propName in source) {
      if (source.hasOwnProperty(propName)) {
        target[propName] = source[propName];
      }
    }
  }
  return target;
};
var componentsUtil$3 = {};
var FLAG_WILL_RERENDER_IN_BROWSER$4 = 1;
function nextComponentIdProvider$1(out) {
  var prefix = out.global.componentIdPrefix || out.global.widgetIdPrefix || "s";
  var nextId = 0;
  return function nextComponentId() {
    return prefix + nextId++;
  };
}
function attachBubblingEvent$1(componentDef, handlerMethodName, isOnce, extraArgs) {
  if (handlerMethodName) {
    if (extraArgs) {
      var component = componentDef.s_;
      var eventIndex = component.Z_++;
      if (!(componentDef.u_ & FLAG_WILL_RERENDER_IN_BROWSER$4)) {
        if (eventIndex === 0) {
          component.X_ = [extraArgs];
        } else {
          component.X_.push(extraArgs);
        }
      }
      return handlerMethodName + " " + componentDef.id + " " + isOnce + " " + eventIndex;
    } else {
      return handlerMethodName + " " + componentDef.id + " " + isOnce;
    }
  }
}
componentsUtil$3._R_ = nextComponentIdProvider$1;
componentsUtil$3._I_ = true;
componentsUtil$3._S_ = attachBubblingEvent$1;
componentsUtil$3._P_ = function noop() {
};
componentsUtil$3._Q_ = function noop2() {
};
var helpers$1 = {};
function insertBefore$1(node, referenceNode, parentNode) {
  if (node.insertInto) {
    return node.insertInto(parentNode, referenceNode);
  }
  return parentNode.insertBefore(
    node,
    referenceNode && referenceNode.startNode || referenceNode
  );
}
function insertAfter$1(node, referenceNode, parentNode) {
  return insertBefore$1(
    node,
    referenceNode && referenceNode.nextSibling,
    parentNode
  );
}
function nextSibling(node) {
  var next = node.nextSibling;
  var fragment = next && next.fragment;
  if (fragment) {
    return next === fragment.startNode ? fragment : null;
  }
  return next;
}
function firstChild(node) {
  var next = node.firstChild;
  return next && next.fragment || next;
}
function removeChild$1(node) {
  if (node.remove)
    node.remove();
  else
    node.parentNode.removeChild(node);
}
helpers$1.bd_ = insertBefore$1;
helpers$1.be_ = insertAfter$1;
helpers$1.ck_ = nextSibling;
helpers$1.az_ = firstChild;
helpers$1.bf_ = removeChild$1;
var extend$2 = extend$3;
var componentsUtil$2 = componentsUtil$3;
var destroyComponentForNode = componentsUtil$2._P_;
var destroyNodeRecursive = componentsUtil$2._Q_;
var helpers = helpers$1;
var insertBefore = helpers.bd_;
var insertAfter = helpers.be_;
var removeChild = helpers.bf_;
function resolveEl(el) {
  if (typeof el == "string") {
    var elId = el;
    el = document.getElementById(elId);
    if (!el) {
      throw Error("Not found: " + elId);
    }
  }
  return el;
}
function beforeRemove(referenceEl) {
  destroyNodeRecursive(referenceEl);
  destroyComponentForNode(referenceEl);
}
var domInsert$1 = function(target, getEl2, afterInsert2) {
  extend$2(target, {
    appendTo: function(referenceEl) {
      referenceEl = resolveEl(referenceEl);
      var el = getEl2(this, referenceEl);
      insertBefore(el, null, referenceEl);
      return afterInsert2(this, referenceEl);
    },
    prependTo: function(referenceEl) {
      referenceEl = resolveEl(referenceEl);
      var el = getEl2(this, referenceEl);
      insertBefore(el, referenceEl.firstChild || null, referenceEl);
      return afterInsert2(this, referenceEl);
    },
    replace: function(referenceEl) {
      referenceEl = resolveEl(referenceEl);
      var el = getEl2(this, referenceEl);
      beforeRemove(referenceEl);
      insertBefore(el, referenceEl, referenceEl.parentNode);
      removeChild(referenceEl);
      return afterInsert2(this, referenceEl);
    },
    replaceChildrenOf: function(referenceEl) {
      referenceEl = resolveEl(referenceEl);
      var el = getEl2(this, referenceEl);
      var curChild = referenceEl.firstChild;
      while (curChild) {
        var nextSibling2 = curChild.nextSibling;
        beforeRemove(curChild);
        curChild = nextSibling2;
      }
      referenceEl.innerHTML = "";
      insertBefore(el, null, referenceEl);
      return afterInsert2(this, referenceEl);
    },
    insertBefore: function(referenceEl) {
      referenceEl = resolveEl(referenceEl);
      var el = getEl2(this, referenceEl);
      insertBefore(el, referenceEl, referenceEl.parentNode);
      return afterInsert2(this, referenceEl);
    },
    insertAfter: function(referenceEl) {
      referenceEl = resolveEl(referenceEl);
      var el = getEl2(this, referenceEl);
      insertAfter(el, referenceEl, referenceEl.parentNode);
      return afterInsert2(this, referenceEl);
    }
  });
};
var domInsert = domInsert$1;
function getRootNode(el) {
  var cur = el;
  while (cur.parentNode)
    cur = cur.parentNode;
  return cur;
}
function getComponentDefs(result) {
  var componentDefs = result.b_;
  if (!componentDefs) {
    throw Error("No component");
  }
  return componentDefs;
}
function RenderResult$1(out) {
  this.out = this.r_ = out;
  this.b_ = void 0;
}
var RenderResult_1 = RenderResult$1;
var proto$1 = RenderResult$1.prototype = {
  getComponent: function() {
    return this.getComponents()[0];
  },
  getComponents: function(selector) {
    if (this.b_ === void 0) {
      throw Error("Not added to DOM");
    }
    var componentDefs = getComponentDefs(this);
    var components2 = [];
    componentDefs.forEach(function(componentDef) {
      var component = componentDef.s_;
      if (!selector || selector(component)) {
        components2.push(component);
      }
    });
    return components2;
  },
  afterInsert: function(host) {
    var out = this.r_;
    var componentsContext = out.b_;
    if (componentsContext) {
      this.b_ = componentsContext.ae_(host);
    } else {
      this.b_ = null;
    }
    return this;
  },
  getNode: function(host) {
    return this.r_.af_(host);
  },
  getOutput: function() {
    return this.r_.ag_();
  },
  toString: function() {
    return this.r_.toString();
  },
  document: typeof document === "object" && document
};
Object.defineProperty(proto$1, "html", {
  get: function() {
    return this.toString();
  }
});
Object.defineProperty(proto$1, "context", {
  get: function() {
    return this.r_;
  }
});
domInsert(
  proto$1,
  function getEl(renderResult, referenceEl) {
    return renderResult.getNode(getRootNode(referenceEl));
  },
  function afterInsert(renderResult, referenceEl) {
    return renderResult.afterInsert(getRootNode(referenceEl));
  }
);
var parseHTML$1 = function(html) {
  var container = document.createElement("template");
  parseHTML$1 = container.content ? function(html2) {
    container.innerHTML = html2;
    return container.content;
  } : function(html2) {
    container.innerHTML = html2;
    return container;
  };
  return parseHTML$1(html);
};
var parseHtml = function(html) {
  return parseHTML$1(html).firstChild;
};
var indexWorker = {};
var promise;
var queueMicrotask_1 = typeof queueMicrotask === "function" ? queueMicrotask : (promise = Promise.resolve(), function(cb) {
  promise.then(cb);
});
var queueMicrotask$1 = queueMicrotask_1;
var count = 0;
var queue = /* @__PURE__ */ new Set();
function noop$2() {
}
indexWorker._i_ = function setImmediate(cb) {
  queue.add(cb);
  if (!count) {
    queueMicrotaskInternal(noop$2);
  }
  return cb;
};
indexWorker.ad_ = function clearImmediate(id) {
  queue.delete(id);
};
indexWorker.e_ = queueMicrotaskInternal;
function queueMicrotaskInternal(cb) {
  count++;
  queueMicrotask$1(function() {
    if (--count === 0 && queue.size) {
      for (const fn of queue) {
        queueMicrotask$1(fn);
      }
      queue = /* @__PURE__ */ new Set();
    }
    cb();
  });
}
var escapeQuotes = {};
escapeQuotes.d = function(value) {
  return escapeDoubleQuotes$4(value + "", 0);
};
escapeQuotes.n_ = escapeDoubleQuotes$4;
escapeQuotes.bv_ = escapeSingleQuotes$2;
function escapeSingleQuotes$2(value, startPos) {
  return escapeQuote(value, startPos, "'", "&#39;");
}
function escapeDoubleQuotes$4(value, startPos) {
  return escapeQuote(value, startPos, '"', "&#34;");
}
function escapeQuote(str, startPos, quote, escaped) {
  var result = "";
  var lastPos = 0;
  for (var i = startPos, len = str.length; i < len; i++) {
    if (str[i] === quote) {
      result += str.slice(lastPos, i) + escaped;
      lastPos = i + 1;
    }
  }
  if (lastPos) {
    return result + str.slice(lastPos);
  }
  return str;
}
var escapeDoubleQuotes$3 = escapeQuotes.n_;
function StringWriter$2() {
  this._content = "";
  this._scripts = "";
  this._data = null;
}
StringWriter$2.prototype = {
  write: function(str) {
    this._content += str;
  },
  script: function(str) {
    if (str) {
      this._scripts += (this._scripts ? ";" : "") + str;
    }
  },
  get: function(key) {
    const extra = this._data = this._data || {};
    return extra[key] = extra[key] || [];
  },
  merge: function(otherWriter) {
    this._content += otherWriter._content;
    if (otherWriter._scripts) {
      this._scripts = this._scripts ? this._scripts + ";" + otherWriter._scripts : otherWriter._scripts;
    }
    if (otherWriter._data) {
      if (this._data) {
        for (const key in otherWriter._data) {
          if (this._data[key]) {
            this._data[key].push.apply(this._data[key], otherWriter._data[key]);
          } else {
            this._data[key] = this._writer[key];
          }
        }
      } else {
        this._data = otherWriter._data;
      }
    }
  },
  clear: function() {
    this._content = "";
    this._scripts = "";
    this._data = null;
  },
  toString: function() {
    this.state.events.emit("c_", this);
    let str = this._content;
    if (this._scripts) {
      const outGlobal = this.state.root.global;
      const cspNonce = outGlobal.cspNonce;
      const nonceAttr = cspNonce ? ' nonce="' + escapeDoubleQuotes$3(cspNonce) + '"' : "";
      str += `<script${nonceAttr}>${this._scripts}<\/script>`;
    }
    return str;
  }
};
var StringWriter_1 = StringWriter$2;
var immediate = indexWorker;
var setImmediate$1 = immediate._i_;
var clearImmediate2 = immediate.ad_;
var StringWriter$1 = StringWriter_1;
function BufferedWriter$2(wrappedStream) {
  StringWriter$1.call(this);
  this._wrapped = wrappedStream;
  this._scheduled = null;
}
BufferedWriter$2.prototype = Object.assign(
  {
    scheduleFlush() {
      if (!this._scheduled) {
        this._scheduled = setImmediate$1(flush.bind(0, this));
      }
    },
    end: function() {
      flush(this);
      if (!this._wrapped.isTTY) {
        this._wrapped.end();
      }
    }
  },
  StringWriter$1.prototype
);
function flush(writer) {
  const contents = writer.toString();
  if (contents.length !== 0) {
    writer._wrapped.write(contents);
    writer.clear();
    if (writer._wrapped.flush) {
      writer._wrapped.flush();
    }
  }
  clearImmediate2(writer._scheduled);
  writer._scheduled = null;
}
var BufferedWriter_1 = BufferedWriter$2;
var escapeQuoteHelpers$1 = escapeQuotes;
var escapeDoubleQuotes$2 = escapeQuoteHelpers$1.n_;
var escapeSingleQuotes$1 = escapeQuoteHelpers$1.bv_;
var attr$2 = maybeEmptyAttr;
maybeEmptyAttr.bt_ = notEmptyAttr$1;
maybeEmptyAttr.bu_ = isEmpty;
function maybeEmptyAttr(name, value) {
  if (isEmpty(value)) {
    return "";
  }
  return notEmptyAttr$1(name, value);
}
function notEmptyAttr$1(name, value) {
  switch (typeof value) {
    case "string":
      return " " + name + guessQuotes(value);
    case "boolean":
      return " " + name;
    case "number":
      return " " + name + "=" + value;
    case "object":
      switch (value.toString) {
        case Object.prototype.toString:
        case Array.prototype.toString:
          return " " + name + singleQuote(JSON.stringify(value), 2);
        case RegExp.prototype.toString:
          return " " + name + guessQuotes(value.source);
      }
  }
  return " " + name + guessQuotes(value + "");
}
function isEmpty(value) {
  return value == null || value === false;
}
function doubleQuote(value, startPos) {
  return '="' + escapeDoubleQuotes$2(value, startPos) + '"';
}
function singleQuote(value, startPos) {
  return "='" + escapeSingleQuotes$1(value, startPos) + "'";
}
function guessQuotes(value) {
  for (var i = 0, len = value.length; i < len; i++) {
    switch (value[i]) {
      case '"':
        return singleQuote(value, i + 1);
      case "'":
      case ">":
      case " ":
      case "	":
      case "\n":
      case "\r":
      case "\f":
        return doubleQuote(value, i + 1);
    }
  }
  return value && "=" + (value[len - 1] === "/" ? value + " " : value);
}
var _marko_attr = /* @__PURE__ */ getDefaultExportFromCjs(attr$2);
var classValue = function classHelper(arg) {
  switch (typeof arg) {
    case "string":
      return arg || void 0;
    case "object":
      var result = "";
      var sep = "";
      if (Array.isArray(arg)) {
        for (var i = 0, len = arg.length; i < len; i++) {
          var value = classHelper(arg[i]);
          if (value) {
            result += sep + value;
            sep = " ";
          }
        }
      } else {
        for (var key in arg) {
          if (arg[key]) {
            result += sep + key;
            sep = " ";
          }
        }
      }
      return result || void 0;
  }
};
var classHelper$1 = classValue;
var attr$1 = attr$2;
var classAttr = function classAttr2(value) {
  return attr$1("class", classHelper$1(value));
};
var _changeCase = {};
var camelToDashLookup = /* @__PURE__ */ Object.create(null);
var dashToCamelLookup = /* @__PURE__ */ Object.create(null);
_changeCase.bg_ = function camelToDashCase(name) {
  var nameDashed = camelToDashLookup[name];
  if (!nameDashed) {
    nameDashed = camelToDashLookup[name] = name.replace(/([A-Z])/g, "-$1").toLowerCase();
    if (nameDashed !== name) {
      dashToCamelLookup[nameDashed] = name;
    }
  }
  return nameDashed;
};
_changeCase.bh_ = function dashToCamelCase(name) {
  var nameCamel = dashToCamelLookup[name];
  if (!nameCamel) {
    nameCamel = dashToCamelLookup[name] = name.replace(
      /-([a-z])/g,
      matchToUpperCase
    );
    if (nameCamel !== name) {
      camelToDashLookup[nameCamel] = name;
    }
  }
  return nameCamel;
};
function matchToUpperCase(_, char) {
  return char.toUpperCase();
}
var changeCase$1 = _changeCase;
var styleValue = function styleHelper(style) {
  if (!style) {
    return;
  }
  var type = typeof style;
  if (type !== "string") {
    var styles = "";
    var sep = "";
    if (Array.isArray(style)) {
      for (var i = 0, len = style.length; i < len; i++) {
        var next = styleHelper(style[i]);
        if (next) {
          styles += sep + next;
          sep = ";";
        }
      }
    } else if (type === "object") {
      for (var name in style) {
        var value = style[name];
        if (value != null && value !== false) {
          if (typeof value === "number" && value) {
            value += "px";
          }
          styles += sep + changeCase$1.bg_(name) + ":" + value;
          sep = ";";
        }
      }
    }
    return styles || void 0;
  }
  return style;
};
var _marko_style_merge = /* @__PURE__ */ getDefaultExportFromCjs(styleValue);
var styleHelper$1 = styleValue;
var attr = attr$2;
var styleAttr = function styleAttr2(value) {
  return attr("style", styleHelper$1(value));
};
var attrHelper = attr$2;
var notEmptyAttr = attrHelper.bt_;
var isEmptyAttrValue = attrHelper.bu_;
var classHelper2 = classAttr;
var styleHelper2 = styleAttr;
var _dynamicAttr = function dynamicAttr(name, value) {
  switch (name) {
    case "class":
      return classHelper2(value);
    case "style":
      return styleHelper2(value);
    case "renderBody":
      return "";
    default:
      return isEmptyAttrValue(value) || isInvalidAttrName(name) ? "" : notEmptyAttr(name, value);
  }
};
function isInvalidAttrName(name) {
  for (let i = name.length; i--; ) {
    if (name[i] === ">") {
      return true;
    }
  }
  return false;
}
var dynamicAttrHelper = _dynamicAttr;
var attrs = function attrs2(arg) {
  switch (typeof arg) {
    case "object":
      var result = "";
      for (var attrName in arg) {
        result += dynamicAttrHelper(attrName, arg[attrName]);
      }
      return result;
    case "string":
      return arg;
    default:
      return "";
  }
};
var escapeQuoteHelpers = escapeQuotes;
var escapeSingleQuotes = escapeQuoteHelpers.bv_;
var escapeDoubleQuotes$1 = escapeQuoteHelpers.n_;
var FLAG_WILL_RERENDER_IN_BROWSER$3 = 1;
var dataMarko = function dataMarko2(out, componentDef, props, key) {
  var result = "";
  var willNotRerender = out.b_.v_ || componentDef.t_ && (componentDef.u_ & FLAG_WILL_RERENDER_IN_BROWSER$3) === 0;
  if (willNotRerender) {
    if (props) {
      for (var _ in props) {
        result += " data-marko='" + escapeSingleQuotes(JSON.stringify(props)) + "'";
        break;
      }
    }
    if (key) {
      result += ' data-marko-key="' + escapeDoubleQuotes$1(
        componentDef.aL_(key) + " " + componentDef.id
      ) + '"';
    }
  }
  return result;
};
var escapeXml = {};
var unsafeCharsRegExp = /[<&]/g;
var replaceMatch = (c) => c === "&" ? "&amp;" : "&lt;";
var escape = (str) => unsafeCharsRegExp.test(str) ? str.replace(unsafeCharsRegExp, replaceMatch) : str;
var x = escapeXml.x = function(value) {
  if (value == null) {
    return "";
  }
  if (value.toHTML) {
    return value.toHTML();
  }
  return escape(value + "");
};
escapeXml.bo_ = escape;
var EventEmitter = src$1;
var selfClosingTags = selfClosingTagsExports;
var RenderResult = RenderResult_1;
var parseHTML = parseHtml;
var BufferedWriter$1 = BufferedWriter_1;
var attrsHelper = attrs;
var markoAttr = dataMarko;
var escapeXmlHelper = escapeXml;
var StringWriter = StringWriter_1;
var escapeXmlOrNullish = escapeXmlHelper.x;
var escapeXmlString = escapeXmlHelper.bo_;
var missingSetTimeout = typeof setTimeout !== "function";
function noop$1() {
}
var voidWriter = {
  write: noop$1,
  script: noop$1,
  merge: noop$1,
  clear: noop$1,
  get: function() {
    return [];
  },
  toString: function() {
    return "";
  }
};
function State(root, stream, writer, events) {
  this.root = root;
  this.stream = stream;
  this.writer = writer;
  this.events = events;
  this.finished = false;
}
function escapeEndingComment(text) {
  return text.replace(/(--!?)>/g, "$1&gt;");
}
function deferred() {
  let resolve2;
  let reject;
  const promise2 = new Promise((res, rej) => {
    resolve2 = res;
    reject = rej;
  });
  return { promise: promise2, resolve: resolve2, reject };
}
function AsyncStream$1(global2, writer, parentOut) {
  if (parentOut === null) {
    throw new Error("illegal state");
  }
  var finalGlobal = this.attributes = global2 || {};
  var originalStream;
  var state;
  if (parentOut) {
    state = parentOut._state;
    originalStream = state.stream;
  } else {
    var events = finalGlobal.events = writer && writer.on ? writer : new EventEmitter();
    if (writer) {
      originalStream = writer;
      writer = new BufferedWriter$1(writer);
    } else {
      writer = originalStream = new StringWriter();
    }
    state = new State(this, originalStream, writer, events);
    writer.state = state;
  }
  finalGlobal.runtimeId = finalGlobal.runtimeId || "M";
  this.global = finalGlobal;
  this.stream = originalStream;
  this._state = state;
  this._ended = false;
  this._remaining = 1;
  this._lastCount = 0;
  this._last = void 0;
  this._parentOut = parentOut;
  this.data = {};
  this.writer = writer;
  writer.stream = this;
  this._sync = false;
  this._stack = void 0;
  this.name = void 0;
  this._timeoutId = void 0;
  this._node = void 0;
  this._elStack = void 0;
  this.b_ = null;
  this._Z_ = null;
  this.a__ = null;
  this.ba_ = null;
  this.bp_ = false;
}
AsyncStream$1.DEFAULT_TIMEOUT = 1e4;
AsyncStream$1.INCLUDE_STACK = typeof process !== "undefined" && false;
AsyncStream$1.enableAsyncStackTrace = function() {
  AsyncStream$1.INCLUDE_STACK = true;
};
var proto = AsyncStream$1.prototype = {
  constructor: AsyncStream$1,
  B_: typeof document === "object" && document,
  bq_: true,
  [Symbol.asyncIterator]() {
    if (this.br_) {
      return this.br_;
    }
    const originalWriter = this._state.writer;
    let buffer = "";
    let iteratorNextFn;
    if (!originalWriter.stream) {
      buffer = this.toString();
      iteratorNextFn = () => {
        const value = buffer;
        buffer = "";
        return { value, done: !value };
      };
    } else {
      let done = false;
      let pending = deferred();
      const stream = {
        write(data) {
          buffer += data;
        },
        end() {
          done = true;
          pending.resolve({
            value: "",
            done
          });
        },
        flush() {
          pending.resolve({
            value: buffer,
            done: false
          });
          buffer = "";
          pending = deferred();
        }
      };
      this.on("error", pending.reject);
      const writer = new BufferedWriter$1(stream);
      writer.stream = originalWriter.stream;
      writer.stream.writer = writer;
      writer.next = originalWriter.next;
      writer.state = this._state;
      writer.merge(originalWriter);
      this._state.stream = stream;
      this._state.writer = writer;
      iteratorNextFn = async () => {
        if (buffer || done) {
          const value = buffer;
          buffer = "";
          return { value, done };
        }
        return pending.promise;
      };
    }
    return this.br_ = {
      next: iteratorNextFn,
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  },
  sync: function() {
    this._sync = true;
  },
  isSync: function() {
    return this._sync === true;
  },
  write: function(str) {
    if (str != null) {
      this.writer.write(str.toString());
    }
    return this;
  },
  script: function(str) {
    if (str != null) {
      this.writer.script(str.toString());
    }
    return this;
  },
  ag_: function() {
    return this._state.writer.toString();
  },
  /**
   * Legacy...
   */
  getOutput: function() {
    return this.ag_();
  },
  toString: function() {
    return this._state.writer.toString();
  },
  bs_: function() {
    this._result = this._result || new RenderResult(this);
    return this._result;
  },
  beginAsync: function(options) {
    if (this._sync) {
      throw new Error("beginAsync() not allowed when using renderSync()");
    }
    var state = this._state;
    var currentWriter = this.writer;
    var newWriter = new StringWriter();
    var newStream = new AsyncStream$1(this.global, currentWriter, this);
    newWriter.state = state;
    this.writer = newWriter;
    newWriter.stream = this;
    newWriter.next = currentWriter.next;
    currentWriter.next = newWriter;
    var timeout;
    var name;
    this._remaining++;
    if (options != null) {
      if (typeof options === "number") {
        timeout = options;
      } else {
        timeout = options.timeout;
        if (options.last === true) {
          if (timeout == null) {
            timeout = 0;
          }
          this._lastCount++;
          newStream.bp_ = true;
        }
        name = options.name;
      }
    }
    if (missingSetTimeout) {
      timeout = 0;
    } else if (timeout == null) {
      timeout = AsyncStream$1.DEFAULT_TIMEOUT;
    }
    newStream._stack = AsyncStream$1.INCLUDE_STACK ? new Error() : null;
    newStream.name = name;
    if (timeout > 0) {
      newStream._timeoutId = setTimeout(function() {
        newStream.error(
          new Error(
            "Async fragment " + (name ? "(" + name + ") " : "") + "timed out after " + timeout + "ms"
          )
        );
      }, timeout);
    }
    state.events.emit("beginAsync", {
      out: newStream,
      parentOut: this
    });
    return newStream;
  },
  _doFinish: function() {
    var state = this._state;
    state.finished = true;
    if (state.writer.end) {
      state.writer.end();
    }
    if (state.events !== state.stream) {
      state.events.emit("finish", this.bs_());
    }
  },
  end: function(data) {
    if (this._ended === true) {
      return;
    }
    this._ended = true;
    var remaining = --this._remaining;
    if (data != null) {
      this.write(data);
    }
    var currentWriter = this.writer;
    this.writer = voidWriter;
    currentWriter.stream = null;
    this._flushNext(currentWriter);
    var parentOut = this._parentOut;
    if (parentOut === void 0) {
      if (remaining === 0) {
        this._doFinish();
      } else if (remaining - this._lastCount === 0) {
        this._emitLast();
      }
    } else {
      var timeoutId = this._timeoutId;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (remaining === 0) {
        parentOut._handleChildDone(this);
      } else if (remaining - this._lastCount === 0) {
        this._emitLast();
      }
    }
    return this;
  },
  _handleChildDone: function(childOut) {
    var remaining = --this._remaining;
    if (remaining === 0) {
      var parentOut = this._parentOut;
      if (parentOut === void 0) {
        this._doFinish();
      } else {
        parentOut._handleChildDone(this);
      }
    } else {
      if (childOut.bp_) {
        this._lastCount--;
      }
      if (remaining - this._lastCount === 0) {
        this._emitLast();
      }
    }
  },
  _flushNext: function(currentWriter) {
    var nextWriter = currentWriter.next;
    if (nextWriter) {
      currentWriter.merge(nextWriter);
      currentWriter.next = nextWriter.next;
      var nextStream = nextWriter.stream;
      if (nextStream) {
        nextStream.writer = currentWriter;
        currentWriter.stream = nextStream;
      }
    }
  },
  on: function(event, callback) {
    var state = this._state;
    if (event === "finish" && state.finished === true) {
      callback(this.bs_());
    } else if (event === "last") {
      this.onLast(callback);
    } else {
      state.events.on(event, callback);
    }
    return this;
  },
  once: function(event, callback) {
    var state = this._state;
    if (event === "finish" && state.finished === true) {
      callback(this.bs_());
    } else if (event === "last") {
      this.onLast(callback);
    } else {
      state.events.once(event, callback);
    }
    return this;
  },
  onLast: function(callback) {
    var lastArray = this._last;
    if (lastArray === void 0) {
      this._last = [callback];
    } else {
      lastArray.push(callback);
    }
    return this;
  },
  _emitLast: function() {
    if (this._last) {
      var i = 0;
      var lastArray = this._last;
      this._last = void 0;
      (function next() {
        if (i === lastArray.length) {
          return;
        }
        var lastCallback = lastArray[i++];
        lastCallback(next);
        if (lastCallback.length === 0) {
          next();
        }
      })();
    }
  },
  emit: function(type, arg) {
    var events = this._state.events;
    switch (arguments.length) {
      case 1:
        events.emit(type);
        break;
      case 2:
        events.emit(type, arg);
        break;
      default:
        events.emit.apply(events, arguments);
        break;
    }
    return this;
  },
  removeListener: function() {
    var events = this._state.events;
    events.removeListener.apply(events, arguments);
    return this;
  },
  prependListener: function() {
    var events = this._state.events;
    events.prependListener.apply(events, arguments);
    return this;
  },
  pipe: function(stream) {
    this._state.stream.pipe(stream);
    return this;
  },
  error: function(e) {
    var name = this.name;
    var stack = this._stack;
    if (stack)
      stack = getNonMarkoStack(stack);
    if (!(e instanceof Error)) {
      e = new Error(JSON.stringify(e));
    }
    if (name || stack) {
      e.message += "\nRendered by" + (name ? " " + name : "") + (stack ? ":\n" + stack : "");
    }
    try {
      this.emit("error", e);
    } finally {
      this.end();
    }
    return this;
  },
  flush: function() {
    var state = this._state;
    if (!state.finished) {
      var writer = state.writer;
      if (writer && writer.scheduleFlush) {
        writer.scheduleFlush();
      }
    }
    return this;
  },
  createOut: function() {
    var newOut = new AsyncStream$1(this.global);
    newOut.on("error", this.emit.bind(this, "error"));
    this._state.events.emit("beginDetachedAsync", {
      out: newOut,
      parentOut: this
    });
    return newOut;
  },
  bk_: function(tagName, elementAttrs, key, componentDef, props) {
    var str = "<" + tagName + markoAttr(
      this,
      componentDef,
      props,
      key && key[0] === "@" ? key : void 0
    ) + attrsHelper(elementAttrs);
    if (selfClosingTags.voidElements.indexOf(tagName) !== -1) {
      str += ">";
    } else if (selfClosingTags.svgElements.indexOf(tagName) !== -1) {
      str += "/>";
    } else {
      str += "></" + tagName + ">";
    }
    this.write(str);
  },
  element: function(tagName, elementAttrs, openTagOnly) {
    var str = "<" + tagName + attrsHelper(elementAttrs) + ">";
    if (openTagOnly !== true) {
      str += "</" + tagName + ">";
    }
    this.write(str);
  },
  bi_: function(name, elementAttrs, key, componentDef, props) {
    var str = "<" + name + markoAttr(this, componentDef, props, key) + attrsHelper(elementAttrs) + ">";
    this.write(str);
    if (this._elStack) {
      this._elStack.push(name);
    } else {
      this._elStack = [name];
    }
  },
  beginElement: function(name, elementAttrs) {
    var str = "<" + name + attrsHelper(elementAttrs) + ">";
    this.write(str);
    if (this._elStack) {
      this._elStack.push(name);
    } else {
      this._elStack = [name];
    }
  },
  endElement: function() {
    var tagName = this._elStack.pop();
    this.write("</" + tagName + ">");
  },
  comment: function(str) {
    this.write("<!--" + escapeEndingComment(str) + "-->");
  },
  text: function(str) {
    this.write(escapeXmlOrNullish(str));
  },
  bf: function(key, component, preserve) {
    if (preserve) {
      this.write("<!--F#" + escapeXmlString(key) + "-->");
    }
    if (this._elStack) {
      this._elStack.push(preserve);
    } else {
      this._elStack = [preserve];
    }
  },
  ef: function() {
    var preserve = this._elStack.pop();
    if (preserve) {
      this.write("<!--F/-->");
    }
  },
  af_: function(host) {
    var node = this._node;
    if (!node) {
      var nextEl;
      var fragment;
      var html = this.ag_();
      if (!host)
        host = this.B_;
      var doc = host.ownerDocument || host;
      if (html) {
        node = parseHTML(html);
        if (node && node.nextSibling) {
          fragment = doc.createDocumentFragment();
          do {
            nextEl = node.nextSibling;
            fragment.appendChild(node);
          } while (node = nextEl);
          node = fragment;
        }
      }
      this._node = node || doc.createDocumentFragment();
    }
    return node;
  },
  then: function(fn, fnErr) {
    var out = this;
    return new Promise(function(resolve2, reject) {
      out.on("error", reject);
      out.on("finish", function(result) {
        resolve2(result);
      });
    }).then(fn, fnErr);
  },
  catch: function(fnErr) {
    return this.then(void 0, fnErr);
  },
  finally: function(fn) {
    return this.then(void 0, void 0).finally(fn);
  },
  c: function(componentDef, key, customEvents) {
    this._Z_ = componentDef;
    this.a__ = key;
    this.ba_ = customEvents;
  }
};
proto.w = proto.write;
proto.bj_ = proto.endElement;
var AsyncStream_1 = AsyncStream$1;
function getNonMarkoStack(error) {
  return error.stack.toString().split("\n").slice(1).filter((line) => !/\/node_modules\/marko\//.test(line)).join("\n");
}
var actualCreateOut;
function setCreateOut(createOutFunc) {
  actualCreateOut = createOutFunc;
}
function createOut(globalData) {
  return actualCreateOut(globalData);
}
createOut.bc_ = setCreateOut;
var createOut_1 = createOut;
var extend$1 = extend$3;
var setImmediate2 = indexWorker._i_;
var defaultCreateOut = createOut_1;
function safeRender(renderFunc, finalData, finalOut, shouldEnd) {
  try {
    renderFunc(finalData, finalOut);
    if (shouldEnd) {
      finalOut.end();
    }
  } catch (err) {
    var actualEnd = finalOut.end;
    finalOut.end = function() {
    };
    setImmediate2(function() {
      finalOut.end = actualEnd;
      finalOut.error(err);
    });
  }
  return finalOut;
}
var renderable = function(target, renderer2) {
  var renderFunc = renderer2 && (renderer2.renderer || renderer2.render || renderer2);
  var createOut3 = target.createOut || renderer2.createOut || defaultCreateOut;
  return extend$1(target, {
    _: renderFunc,
    createOut: createOut3,
    renderToString: function(data, callback) {
      var localData = data || {};
      var render3 = renderFunc || this._;
      var globalData = localData.$global;
      var out = createOut3(globalData);
      out.global.template = this;
      if (globalData) {
        localData.$global = void 0;
      }
      if (callback) {
        out.on("finish", function() {
          callback(null, out.toString(), out);
        }).once("error", callback);
        return safeRender(render3, localData, out, true);
      } else {
        out.sync();
        render3(localData, out);
        return out.toString();
      }
    },
    renderSync: function(data) {
      var localData = data || {};
      var render3 = renderFunc || this._;
      var globalData = localData.$global;
      var out = createOut3(globalData);
      out.sync();
      out.global.template = this;
      if (globalData) {
        localData.$global = void 0;
      }
      render3(localData, out);
      return out.bs_();
    },
    /**
     * Renders a template to nodes and inserts them into the DOM relative
     * to the provided reference based on the optional position parameter.
     *
     * Supported signatures:
     *
     * mount(data, reference)
     * mount(data, reference, position)
     *
     * @param  {Object} data The view model data for the template
     * @param  {Node} reference DOM node to insert the rendered node(s) relative to
     * @param  {string} [position] A string representing the position relative to the `reference`; must match (case-insensitively) one of the following strings:
     *  'beforebegin': Before the targetElement itself.
     *  'afterbegin': Just inside the targetElement, before its first child.
     *  'beforeend': Just inside the targetElement, after its last child.
     *  'afterend': After the targetElement itself.
     * @return {TemplateInstance} Object with `update` and `dispose` methods
     */
    mount: function(data, reference, position) {
      const result = this.renderSync(data);
      switch (position) {
        case "afterbegin":
          result.prependTo(reference);
          break;
        case "afterend":
          result.insertAfter(reference);
          break;
        case "beforebegin":
          result.insertBefore(reference);
          break;
        default:
          result.appendTo(reference);
          break;
      }
      const component = result.getComponent();
      return {
        update(input) {
          component.input = input;
          component.update();
        },
        destroy() {
          component.destroy();
        }
      };
    },
    /**
     * Renders a template to either a stream (if the last
     * argument is a Stream instance) or
     * provides the output to a callback function (if the last
     * argument is a Function).
     *
     * Supported signatures:
     *
     * render(data)
     * render(data, out)
     * render(data, stream)
     * render(data, callback)
     *
     * @param  {Object} data The view model data for the template
     * @param  {AsyncStream/AsyncVDOMBuilder} out A Stream, an AsyncStream/AsyncVDOMBuilder instance, or a callback function
     * @return {AsyncStream/AsyncVDOMBuilder} Returns the AsyncStream/AsyncVDOMBuilder instance that the template is rendered to
     */
    render: function(data, out) {
      var callback;
      var finalOut;
      var finalData;
      var globalData;
      var render3 = renderFunc || this._;
      var shouldBuffer = this._U_;
      var shouldEnd = true;
      if (data) {
        finalData = data;
        if (globalData = data.$global) {
          finalData.$global = void 0;
        }
      } else {
        finalData = {};
      }
      if (out && out.bq_) {
        finalOut = out;
        shouldEnd = false;
        extend$1(out.global, globalData);
      } else if (typeof out == "function") {
        finalOut = createOut3(globalData);
        callback = out;
      } else {
        finalOut = createOut3(
          globalData,
          // global
          out,
          // writer(AsyncStream) or parentNode(AsyncVDOMBuilder)
          void 0,
          // parentOut
          shouldBuffer
          // ignored by AsyncVDOMBuilder
        );
      }
      if (callback) {
        finalOut.on("finish", function() {
          callback(null, finalOut.bs_(), finalOut);
        }).once("error", callback);
      }
      globalData = finalOut.global;
      globalData.template = globalData.template || this;
      return safeRender(render3, finalData, finalOut, shouldEnd);
    }
  });
};
globalThis.Marko = {
  Component: function() {
  }
};
var t = function createTemplate(typeName) {
  return new Template(typeName);
};
function Template(typeName) {
  this.path = this.R_ = typeName;
}
Template.prototype.stream = indexBrowser;
var AsyncStream = AsyncStream_1;
createOut_1.bc_(
  Template.prototype.createOut = function createOut2(globalData, writer, parentOut, buffer) {
    return new AsyncStream(globalData, writer, parentOut);
  }
);
renderable(Template.prototype);
var _asset$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABiZJREFUWMPtlmuMXVUVx3/7cc69d+bO9N559DGlj6lTqZSmtYJatEnHKKAxMRIoCVGrxbYUyFCCiCbGGD+oIaGZ0sEURII8wkBEDBbpk0psoJa0tqU0CFRKsKXtvOc+zj33nH2WH3rvMGiaxsT4xf6Tk+ysc85a//9ae6294SIu4v8d6r/tsLDsYRCHMs0gjuwr3/jPCGzYvZ8DJ08u755/6Zeb0mlEAEhQ8oxS6sjdS+YB8PPHPkMUqzkrl418q7MtzCSiBNDGJNv/segH+83MsZuBDiABFMLzSql9s1+75/wEOh7oxyWSt7j+z3fOvrqrNY8IKJOQ6Pg3hbi43iob2MN3oX2n4sC/99PzSt/rvrSAUpDSCY02fs2VvJtOr1z1XUx8T10BJC9C9E1QQ3MO3DsR09QXXb/ehpOYhlTjbcr4awqR076NCKVMSRUIkvLHw6T6piBvNBdfwhp9tbbyk5HAZJttTINyZFWEdclMbaJC4fm5DxIFV0F5JgRAZR6EJ33j71/X3sXmM4cBsHUCueY2tGpbXI2ra0XEguJkEEizHURFTgENgtwZJG5fV+PwSDnJbbDCNBE4NpKWuamypFWka3rXdjzSv+Pk9V/ZhBc9DJI5J1Z6wnhob0qrQx/JwPW732dqNudrbX/akGr4UjbdSDadRZv0b0c5dqboip1lF1B2wSVlF4wtsG8tMJZbjIexPgToA0vTY680JvFCIgEnjRKSk/axvupf03MgWAQVoNKqCLXI8M4N0+e53jMnsKv/9D7ONmCN/ppnvRtE6jtD3kuS/C/eHR9oT0QWi9AKkNHRreOZKdU2Pe7V1IaJqE0zkvLeKNDzgSU1cV/NXvHBC4UtrRtVqvpZRDoBBG4Ct00p/dybl1+Ozmen0J72pmWt6cn5fnM+5ZNP+ZLzU1tymcGDw+WBXaW4/FTZlSm7Mm16oL2oMjPxPIxnMZ591vrq9+9Wsyckkj6JJJRIkEg8VeXOGVuOliWuPCRURKggVLJCtCGRsCOlDfov5UYajFrTZPhck4UmC1nDnpTm0UY9A89vdMD9gjoyyyuyKD2EUZogyQDmFJg+hVfsSEoIPI3iBVQti4qFSrPOzqo+Brz8oZnlGll1KD0XfVVDcZkTWT2pJStW8UDaqNMtwSCSOBakx95u1NGmT2YGj87wykdbTHhUK30swd5nifYlokl/YRgCXZRIbUrGzNlkxJCMGJIBs6pt9cBllchuHsMPRvEZxVdDpG+ZGg4stycCKVZFShPtCsZB1ipFsdLA2es2snLPdXR5o48vSI38QStRAIkoBDteoUnuXr4TgNLWJoBmNN6kCVPxPFfaZmdfYpUzdbOCkkFKNsC87hK3BeittaUH9FRF9vp+5u8Afd2/A4iAgfON1NEfzwIVt0qoNpCQn5h0orZs3b7gdE6FfSL4NXPsUJtbVHxQO+cAngB2TPL3KWBNtTyqr9l5lgth5P7p2EShm5LvmBa3wrQ5TJvDtLhXJSOPNki8Lke4NE9InpAc4YtZov5IBPvHFTmu3TE4prTuTZy7ApGpNb83a0nvlEheuhCB9BQhyYVLTKTWipybLQrKSrHx8H2d8/K2+u0PK8ygQ/VqGOk+8mc0QFQoE5VKu+NC8GQ0HlB72qNi0FMdLuRXPHn8vMFL21pxMyNfT3E9uiWeb1pjTGuManH9Q7um7M3Zyl05wml5QloIyVF9JBJ5OS3V+l44hxVPHEeS5GNJ7J5BZGm9VpLI7TaTerAyNMa+O5Z+JPhbTzfT2e7hkBuV8CuEpprX98STr59aP2cZht7avgI46FA3KuSdriOHgElnQfnUMNo3x5XWv5Qk6UMkXXt/R3W0tFfBG/+qfvZUSyzSoaEHRVNNjmDoO3XrnIoyctuk4KGCXq14x4ib8KHri/3fvxJXqeKC8KmoEGytniuDROPBJ+JSZX0wOOot+dGeiR8LO/Oku4fRsBZYNonXruoHtl8puR24DKiX/1mB50SEWUden/j43y4ki3+4G6X0QpArQdVPhnFgO1A69LPucxnbnQeUZxRfBKZTv3hoDpy4ofNtf0Z8LZCrEVAKXkWpv809fOiCXXURF3ER/1P8E+oo2XFV0bPuAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA4LTI2VDE2OjM2OjAyKzAwOjAwgXV1bQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wOC0yNlQxNjozNjowMiswMDowMPAozdEAAABGdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuNy44LTkgMjAxNC0wNS0xMiBRMTYgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfchu0AAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OmhlaWdodAAxOTIPAHKFAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADE5MtOsIQgAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0MDYwNjk2MuwEGPsAAAAPdEVYdFRodW1iOjpTaXplADBCQpSiPuwAAABWdEVYdFRodW1iOjpVUkkAZmlsZTovLy9tbnRsb2cvZmF2aWNvbnMvMjAxNS0wOC0yNi9kYWI1YTMzYmM4MDI5OWQ2YmFhNmQ1NGIyZmI5MTEwMy5pY28ucG5nBTJ6eQAAAABJRU5ErkJggg==";
var toString = function(value) {
  return value == null ? "" : value + "";
};
var _marko_to_string = /* @__PURE__ */ getDefaultExportFromCjs(toString);
var constants$4 = {};
var win = typeof window !== "undefined" ? window : commonjsGlobal;
constants$4.NOOP = win.$W10NOOP = win.$W10NOOP || function() {
};
var constants$3 = constants$4;
var eventDelegation = {};
var componentsUtil$1 = componentsUtil$3;
var runtimeId = componentsUtil$1._O_;
var componentLookup$1 = componentsUtil$1._k_;
var getMarkoPropsFromEl = componentsUtil$1._q_;
var TEXT_NODE = 3;
var listenersAttachedKey = "$MDE" + runtimeId;
var delegatedEvents = {};
function getEventFromEl(el, eventName) {
  var virtualProps = getMarkoPropsFromEl(el);
  var eventInfo = virtualProps[eventName];
  if (typeof eventInfo === "string") {
    eventInfo = eventInfo.split(" ");
    if (eventInfo[2]) {
      eventInfo[2] = eventInfo[2] === "true";
    }
    if (eventInfo.length == 4) {
      eventInfo[3] = parseInt(eventInfo[3], 10);
    }
  }
  return eventInfo;
}
function delegateEvent(node, eventName, target, event) {
  var targetMethod = target[0];
  var targetComponentId = target[1];
  var isOnce = target[2];
  var extraArgs = target[3];
  if (isOnce) {
    var virtualProps = getMarkoPropsFromEl(node);
    delete virtualProps[eventName];
  }
  var targetComponent = componentLookup$1[targetComponentId];
  if (!targetComponent) {
    return;
  }
  var targetFunc = typeof targetMethod === "function" ? targetMethod : targetComponent[targetMethod];
  if (!targetFunc) {
    throw Error("Method not found: " + targetMethod);
  }
  if (extraArgs != null) {
    if (typeof extraArgs === "number") {
      extraArgs = targetComponent.X_[extraArgs];
    }
  }
  if (extraArgs) {
    targetFunc.apply(targetComponent, extraArgs.concat(event, node));
  } else {
    targetFunc.call(targetComponent, event, node);
  }
}
function addDelegatedEventHandler$1(eventType) {
  if (!delegatedEvents[eventType]) {
    delegatedEvents[eventType] = true;
  }
}
function addDelegatedEventHandlerToHost(eventType, host) {
  var listeners = host[listenersAttachedKey] = host[listenersAttachedKey] || {};
  if (!listeners[eventType]) {
    (host.body || host).addEventListener(
      eventType,
      listeners[eventType] = function(event) {
        var curNode = event.target;
        if (!curNode) {
          return;
        }
        curNode = // event.target of an SVGElementInstance does not have a
        // `getAttribute` function in IE 11.
        // See https://github.com/marko-js/marko/issues/796
        curNode.correspondingUseElement || // in some browsers the event target can be a text node
        // one example being dragenter in firefox.
        (curNode.nodeType === TEXT_NODE ? curNode.parentNode : curNode);
        var propName = "on" + eventType;
        var target;
        if (event.bubbles) {
          var propagationStopped = false;
          var oldStopPropagation = event.stopPropagation;
          event.stopPropagation = function() {
            oldStopPropagation.call(event);
            propagationStopped = true;
          };
          do {
            if (target = getEventFromEl(curNode, propName)) {
              delegateEvent(curNode, propName, target, event);
              if (propagationStopped) {
                break;
              }
            }
          } while ((curNode = curNode.parentNode) && curNode.getAttribute);
        } else if (target = getEventFromEl(curNode, propName)) {
          delegateEvent(curNode, propName, target, event);
        }
      },
      true
    );
  }
}
function noop3() {
}
eventDelegation.aT_ = noop3;
eventDelegation.am_ = noop3;
eventDelegation.aQ_ = delegateEvent;
eventDelegation.aR_ = getEventFromEl;
eventDelegation._r_ = addDelegatedEventHandler$1;
eventDelegation._z_ = function(host) {
  Object.keys(delegatedEvents).forEach(function(eventType) {
    addDelegatedEventHandlerToHost(eventType, host);
  });
};
function KeySequence$1() {
  this.aO_ = /* @__PURE__ */ Object.create(null);
}
KeySequence$1.prototype.aL_ = function(key) {
  var lookup = this.aO_;
  if (lookup[key]) {
    return key + "_" + lookup[key]++;
  }
  lookup[key] = 1;
  return key;
};
var KeySequence_1 = KeySequence$1;
var extend2 = extend$3;
var w10Noop = constants$3.NOOP;
var componentUtil = componentsUtil$3;
var attachBubblingEvent = componentUtil._S_;
var addDelegatedEventHandler = eventDelegation._r_;
var KeySequence = KeySequence_1;
var EMPTY_OBJECT = {};
var FLAG_WILL_RERENDER_IN_BROWSER$2 = 1;
var FLAG_HAS_RENDER_BODY = 2;
var FLAG_IS_LEGACY = 4;
var FLAG_OLD_HYDRATE_NO_CREATE$1 = 8;
function ComponentDef$2(component, componentId, componentsContext) {
  this.aI_ = componentsContext;
  this.s_ = component;
  this.id = componentId;
  this._b_ = void 0;
  this._t_ = false;
  this.t_ = false;
  this.u_ = 0;
  this.aJ_ = 0;
  this.aK_ = null;
}
ComponentDef$2.prototype = {
  aL_: function(key) {
    return (this.aK_ || (this.aK_ = new KeySequence())).aL_(
      key
    );
  },
  /**
   * This helper method generates a unique and fully qualified DOM element ID
   * that is unique within the scope of the current component.
   */
  elId: function(nestedId) {
    var id = this.id;
    if (nestedId == null) {
      return id;
    } else {
      if (typeof nestedId !== "string") {
        nestedId = String(nestedId);
      }
      if (nestedId.indexOf("#") === 0) {
        id = "#" + id;
        nestedId = nestedId.substring(1);
      }
      return id + "-" + nestedId;
    }
  },
  /**
   * Returns the next auto generated unique ID for a nested DOM element or nested DOM component
   */
  aM_: function() {
    return this.id + "-c" + this.aJ_++;
  },
  d: function(eventName, handlerMethodName, isOnce, extraArgs) {
    addDelegatedEventHandler(eventName);
    return attachBubblingEvent(this, handlerMethodName, isOnce, extraArgs);
  },
  get _p_() {
    return this.s_._p_;
  }
};
ComponentDef$2.prototype.nk = ComponentDef$2.prototype.aL_;
ComponentDef$2._C_ = function(o, types, global2, registry2) {
  var id = o[0];
  var typeName = types[o[1]];
  var input = o[2] || null;
  var extra = o[3] || EMPTY_OBJECT;
  var state = extra.s;
  var componentProps = extra.w || EMPTY_OBJECT;
  var flags = extra.f;
  var isLegacy = flags & FLAG_IS_LEGACY;
  var renderBody = flags & FLAG_HAS_RENDER_BODY ? w10Noop : extra.r;
  var component = typeName && registry2._F_(typeName, id, isLegacy);
  component._a_ = true;
  if (isLegacy) {
    component.widgetConfig = componentProps;
    component.Y_ = renderBody;
  } else if (renderBody) {
    (input || (input = {})).renderBody = renderBody;
  }
  if (!isLegacy && flags & FLAG_WILL_RERENDER_IN_BROWSER$2 && !(flags & FLAG_OLD_HYDRATE_NO_CREATE$1)) {
    if (component.onCreate) {
      component.onCreate(input, { global: global2 });
    }
    if (component.onInput) {
      input = component.onInput(input, { global: global2 }) || input;
    }
  } else {
    if (state) {
      var undefinedPropNames = extra.u;
      if (undefinedPropNames) {
        undefinedPropNames.forEach(function(undefinedPropName) {
          state[undefinedPropName] = void 0;
        });
      }
      component.state = state;
    }
    if (!isLegacy && componentProps) {
      extend2(component, componentProps);
    }
  }
  component.O_ = input;
  if (extra.b) {
    component.X_ = extra.b;
  }
  var scope = extra.p;
  var customEvents = extra.e;
  if (customEvents) {
    component.aC_(customEvents, scope);
  }
  component.aj_ = global2;
  return {
    id,
    s_: component,
    _b_: extra.d,
    u_: extra.f || 0
  };
};
var ComponentDef_1 = ComponentDef$2;
var ComponentsContext$3 = { exports: {} };
var nextComponentIdProvider = componentsUtil$3._R_;
function GlobalComponentsContext(out) {
  this.q_ = {};
  this.ay_ = void 0;
  this.aM_ = nextComponentIdProvider(out);
}
var GlobalComponentsContext_1 = GlobalComponentsContext;
(function(module, exports) {
  var GlobalComponentsContext2 = GlobalComponentsContext_1;
  function ComponentsContext2(out, parentComponentsContext) {
    var globalComponentsContext;
    var componentDef;
    if (parentComponentsContext) {
      globalComponentsContext = parentComponentsContext.p_;
      componentDef = parentComponentsContext.o_;
      var nestedContextsForParent;
      if (!(nestedContextsForParent = parentComponentsContext._c_)) {
        nestedContextsForParent = parentComponentsContext._c_ = [];
      }
      nestedContextsForParent.push(this);
    } else {
      globalComponentsContext = out.global.b_;
      if (globalComponentsContext === void 0) {
        out.global.b_ = globalComponentsContext = new GlobalComponentsContext2(out);
      }
    }
    this.p_ = globalComponentsContext;
    this.b_ = [];
    this.r_ = out;
    this.o_ = componentDef;
    this._c_ = void 0;
    this.v_ = parentComponentsContext && parentComponentsContext.v_;
  }
  ComponentsContext2.prototype = {
    ae_: function(host) {
      var componentDefs = this.b_;
      ComponentsContext2._H_(componentDefs, host);
      this.r_.emit("aN_");
      this.r_.global.b_ = void 0;
      return componentDefs;
    }
  };
  function getComponentsContext2(out) {
    return out.b_ || (out.b_ = new ComponentsContext2(out));
  }
  module.exports = exports = ComponentsContext2;
  exports.S_ = getComponentsContext2;
})(ComponentsContext$3, ComponentsContext$3.exports);
var ComponentsContextExports = ComponentsContext$3.exports;
var w10NOOP = constants$3.NOOP;
var ComponentDef$1 = ComponentDef_1;
var ComponentsContext$2 = ComponentsContextExports;
var changeCase = _changeCase;
var getComponentsContext$2 = ComponentsContext$2.S_;
var RENDER_BODY_TO_JSON = function() {
  return w10NOOP;
};
var FLAG_WILL_RERENDER_IN_BROWSER$1 = 1;
var IS_SERVER = typeof document === "undefined";
var dynamicTag = function dynamicTag2(out, tag, getAttrs, renderBody, args, props, componentDef, key, customEvents) {
  if (tag) {
    if (tag.default) {
      tag = tag.default;
    }
    var attrs3 = getAttrs && getAttrs();
    var component = componentDef && componentDef.s_;
    if (typeof tag === "string") {
      if (renderBody) {
        out.bi_(
          tag,
          attrs3,
          key,
          componentDef,
          addEvents(componentDef, customEvents, props)
        );
        renderBody(out);
        out.bj_();
      } else {
        out.bk_(
          tag,
          attrs3,
          key,
          componentDef,
          addEvents(componentDef, customEvents, props)
        );
      }
    } else {
      if (attrs3 == null) {
        attrs3 = { renderBody };
      } else if (typeof attrs3 === "object") {
        attrs3 = attrsToCamelCase(attrs3);
        if (renderBody) {
          attrs3.renderBody = renderBody;
        }
      }
      var renderer2 = tag._ || (tag.renderer ? tag.renderer.renderer || tag.renderer : tag.render);
      var render3 = tag && tag.renderBody || tag;
      if (dynamicTag2.bl_) {
        renderer2 = dynamicTag2.bl_(renderer2, render3, args);
      }
      if (renderer2) {
        out.c(componentDef, key, customEvents);
        renderer2(attrs3, out);
        out._Z_ = null;
      } else {
        var isFn = typeof render3 === "function";
        if (isFn) {
          var flags = componentDef ? componentDef.u_ : 0;
          var willRerender = flags & FLAG_WILL_RERENDER_IN_BROWSER$1;
          var isW10NOOP = render3 === w10NOOP;
          var preserve = IS_SERVER ? willRerender : isW10NOOP;
          out.bf(key, component, preserve);
          if (!isW10NOOP && isFn) {
            var componentsContext = getComponentsContext$2(out);
            var parentComponentDef = componentsContext.o_;
            var globalContext = componentsContext.p_;
            componentsContext.o_ = new ComponentDef$1(
              component,
              parentComponentDef.id + "-" + parentComponentDef.aL_(key),
              globalContext
            );
            render3.toJSON = RENDER_BODY_TO_JSON;
            if (args) {
              render3.apply(null, [out].concat(args, attrs3));
            } else {
              render3(out, attrs3);
            }
            componentsContext.o_ = parentComponentDef;
          }
          out.ef();
        } else {
          out.error("Invalid dynamic tag value");
        }
      }
    }
  } else if (renderBody) {
    out.bf(
      key,
      component,
      IS_SERVER && componentDef && componentDef.u_ & FLAG_WILL_RERENDER_IN_BROWSER$1
    );
    renderBody(out);
    out.ef();
  }
};
function attrsToCamelCase(attrs3) {
  var result = {};
  for (var key in attrs3) {
    result[changeCase.bh_(key)] = attrs3[key];
  }
  return result;
}
function addEvents(componentDef, customEvents, props) {
  var len = customEvents ? customEvents.length : 0;
  if (len === 0) {
    return props;
  }
  var result = props || {};
  var event;
  for (var i = len; i--; ) {
    event = customEvents[i];
    result["on" + event[0]] = componentDef.d(
      event[0],
      event[1],
      event[2],
      event[3]
    );
  }
  return result;
}
var _marko_dynamic_tag = /* @__PURE__ */ getDefaultExportFromCjs(dynamicTag);
var componentsEntry = {};
var src = {};
var constants$2 = constants$4;
var markerKey$1 = Symbol("warp10");
var safePropName = /^[$A-Z_][0-9A-Z_$]*$/i;
var isArray$2 = Array.isArray;
var safeJSONRegExp = /<\/|\u2028|\u2029/g;
function safeJSONReplacer(match2) {
  if (match2 === "</") {
    return "\\u003C/";
  } else {
    return "\\u" + match2.charCodeAt(0).toString(16);
  }
}
function safeJSON(json) {
  return json.replace(safeJSONRegExp, safeJSONReplacer);
}
var Marker$1 = class Marker {
  constructor(path, symbol) {
    this.path = path;
    this.symbol = symbol;
  }
};
function handleProperty$1(clone, key, value, valuePath, serializationSymbol, assignments) {
  if (value === constants$2.NOOP) {
    if (assignments.$W10NOOP) {
      assignments.push(valuePath + "=$w.$W10NOOP");
    } else {
      assignments.$W10NOOP = true;
      assignments.push('var $w=typeof window=="undefined"?global:window');
      assignments.push(valuePath + "=$w.$W10NOOP=$w.$W10NOOP||function(){}");
    }
  } else if (value.constructor === Date) {
    assignments.push(valuePath + "=new Date(" + value.getTime() + ")");
  } else if (value.constructor === URL) {
    assignments.push(valuePath + '=new URL("' + value.href + '")');
  } else if (value.constructor === URLSearchParams) {
    assignments.push(valuePath + '=new URLSearchParams("' + value + '")');
  } else if (isArray$2(value)) {
    const marker = value[markerKey$1];
    if (marker && marker.symbol === serializationSymbol) {
      assignments.push(valuePath + "=" + marker.path);
    } else {
      value[markerKey$1] = new Marker$1(valuePath, serializationSymbol);
      clone[key] = pruneArray$1(value, valuePath, serializationSymbol, assignments);
    }
  } else {
    const marker = value[markerKey$1];
    if (marker && marker.symbol === serializationSymbol) {
      assignments.push(valuePath + "=" + marker.path);
    } else {
      value[markerKey$1] = new Marker$1(valuePath, serializationSymbol);
      clone[key] = pruneObject$1(value, valuePath, serializationSymbol, assignments);
    }
  }
}
function pruneArray$1(array, path, serializationSymbol, assignments) {
  let len = array.length;
  var clone = new Array(len);
  for (let i = 0; i < len; i++) {
    var value = array[i];
    if (value == null) {
      continue;
    }
    var type = typeof value;
    if (type === "function" && value.toJSON) {
      value = value.toJSON();
      type = typeof value;
    }
    if (value && (value === constants$2.NOOP || type === "object")) {
      let valuePath = path + "[" + i + "]";
      handleProperty$1(clone, i, value, valuePath, serializationSymbol, assignments);
    } else {
      clone[i] = value;
    }
  }
  return clone;
}
function pruneObject$1(obj, path, serializationSymbol, assignments) {
  var clone = {};
  for (var key in obj) {
    var value = obj[key];
    if (value === void 0) {
      continue;
    }
    var type = typeof value;
    if (type === "function" && value.toJSON) {
      value = value.toJSON();
      type = typeof value;
    }
    if (value && (value === constants$2.NOOP || type === "object")) {
      let valuePath = path + (safePropName.test(key) ? "." + key : "[" + JSON.stringify(key) + "]");
      handleProperty$1(clone, key, value, valuePath, serializationSymbol, assignments);
    } else {
      clone[key] = value;
    }
  }
  return clone;
}
function serializeHelper(obj, safe, varName, additive) {
  var pruned;
  const assignments = [];
  if (typeof obj === "object") {
    const serializationSymbol = Symbol();
    const path = "$";
    obj[markerKey$1] = new Marker$1(path, serializationSymbol);
    if (obj.constructor === Date) {
      return "(new Date(" + obj.getTime() + "))";
    } else if (obj.constructor === URL) {
      return '(new URL("' + obj.href + '"))';
    } else if (obj.constructor === URLSearchParams) {
      return '(new URLSearchParams("' + obj + '"))';
    } else if (isArray$2(obj)) {
      pruned = pruneArray$1(obj, path, serializationSymbol, assignments);
    } else {
      pruned = pruneObject$1(obj, path, serializationSymbol, assignments);
    }
  } else {
    pruned = obj;
  }
  let json = JSON.stringify(pruned);
  if (safe) {
    json = safeJSON(json);
  }
  if (varName) {
    if (additive) {
      let innerCode = "var $=" + json + "\n";
      if (assignments.length) {
        innerCode += assignments.join("\n") + "\n";
      }
      let code = "(function() {var t=window." + varName + "||(window." + varName + "={})\n" + innerCode;
      for (let key in obj) {
        var prop;
        if (safePropName.test(key)) {
          prop = "." + key;
        } else {
          prop = "[" + JSON.stringify(key) + "]";
        }
        code += "t" + prop + "=$" + prop + "\n";
      }
      return code + "}())";
    } else {
      if (assignments.length) {
        return "(function() {var $=" + json + "\n" + assignments.join("\n") + "\nwindow." + varName + "=$}())";
      } else {
        return "window." + varName + "=" + json;
      }
    }
  } else {
    if (assignments.length) {
      return "(function() {var $=" + json + "\n" + assignments.join("\n") + "\nreturn $}())";
    } else {
      return "(" + json + ")";
    }
  }
}
var serialize = function serialize2(obj, options) {
  if (obj == null) {
    return "null";
  }
  var safe;
  var varName;
  var additive;
  if (options) {
    safe = options.safe !== false;
    varName = options.var;
    additive = options.additive === true;
  } else {
    safe = true;
    additive = false;
  }
  return serializeHelper(obj, safe, varName, additive);
};
var constants$1 = constants$4;
var markerKey = Symbol("warp10");
var isArray$1 = Array.isArray;
var Marker2 = class {
  constructor(path, symbol) {
    this.path = path;
    this.symbol = symbol;
  }
};
function append(array, el) {
  var len = array.length;
  var clone = new Array(len + 1);
  for (var i = 0; i < len; i++) {
    clone[i] = array[i];
  }
  clone[len] = el;
  return clone;
}
var Assignment = class {
  constructor(lhs, rhs) {
    this.l = lhs;
    this.r = rhs;
  }
};
function handleProperty(clone, key, value, valuePath, serializationSymbol, assignments) {
  if (value === constants$1.NOOP) {
    assignments.push(new Assignment(valuePath, { type: "NOOP" }));
  } else if (value.constructor === Date) {
    assignments.push(new Assignment(valuePath, { type: "Date", value: value.getTime() }));
  } else if (value.constructor === URL) {
    assignments.push(new Assignment(valuePath, { type: "URL", value: value.href }));
  } else if (value.constructor === URLSearchParams) {
    assignments.push(new Assignment(valuePath, { type: "URLSearchParams", value: value.toString() }));
  } else if (isArray$1(value)) {
    const marker = value[markerKey];
    if (marker && marker.symbol === serializationSymbol) {
      assignments.push(new Assignment(valuePath, marker.path));
    } else {
      value[markerKey] = new Marker2(valuePath, serializationSymbol);
      clone[key] = pruneArray(value, valuePath, serializationSymbol, assignments);
    }
  } else {
    const marker = value[markerKey];
    if (marker && marker.symbol === serializationSymbol) {
      assignments.push(new Assignment(valuePath, marker.path));
    } else {
      value[markerKey] = new Marker2(valuePath, serializationSymbol);
      clone[key] = pruneObject(value, valuePath, serializationSymbol, assignments);
    }
  }
}
function pruneArray(array, path, serializationSymbol, assignments) {
  let len = array.length;
  var clone = new Array(len);
  for (let i = 0; i < len; i++) {
    var value = array[i];
    if (value == null) {
      continue;
    }
    var type = typeof value;
    if (type === "function" && value.toJSON) {
      value = value.toJSON();
      type = typeof value;
    }
    if (value && (value === constants$1.NOOP || type === "object")) {
      handleProperty(clone, i, value, append(path, i), serializationSymbol, assignments);
    } else {
      clone[i] = value;
    }
  }
  return clone;
}
function pruneObject(obj, path, serializationSymbol, assignments) {
  var clone = {};
  if (obj.toJSON && obj.constructor != Date && obj.constructor != URL) {
    obj = obj.toJSON();
  }
  if (typeof obj !== "object") {
    return obj;
  }
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    var value = obj[key];
    if (value === void 0) {
      continue;
    }
    var type = typeof value;
    if (type === "function" && value.toJSON) {
      value = value.toJSON();
      type = typeof value;
    }
    if (value && (value === constants$1.NOOP || type === "object")) {
      handleProperty(clone, key, value, append(path, key), serializationSymbol, assignments);
    } else {
      clone[key] = value;
    }
  }
  return clone;
}
var stringifyPrepare$1 = function stringifyPrepare(obj) {
  if (!obj) {
    return obj;
  }
  var pruned;
  const assignments = [];
  if (typeof obj === "object") {
    if (obj.toJSON && obj.constructor != Date && obj.constructor != URL) {
      obj = obj.toJSON();
      if (!obj.hasOwnProperty || typeof obj !== "object") {
        return obj;
      }
    }
    const serializationSymbol = Symbol();
    const path = [];
    obj[markerKey] = new Marker2(path, serializationSymbol);
    if (obj.constructor === Date) {
      pruned = null;
      assignments.push(new Assignment([], { type: "Date", value: obj.getTime() }));
    } else if (obj.constructor === URL) {
      pruned = null;
      assignments.push(new Assignment([], { type: "URL", value: obj.href }));
    } else if (obj.constructor === URLSearchParams) {
      pruned = null;
      assignments.push(new Assignment([], { type: "URLSearchParams", value: obj.toString() }));
    } else if (isArray$1(obj)) {
      pruned = pruneArray(obj, path, serializationSymbol, assignments);
    } else {
      pruned = pruneObject(obj, path, serializationSymbol, assignments);
    }
  } else {
    pruned = obj;
  }
  if (assignments.length) {
    return {
      o: pruned,
      $$: assignments
    };
  } else {
    return pruned;
  }
};
var stringifyPrepare2 = stringifyPrepare$1;
var escapeEndingScriptTagRegExp = /<\//g;
var stringify = function stringify2(obj, options) {
  var safe;
  if (options) {
    safe = options.safe === true;
  } else {
    safe = false;
  }
  var final = stringifyPrepare2(obj);
  let json = JSON.stringify(final);
  if (safe) {
    json = json.replace(escapeEndingScriptTagRegExp, "\\u003C/");
  }
  return json;
};
var constants = constants$4;
var isArray = Array.isArray;
function resolve(object, path, len) {
  var current = object;
  for (var i = 0; i < len; i++) {
    current = current[path[i]];
  }
  return current;
}
function resolveType(info) {
  if (info.type === "Date") {
    return new Date(info.value);
  } else if (info.type === "URL") {
    return new URL(info.value);
  } else if (info.type === "URLSearchParams") {
    return new URLSearchParams(info.value);
  } else if (info.type === "NOOP") {
    return constants.NOOP;
  } else {
    throw new Error("Bad type");
  }
}
var finalize$1 = function finalize(outer) {
  if (!outer) {
    return outer;
  }
  var assignments = outer.$$;
  if (assignments) {
    var object = outer.o;
    var len;
    if (assignments && (len = assignments.length)) {
      for (var i = 0; i < len; i++) {
        var assignment = assignments[i];
        var rhs = assignment.r;
        var rhsValue;
        if (isArray(rhs)) {
          rhsValue = resolve(object, rhs, rhs.length);
        } else {
          rhsValue = resolveType(rhs);
        }
        var lhs = assignment.l;
        var lhsLast = lhs.length - 1;
        if (lhsLast === -1) {
          object = outer.o = rhsValue;
          break;
        } else {
          var lhsParent = resolve(object, lhs, lhsLast);
          lhsParent[lhs[lhsLast]] = rhsValue;
        }
      }
    }
    assignments.length = 0;
    return object == null ? null : object;
  } else {
    return outer;
  }
};
var finalize2 = finalize$1;
var parse = function parse2(json) {
  if (json === void 0) {
    return void 0;
  }
  var outer = JSON.parse(json);
  return finalize2(outer);
};
src.serialize = serialize;
src.stringify = stringify;
src.parse = parse;
src.finalize = finalize$1;
src.stringifyPrepare = stringifyPrepare$1;
(function(exports) {
  var warp10 = src;
  var w10NOOP2 = constants$3.NOOP;
  var safeJSONRegExp2 = /<\/|\u2028|\u2029/g;
  var IGNORE_GLOBAL_TYPES = /* @__PURE__ */ new Set(["undefined", "function", "symbol"]);
  var DEFAULT_RUNTIME_ID = "M";
  var FLAG_WILL_RERENDER_IN_BROWSER2 = 1;
  var FLAG_HAS_RENDER_BODY2 = 2;
  var FLAG_IS_LEGACY2 = 4;
  var FLAG_OLD_HYDRATE_NO_CREATE2 = 8;
  function safeJSONReplacer2(match2) {
    if (match2 === "</") {
      return "\\u003C/";
    } else {
      return "\\u" + match2.charCodeAt(0).toString(16);
    }
  }
  function isNotEmpty(obj) {
    var keys = Object.keys(obj);
    for (var i = keys.length; i--; ) {
      if (obj[keys[i]] !== void 0) {
        return true;
      }
    }
    return false;
  }
  function safeStringify(data) {
    return JSON.stringify(warp10.stringifyPrepare(data)).replace(
      safeJSONRegExp2,
      safeJSONReplacer2
    );
  }
  function getSerializedGlobals($global) {
    let serializedGlobalsLookup = $global.serializedGlobals;
    if (serializedGlobalsLookup) {
      let serializedGlobals2;
      let keys = Object.keys(serializedGlobalsLookup);
      for (let i = keys.length; i--; ) {
        let key = keys[i];
        if (serializedGlobalsLookup[key]) {
          let value = $global[key];
          if (!IGNORE_GLOBAL_TYPES.has(typeof value)) {
            if (serializedGlobals2 === void 0) {
              serializedGlobals2 = {};
            }
            serializedGlobals2[key] = value;
          }
        }
      }
      return serializedGlobals2;
    }
  }
  function addComponentsFromContext2(componentsContext, componentsToHydrate) {
    var components2 = componentsContext.b_;
    var len = components2.length;
    for (var i = 0; i < len; i++) {
      var componentDef = components2[i];
      var id = componentDef.id;
      var component = componentDef.s_;
      var flags = componentDef.u_;
      var isLegacy = componentDef.y_;
      var state = component.state;
      var input = component.input || 0;
      var typeName = component.typeName;
      var customEvents = component.V_;
      var scope = component.W_;
      var bubblingDomEvents = component.X_;
      var needsState;
      var serializedProps;
      var renderBody;
      if (isLegacy) {
        flags |= FLAG_IS_LEGACY2;
        renderBody = component.Y_;
        if (component.widgetConfig && isNotEmpty(component.widgetConfig)) {
          serializedProps = component.widgetConfig;
        }
        needsState = true;
      } else {
        if (!(flags & FLAG_WILL_RERENDER_IN_BROWSER2) || flags & FLAG_OLD_HYDRATE_NO_CREATE2) {
          component.z_ = void 0;
          component.O_ = void 0;
          component.typeName = void 0;
          component.id = void 0;
          component.V_ = void 0;
          component.W_ = void 0;
          component.X_ = void 0;
          component.Z_ = void 0;
          component.___ = void 0;
          component._a_ = void 0;
          needsState = true;
          if (isNotEmpty(component)) {
            serializedProps = component;
          }
        } else {
          renderBody = input.renderBody;
        }
      }
      var undefinedPropNames = void 0;
      if (needsState && state) {
        const stateKeys = Object.keys(state);
        for (let i2 = stateKeys.length; i2--; ) {
          const stateKey = stateKeys[i2];
          if (state[stateKey] === void 0) {
            if (undefinedPropNames) {
              undefinedPropNames.push(stateKey);
            } else {
              undefinedPropNames = [stateKey];
            }
          }
        }
      }
      if (typeof renderBody === "function" && renderBody.toJSON && renderBody.toJSON() === w10NOOP2) {
        flags |= FLAG_HAS_RENDER_BODY2;
        renderBody = input.renderBody = void 0;
      }
      var extra = {
        b: bubblingDomEvents,
        d: componentDef._b_,
        e: customEvents,
        f: flags || void 0,
        p: customEvents && scope,
        // Only serialize scope if we need to attach custom events
        s: needsState && state,
        u: undefinedPropNames,
        w: serializedProps,
        r: renderBody
      };
      var parts = [id, typeName];
      var hasExtra = isNotEmpty(extra);
      if (input) {
        parts.push(input);
        if (hasExtra) {
          parts.push(extra);
        }
      } else if (hasExtra) {
        parts.push(0, extra);
      }
      componentsToHydrate.push(parts);
    }
    components2.length = 0;
    var nestedContexts = componentsContext._c_;
    if (nestedContexts !== void 0) {
      nestedContexts.forEach(function(nestedContext) {
        addComponentsFromContext2(nestedContext, componentsToHydrate);
      });
    }
  }
  function getInitComponentsData(out, componentDefs) {
    const len = componentDefs.length;
    const $global = out.global;
    const isLast = $global.d_;
    const didSerializeComponents = $global._d_;
    const prefix = $global.componentIdPrefix || $global.widgetIdPrefix;
    if (len === 0) {
      if (isLast && didSerializeComponents) {
        return { p: prefix, l: 1 };
      }
      return;
    }
    const TYPE_INDEX = 1;
    const typesLookup = $global._e_ || ($global._e_ = /* @__PURE__ */ new Map());
    let newTypes;
    for (let i = 0; i < len; i++) {
      const componentDef = componentDefs[i];
      const typeName = componentDef[TYPE_INDEX];
      let typeIndex = typesLookup.get(typeName);
      if (typeIndex === void 0) {
        typeIndex = typesLookup.size;
        typesLookup.set(typeName, typeIndex);
        if (newTypes) {
          newTypes.push(typeName);
        } else {
          newTypes = [typeName];
        }
      }
      componentDef[TYPE_INDEX] = typeIndex;
    }
    let serializedGlobals2;
    if (!didSerializeComponents) {
      $global._d_ = true;
      serializedGlobals2 = getSerializedGlobals($global);
    }
    return {
      p: prefix,
      l: isLast && 1,
      g: serializedGlobals2,
      w: componentDefs,
      t: newTypes
    };
  }
  function getInitComponentsDataFromOut(out) {
    const componentsContext = out.b_;
    if (componentsContext === null) {
      return;
    }
    const $global = out.global;
    const runtimeId2 = $global.runtimeId;
    const componentsToHydrate = [];
    addComponentsFromContext2(componentsContext, componentsToHydrate);
    $global.d_ = true;
    const data = getInitComponentsData(out, componentsToHydrate);
    $global.d_ = void 0;
    if (runtimeId2 !== DEFAULT_RUNTIME_ID && data) {
      data.r = runtimeId2;
    }
    return data;
  }
  function writeInitComponentsCode(out) {
    out.script(exports.a_(out));
  }
  exports.a_ = function getInitComponentsCode2(out, componentDefs) {
    const initComponentsData = arguments.length === 2 ? getInitComponentsData(out, componentDefs) : getInitComponentsDataFromOut(out);
    if (initComponentsData === void 0) {
      return "";
    }
    const runtimeId2 = out.global.runtimeId;
    const componentGlobalKey = runtimeId2 === DEFAULT_RUNTIME_ID ? "MC" : runtimeId2 + "_C";
    return `$${componentGlobalKey}=(window.$${componentGlobalKey}||[]).concat(${safeStringify(
      initComponentsData
    )})`;
  };
  exports.__ = addComponentsFromContext2;
  exports.writeInitComponentsCode = writeInitComponentsCode;
  exports.getRenderedComponents = function(out) {
    return warp10.stringifyPrepare(getInitComponentsDataFromOut(out));
  };
})(componentsEntry);
var components = componentsEntry;
var INIT_COMPONENTS_KEY = Symbol();
var addComponentsFromContext = components.__;
var getInitComponentsCode = components.a_;
function addComponentsFromOut(source, target) {
  const sourceOut = source.out || source;
  const targetOut = target || sourceOut;
  const componentsContext = sourceOut.b_;
  const componentDefs = targetOut.writer.get("componentDefs");
  addComponentsFromContext(componentsContext, componentDefs);
}
function addInitScript(writer) {
  const out = writer.state.root;
  const componentDefs = writer.get("componentDefs");
  writer.script(getInitComponentsCode(out, componentDefs));
}
var initComponentsTag = function render(input, out) {
  const $global = out.global;
  if ($global[INIT_COMPONENTS_KEY] === void 0) {
    $global[INIT_COMPONENTS_KEY] = true;
    out.on("await:finish", addComponentsFromOut);
    out.on("c_", addInitScript);
    if (out.isSync() === true) {
      addComponentsFromOut(out);
    } else {
      const asyncOut = out.beginAsync({ last: true, timeout: -1 });
      out.onLast(function(next) {
        let rootOut = out;
        while (rootOut._parentOut) {
          rootOut = rootOut._parentOut;
        }
        addComponentsFromOut(rootOut, asyncOut);
        asyncOut.end();
        next();
      });
    }
  }
};
var _initComponents = /* @__PURE__ */ getDefaultExportFromCjs(initComponentsTag);
var renderTag = function renderTagHelper(handler, input, out, componentDef, key, customEvents) {
  out.c(componentDef, key, customEvents);
  (handler._ || (handler._ = handler.render || handler.renderer || handler))(
    input,
    out
  );
  out._Z_ = null;
};
var _marko_tag = /* @__PURE__ */ getDefaultExportFromCjs(renderTag);
var escapeDoubleQuotes = escapeQuotes.n_;
var reordererRenderer = function(input, out) {
  if (out.isSync()) {
    return;
  }
  var global2 = out.global;
  if (global2.__awaitReordererInvoked) {
    return;
  }
  global2.__awaitReordererInvoked = true;
  if (out.global.m_) {
    out.flush();
  }
  var reorderFunctionId = out.global.runtimeId !== "M" ? "af" + out.global.runtimeId : "af";
  var asyncOut = out.beginAsync({
    last: true,
    timeout: -1,
    name: "await-reorderer"
  });
  out.onLast(function(next) {
    var awaitContext = global2.m_;
    var remaining;
    if (!awaitContext || !awaitContext.instances || !(remaining = awaitContext.instances.length)) {
      asyncOut.end();
      next();
      return;
    }
    function handleAwait(awaitInfo) {
      awaitInfo.out.on("c_", out.emit.bind(out, "c_")).on("finish", function(result) {
        if (!global2._afRuntime) {
          asyncOut.script(
            `function $${reorderFunctionId}(d,a,e,l,g,h,k,b,f,c){c=$${reorderFunctionId};if(a&&!c[a])(c[a+="$"]||(c[a]=[])).push(d);else{e=document;l=e.getElementById("${reorderFunctionId}"+d);g=e.getElementById("${reorderFunctionId}ph"+d);h=e.createDocumentFragment();k=l.childNodes;b=0;for(f=k.length;b<f;b++)h.appendChild(k.item(0));g&&g.parentNode.replaceChild(h,g);c[d]=1;if(a=c[d+"$"])for(b=0,f=a.length;b<f;b++)c(a[b])}}`
          );
          global2._afRuntime = true;
        }
        if (global2.cspNonce) {
          asyncOut.write(
            '<style nonce="' + escapeDoubleQuotes(global2.cspNonce) + `">#${reorderFunctionId}` + awaitInfo.id + `{display:none;}</style><div id="${reorderFunctionId}` + awaitInfo.id + '">' + result.toString() + "</div>"
          );
        } else {
          asyncOut.write(
            `<div id="${reorderFunctionId}` + awaitInfo.id + '" style="display:none">' + result.toString() + "</div>"
          );
        }
        asyncOut.script(
          `$${reorderFunctionId}(` + (typeof awaitInfo.id === "number" ? awaitInfo.id : '"' + awaitInfo.id + '"') + (awaitInfo.after ? ',"' + awaitInfo.after + '"' : "") + ")"
        );
        awaitInfo.out.writer = asyncOut.writer;
        out.emit("await:finish", awaitInfo);
        out.flush();
        if (--remaining === 0) {
          asyncOut.end();
          next();
        }
      }).on("error", function(err) {
        asyncOut.error(err);
      });
    }
    awaitContext.instances.forEach(handleAwait);
    out.on("await:clientReorder", function(awaitInfo) {
      remaining++;
      handleAwait(awaitInfo);
    });
    delete awaitContext.instances;
  });
};
var _awaitReorderer = /* @__PURE__ */ getDefaultExportFromCjs(reordererRenderer);
function forceScriptTagAtThisPoint(out) {
  const writer = out.writer;
  out.global.d_ = true;
  const htmlSoFar = writer.toString();
  out.global.d_ = void 0;
  writer.clear();
  writer.write(htmlSoFar);
}
var preferredScriptLocationTag = function render2(input, out) {
  if (out.isSync() === true) {
    forceScriptTagAtThisPoint(out);
  } else {
    const asyncOut = out.beginAsync({ last: true, timeout: -1 });
    out.onLast(function(next) {
      forceScriptTagAtThisPoint(asyncOut);
      asyncOut.end();
      next();
    });
  }
};
var _preferredScriptLocation = /* @__PURE__ */ getDefaultExportFromCjs(preferredScriptLocationTag);
var copyProps$2 = function copyProps(from, to) {
  Object.getOwnPropertyNames(from).forEach(function(name) {
    var descriptor = Object.getOwnPropertyDescriptor(from, name);
    Object.defineProperty(to, name, descriptor);
  });
};
var ComponentDef = ComponentDef_1;
var FLAG_WILL_RERENDER_IN_BROWSER = 1;
var FLAG_OLD_HYDRATE_NO_CREATE = 8;
var componentsBeginComponent = function beginComponent(componentsContext, component, key, ownerComponentDef, isSplitComponent, isImplicitComponent, existingComponentDef) {
  var componentId = component.id;
  var componentDef = existingComponentDef || (componentsContext.o_ = new ComponentDef(
    component,
    componentId,
    componentsContext
  ));
  var ownerIsRenderBoundary = ownerComponentDef && ownerComponentDef.t_;
  var ownerWillRerender = ownerComponentDef && ownerComponentDef.u_ & FLAG_WILL_RERENDER_IN_BROWSER;
  if (!componentsContext.v_ && ownerWillRerender) {
    componentDef.u_ |= FLAG_WILL_RERENDER_IN_BROWSER;
    componentDef._wrr = true;
    return componentDef;
  }
  if (isImplicitComponent === true) {
    return componentDef;
  }
  componentsContext.b_.push(componentDef);
  let out = componentsContext.r_;
  let runtimeId2 = out.global.runtimeId;
  componentDef.t_ = true;
  componentDef.w_ = componentsContext.v_;
  if (isSplitComponent === false && out.global.noBrowserRerender !== true) {
    componentDef.u_ |= FLAG_WILL_RERENDER_IN_BROWSER;
    componentDef._wrr = true;
    componentsContext.v_ = false;
  }
  if (out.global.oldHydrateNoCreate === true) {
    componentDef.u_ |= FLAG_OLD_HYDRATE_NO_CREATE;
  }
  if ((ownerIsRenderBoundary || ownerWillRerender) && key != null) {
    out.w(
      "<!--" + runtimeId2 + "^" + componentId + " " + ownerComponentDef.id + " " + key + "-->"
    );
  } else {
    out.w("<!--" + runtimeId2 + "#" + componentId + "-->");
  }
  return componentDef;
};
var ComponentsContext$1 = ComponentsContextExports;
var getComponentsContext$1 = ComponentsContext$1.S_;
var componentsEndComponent = function endComponent(out, componentDef) {
  if (componentDef.t_) {
    out.w("<!--" + out.global.runtimeId + "/-->");
    getComponentsContext$1(out).v_ = componentDef.w_;
  }
};
var componentsRegistry = {};
var ServerComponent = class {
  constructor(id, input, out, typeName, customEvents, scope) {
    this.id = id;
    this.V_ = customEvents;
    this.W_ = scope;
    this.typeName = typeName;
    this.X_ = void 0;
    this.Z_ = 0;
    this.onCreate(input, out);
    this.___ = this.onInput(input, out) || input;
    if (this.O_ === void 0) {
      this.O_ = this.___;
    }
    this.onRender(out);
  }
  set input(newInput) {
    this.O_ = newInput;
  }
  get input() {
    return this.O_;
  }
  set state(newState) {
    this.z_ = newState;
  }
  get state() {
    return this.z_;
  }
  get aB_() {
    return this.z_;
  }
  elId(nestedId) {
    var id = this.id;
    if (nestedId == null) {
      return id;
    } else {
      if (typeof nestedId !== "string") {
        nestedId = String(nestedId);
      }
      if (nestedId.indexOf("#") === 0) {
        id = "#" + id;
        nestedId = nestedId.substring(1);
      }
      return id + "-" + nestedId;
    }
  }
  onCreate() {
  }
  onInput() {
  }
  onRender() {
  }
};
ServerComponent.prototype.getElId = ServerComponent.prototype.elId;
var ServerComponent_1 = ServerComponent;
var copyProps$1 = copyProps$2;
var constructorCache = /* @__PURE__ */ new Map();
var BaseServerComponent = ServerComponent_1;
function createServerComponentClass(renderingLogic) {
  var renderingLogicProps = typeof renderingLogic === "function" ? renderingLogic.prototype : renderingLogic;
  class ServerComponent2 extends BaseServerComponent {
  }
  copyProps$1(renderingLogicProps, ServerComponent2.prototype);
  return ServerComponent2;
}
function createComponent(renderingLogic, id, input, out, typeName, customEvents, scope) {
  let ServerComponent2;
  if (renderingLogic) {
    ServerComponent2 = constructorCache.get(renderingLogic);
    if (!ServerComponent2) {
      ServerComponent2 = createServerComponentClass(renderingLogic);
      constructorCache.set(renderingLogic, ServerComponent2);
    }
  } else {
    ServerComponent2 = BaseServerComponent;
  }
  return new ServerComponent2(id, input, out, typeName, customEvents, scope);
}
componentsRegistry._I_ = true;
componentsRegistry._F_ = createComponent;
var copyProps2 = copyProps$2;
var beginComponent2 = componentsBeginComponent;
var endComponent2 = componentsEndComponent;
var registry = componentsRegistry;
var componentsUtil = componentsUtil$3;
var componentLookup = componentsUtil._k_;
var ComponentsContext = ComponentsContextExports;
var getComponentsContext = ComponentsContext.S_;
var isServer = componentsUtil._I_ === true;
var COMPONENT_BEGIN_ASYNC_ADDED_KEY = "$wa";
function resolveComponentKey(key, parentComponentDef) {
  if (key[0] === "#") {
    return key.substring(1);
  } else {
    return parentComponentDef.id + "-" + parentComponentDef.aL_(key);
  }
}
function trackAsyncComponents(out) {
  if (out.isSync() || out.global[COMPONENT_BEGIN_ASYNC_ADDED_KEY]) {
    return;
  }
  out.on("beginAsync", handleBeginAsync);
  out.on("beginDetachedAsync", handleBeginDetachedAsync);
  out.global[COMPONENT_BEGIN_ASYNC_ADDED_KEY] = true;
}
function handleBeginAsync(event) {
  var parentOut = event.parentOut;
  var asyncOut = event.out;
  var componentsContext = parentOut.b_;
  if (componentsContext !== void 0) {
    asyncOut.b_ = new ComponentsContext(asyncOut, componentsContext);
  }
  asyncOut.c(
    parentOut._Z_,
    parentOut.a__,
    parentOut.ba_
  );
}
function handleBeginDetachedAsync(event) {
  var asyncOut = event.out;
  handleBeginAsync(event);
  asyncOut.on("beginAsync", handleBeginAsync);
  asyncOut.on("beginDetachedAsync", handleBeginDetachedAsync);
}
function createRendererFunc(templateRenderFunc, componentProps, renderingLogic) {
  var onInput = renderingLogic && renderingLogic.onInput;
  var typeName = componentProps.t;
  var isSplit = componentProps.s === true;
  var isImplicitComponent = componentProps.i === true;
  var shouldApplySplitMixins = renderingLogic && isSplit;
  if (componentProps.d) {
    throw new Error("Runtime/NODE_ENV Mismatch");
  }
  return function renderer2(input, out) {
    trackAsyncComponents(out);
    var componentsContext = getComponentsContext(out);
    var globalComponentsContext = componentsContext.p_;
    var component = globalComponentsContext.ay_;
    var isRerender = component !== void 0;
    var id;
    var isExisting;
    var customEvents;
    var parentComponentDef = componentsContext.o_;
    var ownerComponentDef = out._Z_;
    var ownerComponentId = ownerComponentDef && ownerComponentDef.id;
    var key = out.a__;
    if (component) {
      id = component.id;
      isExisting = true;
      globalComponentsContext.ay_ = null;
    } else {
      if (parentComponentDef) {
        customEvents = out.ba_;
        if (key != null) {
          id = resolveComponentKey(key.toString(), parentComponentDef);
        } else {
          id = parentComponentDef.aM_();
        }
      } else {
        id = globalComponentsContext.aM_();
      }
    }
    if (isServer) {
      component = registry._F_(
        renderingLogic,
        id,
        input,
        out,
        typeName,
        customEvents,
        ownerComponentId
      );
      input = component.___;
    } else {
      if (!component) {
        if (isRerender && (component = componentLookup[id]) && component._p_ !== typeName) {
          component.destroy();
          component = void 0;
        }
        if (component) {
          isExisting = true;
        } else {
          isExisting = false;
          component = registry._F_(typeName, id);
          if (shouldApplySplitMixins === true) {
            shouldApplySplitMixins = false;
            var renderingLogicProps = typeof renderingLogic == "function" ? renderingLogic.prototype : renderingLogic;
            copyProps2(renderingLogicProps, component.constructor.prototype);
          }
        }
        component._a_ = true;
        if (customEvents) {
          component.aC_(customEvents, ownerComponentId);
        }
        if (isExisting === false) {
          component.aE_(input, out);
        }
        input = component._h_(input, onInput, out);
        if (isExisting === true) {
          if (component.at_ === false || component.shouldUpdate(input, component.z_) === false) {
            out.bb_(component);
            globalComponentsContext.q_[id] = true;
            component._s_();
            return;
          }
        }
      }
      component.aj_ = out.global;
      component.aF_(out);
    }
    var componentDef = beginComponent2(
      componentsContext,
      component,
      key,
      ownerComponentDef,
      isSplit,
      isImplicitComponent
    );
    componentDef._t_ = isExisting;
    templateRenderFunc(
      input,
      out,
      componentDef,
      component,
      component.aB_,
      out.global
    );
    endComponent2(out, componentDef);
    componentsContext.o_ = parentComponentDef;
  };
}
var renderer = createRendererFunc;
createRendererFunc.aV_ = resolveComponentKey;
createRendererFunc.aZ_ = trackAsyncComponents;
var _marko_renderer = /* @__PURE__ */ getDefaultExportFromCjs(renderer);
var _marko_componentType$4 = "N7u5zc6D";
var _marko_template$4 = t(_marko_componentType$4);
var _marko_component$4 = {};
_marko_template$4._ = _marko_renderer(function(input, out, _componentDef, _component, state, $global) {
  out.w(`<!doctype html><html lang=en><head>${_marko_to_string(out.global.___viteRenderAssets("head-prepend"))}<meta charset=UTF-8><link rel=icon type=image/png sizes=32x32${_marko_attr("href", _asset$1)}><meta name=viewport content="width=device-width, initial-scale=1.0"><meta name=description content="A basic Marko app."><title>${x($global.meta.pageTitle || "Marko")}</title>${_marko_to_string(out.global.___viteRenderAssets("head"))}</head><body>${_marko_to_string(out.global.___viteRenderAssets("body-prepend"))}`);
  _marko_dynamic_tag(out, input.renderBody, null, null, null, null, _componentDef, "8");
  out.w(_marko_to_string(out.global.___viteRenderAssets("body")));
  _marko_tag(_initComponents, {}, out, _componentDef, "9");
  _marko_tag(_awaitReorderer, {}, out, _componentDef, "10");
  _marko_tag(_preferredScriptLocation, {}, out, _componentDef, "11");
  out.w("</body></html>");
}, {
  t: _marko_componentType$4,
  i: true
}, _marko_component$4);
var _asset = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='512'%20viewBox='0%200%202560%201400'%3e%3cpath%20fill='url(%23a)'%20d='M427%200h361L361%20697l427%20697H427L0%20698z'%20/%3e%3clinearGradient%20id='a'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='hsl(181,%2096.3%25,%2038.8%25)'%20/%3e%3cstop%20offset='.25'%20stop-color='hsl(186,%2094.9%25,%2046.1%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(191,%2093.3%25,%2060.8%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(195,%2094.3%25,%2050.8%25)'%20/%3e%3cstop%20offset='.75'%20stop-color='hsl(199,%2095.9%25,%2048.0%25)'%20/%3e%3cstop%20offset='1'%20stop-color='hsl(203,%2094.9%25,%2038.6%25)'%20/%3e%3c/linearGradient%3e%3cpath%20fill='url(%23b)'%20d='M854%20697h361L788%200H427z'%20/%3e%3clinearGradient%20id='b'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='hsl(170,%2080.3%25,%2050.8%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(161,%2079.1%25,%2047.3%25)'%20/%3e%3cstop%20offset='1'%20stop-color='hsl(157,%2078.1%25,%2038.9%25)'%20/%3e%3c/linearGradient%3e%3cpath%20fill='url(%23c)'%20d='M1281%200h361l-427%20697H854z'%20/%3e%3clinearGradient%20id='c'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='hsl(86,%2095.9%25,%2037.1%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(86,%2091.9%25,%2045.0%25)'%20/%3e%3cstop%20offset='1'%20stop-color='hsl(90,%2082.1%25,%2051.2%25)'%20/%3e%3c/linearGradient%3e%3cpath%20fill='url(%23d)'%20d='M1642%200h-361l428%20697-428%20697h361l428-697z'%20/%3e%3clinearGradient%20id='d'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='hsl(55,%2099.9%25,%2053.1%25)'%20/%3e%3cstop%20offset='.25'%20stop-color='hsl(51,%2099.9%25,%2050.0%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(47,%2099.2%25,%2049.8%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(39,%2099.9%25,%2050.0%25)'%20/%3e%3cstop%20offset='.75'%20stop-color='hsl(35,%2099.9%25,%2050.0%25)'%20/%3e%3cstop%20offset='1'%20stop-color='hsl(29,%2099.9%25,%2046.9%25)'%20/%3e%3c/linearGradient%3e%3cpath%20fill='url(%23e)'%20d='M2132%200h-361l427%20697-428%20697h361l428-697z'%20/%3e%3clinearGradient%20id='e'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='hsl(352,%2099.9%25,%2062.9%25)'%20/%3e%3cstop%20offset='.25'%20stop-color='hsl(345,%2090.3%25,%2051.8%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(341,%2088.3%25,%2051.8%25)'%20/%3e%3cstop%20offset='.5'%20stop-color='hsl(336,%2080.9%25,%2045.4%25)'%20/%3e%3cstop%20offset='.75'%20stop-color='hsl(332,%2080.3%25,%2044.8%25)'%20/%3e%3cstop%20offset='1.1'%20stop-color='hsl(328,%2078.1%25,%2035.9%25)'%20/%3e%3c/linearGradient%3e%3c/svg%3e";
var _marko_componentType$3 = "DROzG8/N";
var _marko_template$3 = t(_marko_componentType$3);
var _marko_component$3 = {
  onCreate() {
    this.state = {
      x: "center",
      y: "center"
    };
    this.boundMove = this.move.bind(this);
  },
  onMount() {
    window.addEventListener("mousemove", this.boundMove);
  },
  onDestroy() {
    window.removeEventListener("mousemove", this.boundMove);
  },
  move(e) {
    this.state.x = e.clientX + "px";
    this.state.y = e.clientY + "px";
  }
};
_marko_template$3._ = _marko_renderer(function(input, out, _componentDef, _component, state, $global) {
  out.w(`<div${_marko_attr("style", _marko_style_merge(`--mouse-x:${state.x};--mouse-y:${state.y};`))} class=mouse-mask></div>`);
}, {
  t: _marko_componentType$3
}, _marko_component$3);
var _marko_componentType$2 = "ThYTq2k4";
var _marko_template$2 = t(_marko_componentType$2);
var _marko_component$2 = {};
_marko_template$2._ = _marko_renderer(function(input, out, _componentDef, _component, state, $global) {
  out.w(`<div class=container><header><img${_marko_attr("src", _asset)} alt=Marko class=logo></header><main><p>Edit <code>./src/routes/_index/+page.marko</code> and save to reload.</p><a href=https://markojs.com/docs/getting-started>Learn Marko</a></main></div>`);
  _marko_tag(_marko_template$3, {}, out, _componentDef, "7");
}, {
  t: _marko_componentType$2,
  i: true
}, _marko_component$2);
var _marko_componentType$1 = "bglfpPiO";
var _marko_template$1 = t(_marko_componentType$1);
var _marko_component$1 = {};
_marko_template$1._ = _marko_renderer(function(input, out, _componentDef, _component, state, $global) {
  _marko_dynamic_tag(out, _marko_template$4, () => ({
    ...input
  }), (out2) => {
    _marko_dynamic_tag(out2, _marko_template$2, () => input, null, null, null, _componentDef, "1");
  }, null, null, _componentDef, "0");
}, {
  t: _marko_componentType$1,
  i: true
}, _marko_component$1);
var base = "/";
function addAssets(g, newEntries) {
  const entries = g.___viteEntries;
  if (entries) {
    g.___viteEntries = entries.concat(newEntries);
  } else {
    g.___viteEntries = newEntries;
    g.___viteRenderAssets = renderAssets;
    g.___viteInjectAttrs = g.cspNonce ? ` nonce="${g.cspNonce.replace(/"/g, "&#39;")}"` : "";
  }
}
function renderAssets(slot) {
  const entries = this.___viteEntries;
  let html = "";
  if (entries) {
    const slotWrittenEntriesKey = `___viteWrittenEntries-${slot}`;
    const lastWrittenEntry = this[slotWrittenEntriesKey] || 0;
    const writtenEntries = this[slotWrittenEntriesKey] = entries.length;
    if (!this.___flushedMBP && slot !== "head-prepend") {
      this.___flushedMBP = true;
      html += `<script${this.___viteInjectAttrs}>$mbp=${JSON.stringify(base)}<\/script>`;
    }
    for (let i = lastWrittenEntry; i < writtenEntries; i++) {
      let entry = entries[i];
      if (typeof entry === "string") {
        entry = __MARKO_MANIFEST__[entry] || {};
      }
      const parts = entry[slot];
      if (parts) {
        for (const part of parts) {
          html += part === 0 ? this.___viteInjectAttrs : part === 1 ? base : part;
        }
      }
    }
  }
  return html;
}
var BufferedWriter = BufferedWriter_1;
var __flush_here_and_after__ = function __flushHereAndAfter__(input, out) {
  if (out.isSync()) {
    out._sync = false;
    const asyncOut = out.beginAsync({ last: true });
    out._sync = true;
    asyncOut.sync();
    out.onLast(() => {
      input.renderBody(asyncOut);
      asyncOut.end();
    });
  } else {
    let flushed = false;
    const asyncOut = out.beginAsync({ last: true });
    const nextWriter = out.writer;
    out.on("c_", (writer) => {
      if (writer instanceof BufferedWriter) {
        if (flushed) {
          const detachedOut = out.createOut();
          detachedOut.sync();
          input.renderBody(detachedOut);
          writer._content = detachedOut.toString() + writer._content;
        } else if (writer.next === nextWriter) {
          asyncOut.sync();
          input.renderBody(asyncOut);
          asyncOut.end();
          flushed = true;
        }
      }
    });
    out.onLast(() => {
      if (!flushed) {
        asyncOut.sync();
        input.renderBody(asyncOut);
        asyncOut.end();
        flushed = true;
      }
    });
  }
};
var _flush_here_and_after__ = /* @__PURE__ */ getDefaultExportFromCjs(__flush_here_and_after__);
var _marko_componentType = "1b0Y5IlD";
var _marko_template = t(_marko_componentType);
var _marko_component = {};
_marko_template._ = _marko_renderer(function(input, out, _componentDef, _component, state, $global) {
  const g = out.global;
  addAssets(g, ["__marko-run__route_Td-v"]);
  _marko_tag(_flush_here_and_after__, {
    "renderBody": (out2) => {
      out2.w(_marko_to_string(g.___viteRenderAssets("head-prepend") + g.___viteRenderAssets("head") + g.___viteRenderAssets("body-prepend")));
    }
  }, out, _componentDef, "0");
  _marko_tag(_marko_template$1, input, out, _componentDef, "1");
  _marko_tag(_initComponents, {}, out, _componentDef, "2");
  _marko_tag(_awaitReorderer, {}, out, _componentDef, "3");
  _marko_tag(_flush_here_and_after__, {
    "renderBody": (out2) => {
      out2.w(_marko_to_string(g.___viteRenderAssets("body")));
    }
  }, out, _componentDef, "4");
}, {
  t: _marko_componentType,
  i: true
}, _marko_component);
var pageTitle = "Welcome to Marko";
var meta1 = {
  pageTitle
};
async function get1(context, buildInput) {
  return pageResponse(_marko_template, buildInput());
}
globalThis.__marko_run__ = { match, fetch, invoke };
function match(method, pathname) {
  if (!pathname) {
    pathname = "/";
  } else if (pathname.charAt(0) !== "/") {
    pathname = "/" + pathname;
  }
  switch (method) {
    case "GET":
    case "get": {
      const len = pathname.length;
      if (len === 1)
        return { handler: get1, params: {}, meta: meta1, path: "/" };
      return null;
    }
  }
  return null;
}
async function invoke(route, request, platform, url) {
  const [context, buildInput] = createContext(route, request, platform, url);
  if (route) {
    try {
      const response = await route.handler(context, buildInput);
      if (response)
        return response;
    } catch (error) {
      if (error === NotHandled)
        return;
      if (error !== NotMatched)
        throw error;
    }
  }
}
async function fetch(request, platform) {
  try {
    const url = new URL(request.url);
    let { pathname } = url;
    if (pathname !== "/" && pathname.endsWith("/")) {
      url.pathname = pathname.slice(0, -1);
      return Response.redirect(url);
    }
    const route = match(request.method, pathname);
    return await invoke(route, request, platform, url);
  } catch (error) {
    return new Response(null, {
      status: 500
    });
  }
}
async function default_edge_entry_default(request, context) {
  const response = await fetch(request, {
    context
  });
  return response || context.next();
}
var __MARKO_MANIFEST__ = { "__marko-run__route_Td-v": { "head-prepend": null, "head": ["<script", 0, ' async type="module" crossorigin src="', 1, 'assets/_index-5fSE7O_a.js"', "><\/script><link", 0, ' rel="stylesheet" crossorigin href="', 1, 'assets/__marko-run__route._index-_Wn9YLyl.css"', ">"], "body-prepend": null, "body": null } };
export {
  default_edge_entry_default as default
};
