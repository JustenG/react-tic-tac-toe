"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Board_1 = __importDefault(require("./Board"));
const GRID_SIZE = 3;
function Game() {
    const [history, setHistory] = (0, react_1.useState)([Array(GRID_SIZE * GRID_SIZE).fill(null)]);
    const [historyTarget, setHistoryTarget] = (0, react_1.useState)(Array(GRID_SIZE * GRID_SIZE).fill(null));
    const [historyIndex, setHistoryIndex] = (0, react_1.useState)(0);
    const squares = history[historyIndex];
    const xIsNext = historyIndex % 2 === 0;
    function handlePlay(nextSquares, index) {
        console.log('handlePlay ' + index);
        const nextHistory = [...history.slice(0, historyIndex + 1), nextSquares];
        setHistoryTarget([...historyTarget.slice(0, historyIndex + 1), index]);
        setHistory(nextHistory);
        setHistoryIndex(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setHistoryIndex(nextMove);
    }
    const moves = history.map((squares, move) => {
        let element;
        let description;
        const player = (move % 2 === 0) ? "O" : "X";
        if (move > 0) {
            const moveCord = historyTarget[move] + 1;
            const x = Math.floor((moveCord - 1) / 3) % 3;
            const y = (moveCord - 1) % 3;
            const cordStr = " " + player + " (" + x + "," + y + ")";
            if (move == historyIndex) {
                description = 'You are at move #' + move + cordStr;
                element = (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chat chat-start" }, { children: [" ", (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "chat-bubble" }, { children: description }))] }));
            }
            else {
                description = 'Go to move #' + move + cordStr;
                element = (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-wide", onClick: () => jumpTo(move) }, { children: description }));
            }
        }
        else {
            if (historyIndex > 0) {
                description = 'Go to game start';
                element = (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-wide", onClick: () => jumpTo(move) }, { children: description }));
            }
            else {
                description = 'Start Game!';
                element = (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chat chat-start" }, { children: [" ", (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "chat-bubble" }, { children: description }))] }));
            }
        }
        return ((0, jsx_runtime_1.jsx)("li", { children: element }, move));
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "game" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "game-board" }, { children: (0, jsx_runtime_1.jsx)(Board_1.default, { onPlay: handlePlay, xIsNext: xIsNext, squares: squares, gridSize: GRID_SIZE }) })), (0, jsx_runtime_1.jsx)("div", { className: "inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10 relative left-10" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "game-info" }, { children: (0, jsx_runtime_1.jsx)("ol", { children: moves }) }))] })));
}
exports.default = Game;
