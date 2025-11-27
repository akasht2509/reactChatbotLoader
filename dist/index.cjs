"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LoaderBars: () => LoaderBars_default
});
module.exports = __toCommonJS(index_exports);

// src/LoaderBars.tsx
var React = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
function isArray(x) {
  return Array.isArray(x);
}
function widthForIndex(i, spec) {
  if (!spec) return ["60%", "80%", "45%"][i % 3];
  if (Array.isArray(spec)) {
    const val = spec[i % spec.length];
    if (typeof val === "number") return `${val}px`;
    return String(val);
  }
  const min = Math.max(0, spec.min);
  const max = Math.max(min, spec.max);
  const unit = spec.unit ?? "%";
  const w = Math.random() * (max - min) + min;
  return `${Math.round(w)}${unit}`;
}
function gradientForIndex(i, gradients, darkGradients, isDark = false) {
  const src = isDark && darkGradients ? darkGradients : gradients;
  if (!src) {
    const lightDefaults = [
      { from: "#D0E4FD", to: "#F3F8FF" },
      { from: "#FDE3F0", to: "#DCEEFF" },
      { from: "#FFEAF4", to: "#D9EAFE" }
    ];
    const darkDefaults = [
      { from: "#4B5563", to: "#1f2937" },
      { from: "#374151", to: "#111827" },
      { from: "#6B7280", to: "#374151" }
    ];
    const arr = isDark ? darkDefaults : lightDefaults;
    return arr[i % arr.length];
  }
  if (isArray(src)) return src[i % src.length];
  return src;
}
var LoaderBars = ({
  bars = 3,
  widths,
  gradients,
  darkGradients,
  height = 12,
  radius = 9999,
  pulse = true,
  shimmer = false,
  speedMs = 1400,
  respectSystemDark = true,
  ariaLabel = "Loading\u2026",
  className = "",
  style,
  theme = "auto"
}) => {
  const isDark = React.useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    if (!window?.matchMedia) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
    ...style
  };
  const barBase = {
    height,
    borderRadius: radius,
    // For shimmer: animate background-position
    backgroundSize: shimmer ? "200% 100%" : void 0,
    animation: shimmer && pulse ? `loaderbars-shimmer ${speedMs}ms linear infinite, loaderbars-pulse ${Math.round(
      speedMs * 0.9
    )}ms ease-in-out infinite` : shimmer ? `loaderbars-shimmer ${speedMs}ms linear infinite` : pulse ? `loaderbars-pulse ${Math.round(speedMs * 0.9)}ms ease-in-out infinite` : void 0
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes loaderbars-pulse {
          0% { opacity: 0.85; }
          50% { opacity: 0.55; }
          100% { opacity: 0.85; }
        }
        @keyframes loaderbars-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      ` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, style: wrapperStyle, "aria-label": ariaLabel, role: "status", children: Array.from({ length: Math.max(0, bars) }).map((_, i) => {
      const width = widthForIndex(i, widths);
      const { from, to } = gradientForIndex(i, gradients, darkGradients, isDark);
      const bg = `linear-gradient(90deg, ${from}, ${to})`;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          style: {
            ...barBase,
            width,
            backgroundImage: bg
          }
        },
        i
      );
    }) })
  ] });
};
var LoaderBars_default = LoaderBars;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoaderBars
});
