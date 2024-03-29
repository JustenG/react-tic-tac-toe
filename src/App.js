import { useState } from 'react';

const GRID_SIZE = 3;
const WIN_SQAURE_COLOR = "red";

function Square({ value, onSquareClicked, txtColor }) {
    let graphic = null;
    if (value === "X") {
        graphic = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" stroke={txtColor} d="M6 18L18 6M6 6l12 12" />;
    } else if (value === "O") {
        graphic = <circle r="10" cx="12" cy="12" stroke={txtColor} strokeWidth="3" />;
    }

    return (
        <>
            <button className="btn btn-square btn-outline" onClick={onSquareClicked} color={txtColor}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {graphic}
                </svg>
            </button>
        </>
    );
}


export function Board({ squares, xIsNext, onPlay }) {
    function handleClick(i) {
        console.log('clicked!');
        if (squares[i] || calculateWinner(squares)[0]) {
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
    let [winner, winningSquares] = calculateWinner(squares);
    if (winner) {
        status = "Winner: ";
        statusValue = winner;
    }
    else {
        status = "Next player: ";
        statusValue = (xIsNext ? "X" : "O");
    }

    function renderSquares() {
        let squareStr = [];
        let squareColors = Array(GRID_SIZE * GRID_SIZE).fill(null);
        if (winner) {
            for (let i = 0; i < winningSquares.length; ++i) {
                squareColors[winningSquares[i]] = WIN_SQAURE_COLOR;
            }
        }

        for (let i = 0; i < GRID_SIZE; ++i) {
            let row = [];
            for (let j = 0; j < GRID_SIZE; ++j) {
                let index = (i * GRID_SIZE) + j;
                let squareColor = squareColors[index];
                row.push(<Square key={index} value={squares[index]} onSquareClicked={() => handleClick(index)} txtColor={squareColor} />);
            }
            squareStr.push(<div key={i} className="board-row">{row}</div>);
        }
        return squareStr;
    }

    return (
        <>
            <div>
                <h2 className="text-xl">
                    {status}
                    <span className="badge badge-lg">{statusValue}</span>
                </h2>
            </div>
            <div className="divider" />
            {renderSquares()}
        </>
    );
}


export default function Game() {
    const [history, setHistory] = useState([Array(GRID_SIZE * GRID_SIZE).fill(null)]);
    const [historyTarget, setHistoryTarget] = useState(Array(GRID_SIZE * GRID_SIZE).fill(null));
    const [historyIndex, setHistoryIndex] = useState(0);
    const squares = history[historyIndex];
    const xIsNext = historyIndex % 2 === 0

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
            const y = (moveCord - 1) % 3
            const cordStr = " " + player + " (" + x + "," + y + ")";

            if (move == historyIndex) {
                description = 'You are at move #' + move + cordStr;
                element = <div className="chat chat-start"> <div className="chat-bubble">{description}</div></div>;
            } else {
                description = 'Go to move #' + move + cordStr;
                element = <button className="btn btn-wide" onClick={() => jumpTo(move)}>{description}</button>;
            }

        } else {
            if (historyIndex > 0) {
                description = 'Go to game start';
                element = <button className="btn btn-wide" onClick={() => jumpTo(move)}>{description}</button>;
            } else {
                description = 'Start Game!';
                element = <div className="chat chat-start"> <div className="chat-bubble">{description}</div></div>;
            }
        }
        return (
            <li key={move}>
                {element}
            </li>
        );
    });


    return (
        <div className="game">
            <div className="game-board">
                <Board onPlay={handlePlay} xIsNext={xIsNext} squares={squares} />
            </div>
            <div class="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10 relative left-10"></div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}


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
            return [squares[a], lines[i]];
        }
    }
    return [null, null];
}