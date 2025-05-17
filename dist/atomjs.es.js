import xe, { useSyncExternalStore as dr, createContext as vr, useContext as we, useRef as pr } from "react";
function Ce(f, s) {
  if (Object.is(f, s)) return !0;
  if (!f || !s || typeof f != "object" || typeof s != "object") return !1;
  const a = Object.keys(f), i = Object.keys(s);
  return a.length !== i.length ? !1 : a.every((d) => Object.is(f[d], s[d]));
}
function gr(f, s = []) {
  let a = { ...f }, i = [];
  const d = [a];
  let h = 0;
  const p = () => a;
  let v = (E) => {
    const w = a;
    a = { ...a, ...E }, Ce(w, a) || (h < d.length - 1 && d.splice(h + 1), d.push(a), h++), i.forEach((J) => J(a, w));
  };
  for (const E of s)
    v = E(v, p).set;
  return { get: p, set: v, subscribe: (E) => (i.push(E), () => {
    i = i.filter((w) => w !== E);
  }), snapshot: () => d.slice(), undo: () => {
    if (h > 0) {
      const E = a;
      h--, a = d[h], i.forEach((w) => w(a, E));
    }
  }, redo: () => {
    if (h < d.length - 1) {
      const E = a;
      h++, a = d[h], i.forEach((w) => w(a, E));
    }
  } };
}
function yr(f, s, a = Ce) {
  const i = () => s(f.get());
  return dr(f.subscribe, i, i);
}
var U = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function hr() {
  if (Oe) return $;
  Oe = 1;
  var f = xe, s = Symbol.for("react.element"), a = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, d = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, h = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(R, v, C) {
    var m, T = {}, P = null, E = null;
    C !== void 0 && (P = "" + C), v.key !== void 0 && (P = "" + v.key), v.ref !== void 0 && (E = v.ref);
    for (m in v) i.call(v, m) && !h.hasOwnProperty(m) && (T[m] = v[m]);
    if (R && R.defaultProps) for (m in v = R.defaultProps, v) T[m] === void 0 && (T[m] = v[m]);
    return { $$typeof: s, type: R, key: P, ref: E, props: T, _owner: d.current };
  }
  return $.Fragment = a, $.jsx = p, $.jsxs = p, $;
}
var W = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Te;
function Er() {
  return Te || (Te = 1, process.env.NODE_ENV !== "production" && function() {
    var f = xe, s = Symbol.for("react.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), R = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), E = Symbol.for("react.offscreen"), w = Symbol.iterator, J = "@@iterator";
    function je(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = w && e[w] || e[J];
      return typeof r == "function" ? r : null;
    }
    var D = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ke("error", e, t);
      }
    }
    function ke(e, r, t) {
      {
        var n = D.ReactDebugCurrentFrame, c = n.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var l = t.map(function(u) {
          return String(u);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var De = !1, Ae = !1, Fe = !1, Ie = !1, Le = !1, Q;
    Q = Symbol.for("react.module.reference");
    function $e(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === i || e === h || Le || e === d || e === C || e === m || Ie || e === E || De || Ae || Fe || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === T || e.$$typeof === p || e.$$typeof === R || e.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Q || e.getModuleId !== void 0));
    }
    function We(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function ee(e) {
      return e.displayName || "Context";
    }
    function x(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case i:
          return "Fragment";
        case a:
          return "Portal";
        case h:
          return "Profiler";
        case d:
          return "StrictMode";
        case C:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var r = e;
            return ee(r) + ".Consumer";
          case p:
            var t = e;
            return ee(t._context) + ".Provider";
          case v:
            return We(e, e.render, "ForwardRef");
          case T:
            var n = e.displayName || null;
            return n !== null ? n : x(e.type) || "Memo";
          case P: {
            var c = e, l = c._payload, u = c._init;
            try {
              return x(u(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var j = Object.assign, I = 0, re, te, ne, ae, oe, ie, ue;
    function se() {
    }
    se.__reactDisabledLog = !0;
    function Ye() {
      {
        if (I === 0) {
          re = console.log, te = console.info, ne = console.warn, ae = console.error, oe = console.group, ie = console.groupCollapsed, ue = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: se,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        I++;
      }
    }
    function Ve() {
      {
        if (I--, I === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: j({}, e, {
              value: re
            }),
            info: j({}, e, {
              value: te
            }),
            warn: j({}, e, {
              value: ne
            }),
            error: j({}, e, {
              value: ae
            }),
            group: j({}, e, {
              value: oe
            }),
            groupCollapsed: j({}, e, {
              value: ie
            }),
            groupEnd: j({}, e, {
              value: ue
            })
          });
        }
        I < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var q = D.ReactCurrentDispatcher, B;
    function Y(e, r, t) {
      {
        if (B === void 0)
          try {
            throw Error();
          } catch (c) {
            var n = c.stack.trim().match(/\n( *(at )?)/);
            B = n && n[1] || "";
          }
        return `
` + B + e;
      }
    }
    var X = !1, V;
    {
      var Me = typeof WeakMap == "function" ? WeakMap : Map;
      V = new Me();
    }
    function ce(e, r) {
      if (!e || X)
        return "";
      {
        var t = V.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      X = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = q.current, q.current = null, Ye();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (S) {
              n = S;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (S) {
              n = S;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (S) {
            n = S;
          }
          e();
        }
      } catch (S) {
        if (S && n && typeof S.stack == "string") {
          for (var o = S.stack.split(`
`), b = n.stack.split(`
`), g = o.length - 1, y = b.length - 1; g >= 1 && y >= 0 && o[g] !== b[y]; )
            y--;
          for (; g >= 1 && y >= 0; g--, y--)
            if (o[g] !== b[y]) {
              if (g !== 1 || y !== 1)
                do
                  if (g--, y--, y < 0 || o[g] !== b[y]) {
                    var O = `
` + o[g].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, O), O;
                  }
                while (g >= 1 && y >= 0);
              break;
            }
        }
      } finally {
        X = !1, q.current = l, Ve(), Error.prepareStackTrace = c;
      }
      var F = e ? e.displayName || e.name : "", k = F ? Y(F) : "";
      return typeof e == "function" && V.set(e, k), k;
    }
    function Ne(e, r, t) {
      return ce(e, !1);
    }
    function Ue(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function M(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ce(e, Ue(e));
      if (typeof e == "string")
        return Y(e);
      switch (e) {
        case C:
          return Y("Suspense");
        case m:
          return Y("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case v:
            return Ne(e.render);
          case T:
            return M(e.type, r, t);
          case P: {
            var n = e, c = n._payload, l = n._init;
            try {
              return M(l(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var L = Object.prototype.hasOwnProperty, fe = {}, le = D.ReactDebugCurrentFrame;
    function N(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        le.setExtraStackFrame(t);
      } else
        le.setExtraStackFrame(null);
    }
    function Je(e, r, t, n, c) {
      {
        var l = Function.call.bind(L);
        for (var u in e)
          if (l(e, u)) {
            var o = void 0;
            try {
              if (typeof e[u] != "function") {
                var b = Error((n || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw b.name = "Invariant Violation", b;
              }
              o = e[u](r, u, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (g) {
              o = g;
            }
            o && !(o instanceof Error) && (N(c), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, u, typeof o), N(null)), o instanceof Error && !(o.message in fe) && (fe[o.message] = !0, N(c), _("Failed %s type: %s", t, o.message), N(null));
          }
      }
    }
    var qe = Array.isArray;
    function K(e) {
      return qe(e);
    }
    function Be(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Xe(e) {
      try {
        return de(e), !1;
      } catch {
        return !0;
      }
    }
    function de(e) {
      return "" + e;
    }
    function ve(e) {
      if (Xe(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), de(e);
    }
    var pe = D.ReactCurrentOwner, Ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, ye;
    function Ge(e) {
      if (L.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ze(e) {
      if (L.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function He(e, r) {
      typeof e.ref == "string" && pe.current;
    }
    function Ze(e, r) {
      {
        var t = function() {
          ge || (ge = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          ye || (ye = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var er = function(e, r, t, n, c, l, u) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: l
      };
      return o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(o, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(o, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function rr(e, r, t, n, c) {
      {
        var l, u = {}, o = null, b = null;
        t !== void 0 && (ve(t), o = "" + t), ze(r) && (ve(r.key), o = "" + r.key), Ge(r) && (b = r.ref, He(r, c));
        for (l in r)
          L.call(r, l) && !Ke.hasOwnProperty(l) && (u[l] = r[l]);
        if (e && e.defaultProps) {
          var g = e.defaultProps;
          for (l in g)
            u[l] === void 0 && (u[l] = g[l]);
        }
        if (o || b) {
          var y = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && Ze(u, y), b && Qe(u, y);
        }
        return er(e, o, b, c, n, pe.current, u);
      }
    }
    var G = D.ReactCurrentOwner, he = D.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        he.setExtraStackFrame(t);
      } else
        he.setExtraStackFrame(null);
    }
    var z;
    z = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === s;
    }
    function Ee() {
      {
        if (G.current) {
          var e = x(G.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      return "";
    }
    var _e = {};
    function nr(e) {
      {
        var r = Ee();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function be(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (_e[t])
          return;
        _e[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + x(e._owner.type) + "."), A(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function Re(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            H(n) && be(n, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = je(e);
          if (typeof c == "function" && c !== e.entries)
            for (var l = c.call(e), u; !(u = l.next()).done; )
              H(u.value) && be(u.value, r);
        }
      }
    }
    function ar(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === T))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = x(r);
          Je(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !z) {
          z = !0;
          var c = x(r);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function or(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var me = {};
    function Se(e, r, t, n, c, l) {
      {
        var u = $e(e);
        if (!u) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var b = tr();
          b ? o += b : o += Ee();
          var g;
          e === null ? g = "null" : K(e) ? g = "array" : e !== void 0 && e.$$typeof === s ? (g = "<" + (x(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : g = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", g, o);
        }
        var y = rr(e, r, t, c, l);
        if (y == null)
          return y;
        if (u) {
          var O = r.children;
          if (O !== void 0)
            if (n)
              if (K(O)) {
                for (var F = 0; F < O.length; F++)
                  Re(O[F], e);
                Object.freeze && Object.freeze(O);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Re(O, e);
        }
        if (L.call(r, "key")) {
          var k = x(e), S = Object.keys(r).filter(function(lr) {
            return lr !== "key";
          }), Z = S.length > 0 ? "{key: someKey, " + S.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!me[k + Z]) {
            var fr = S.length > 0 ? "{" + S.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Z, k, fr, k), me[k + Z] = !0;
          }
        }
        return e === i ? or(y) : ar(y), y;
      }
    }
    function ir(e, r, t) {
      return Se(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Se(e, r, t, !1);
    }
    var sr = ur, cr = ir;
    W.Fragment = i, W.jsx = sr, W.jsxs = cr;
  }()), W;
}
var Pe;
function _r() {
  return Pe || (Pe = 1, process.env.NODE_ENV === "production" ? U.exports = hr() : U.exports = Er()), U.exports;
}
var br = _r();
function mr(f, s = []) {
  const a = vr(null), i = ({ children: p }) => {
    const R = pr();
    return R.current || (R.current = gr(f, s)), /* @__PURE__ */ br.jsx(a.Provider, { value: R.current, children: p });
  };
  function d(p, R) {
    const v = we(a);
    if (!v) throw new Error("Store context missing");
    return yr(v, p, R);
  }
  function h() {
    const p = we(a);
    if (!p) throw new Error("Store context missing");
    return p;
  }
  return { Provider: i, useScopedStore: d, getStore: h };
}
const Sr = () => (f, s) => ({
  set: (a) => {
    console.log("%c[Logger] Before:", "color: gray", s()), console.log("%c[Logger] Set:", "color: blue", a), f(a), console.log("%c[Logger] After:", "color: green", s());
  }
}), wr = (f) => (s, a) => {
  if (typeof window < "u") {
    try {
      const i = localStorage.getItem(f);
      i && s(JSON.parse(i));
    } catch {
    }
    window.addEventListener("storage", (i) => {
      if (i.key === f && i.newValue)
        try {
          s(JSON.parse(i.newValue));
        } catch {
        }
    });
  }
  return {
    set: (i) => {
      const d = { ...a(), ...i };
      if (typeof window < "u")
        try {
          localStorage.setItem(f, JSON.stringify(d));
        } catch {
        }
      s(i);
    }
  };
}, Or = () => (f, s) => ({
  set: (a) => {
    const i = Object.keys(a);
    for (const d of i) {
      const h = a[d];
      if (h instanceof Promise) {
        f({ isLoading: !0, error: null }), h.then((p) => {
          f({ ...p, isLoading: !1 });
        }).catch((p) => {
          f({
            error: (p == null ? void 0 : p.message) || "Error",
            isLoading: !1
          });
        });
        return;
      }
    }
    f(a);
  }
}), Tr = (f = "SuperState") => {
  let s;
  return (a, i) => (typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__ && (s = window.__REDUX_DEVTOOLS_EXTENSION__.connect({ name: f }), s.init(i())), {
    set: (d) => {
      a(d), s == null || s.send("SET_STATE", i());
    }
  });
};
export {
  Or as asyncMiddleware,
  mr as createContextStore,
  gr as createStore,
  Tr as devtoolsMiddleware,
  Sr as loggerMiddleware,
  wr as persistMiddleware,
  yr as useStore
};
