"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Square_1 = __importDefault(require("./Square"));
const WIN_SQAURE_COLOR = "red";
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { player: squares[a], winTable: lines[i] };
        }
    }
    return {};
}
function Board({ squares, xIsNext, onPlay, gridSize }) {
    function handleClick(i) {
        console.log('clicked!');
        if (squares[i] || calculateWinner(squares).player) {
            return;
        }
        const squaresCache = squares.slice();
        if (xIsNext) {
            squaresCache[i] = "X";
        }
        else {
            squaresCache[i] = "O";
        }
        onPlay(squaresCache, i);
    }
    let status;
    let statusValue;
    let winnerData = calculateWinner(squares);
    if (winnerData.player) {
        status = "Winner: ";
        statusValue = winnerData.player;
    }
    else {
        status = "Next player: ";
        statusValue = (xIsNext ? "X" : "O");
    }
    function renderSquares() {
        let squareStr = [];
        let squareColors = Array(gridSize * gridSize).fill(null);
        if (winnerData.player && winnerData.winTable) {
            for (let i = 0; i < winnerData.winTable.length; ++i) {
                squareColors[winnerData.winTable[i]] = WIN_SQAURE_COLOR;
            }
        }
        for (let i = 0; i < gridSize; ++i) {
            let row = [];
            for (let j = 0; j < gridSize; ++j) {
                let index = (i * gridSize) + j;
                let squareColor = squareColors[index];
                row.push((0, jsx_runtime_1.jsx)(Square_1.default, { value: squares[index], onSquareClicked: () => handleClick(index), txtColor: squareColor }, index));
            }
            squareStr.push((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "board-row" }, { children: row }), i));
        }
        return squareStr;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("h2", Object.assign({ className: "text-xl" }, { children: [status, (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "badge badge-lg" }, { children: statusValue }))] })) }), (0, jsx_runtime_1.jsx)("div", { className: "divider" }), renderSquares()] }));
}
exports.default = Board;
