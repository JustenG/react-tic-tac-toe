"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Square({ value, onSquareClicked, txtColor }) {
    let graphic = null;
    if (value === "X") {
        graphic = (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", stroke: txtColor, d: "M6 18L18 6M6 6l12 12" });
    }
    else if (value === "O") {
        graphic = (0, jsx_runtime_1.jsx)("circle", { r: "10", cx: "12", cy: "12", stroke: txtColor, strokeWidth: "3" });
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-square btn-outline", onClick: () => onSquareClicked(), color: txtColor }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: graphic })) })) }));
}
exports.default = Square;
