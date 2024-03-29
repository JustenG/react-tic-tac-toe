import { useState } from 'react';
import Board from './Board';

const GRID_SIZE = 3;


export default function Game() {
    const [history, setHistory] = useState([Array(GRID_SIZE * GRID_SIZE).fill(null)]);
    const [historyTarget, setHistoryTarget] = useState(Array(GRID_SIZE * GRID_SIZE).fill(null));
    const [historyIndex, setHistoryIndex] = useState(0);
    const squares = history[historyIndex];
    const xIsNext = historyIndex % 2 === 0

    function handlePlay(nextSquares: Array<string>, index: number) {
        console.log('handlePlay ' + index);
        const nextHistory = [...history.slice(0, historyIndex + 1), nextSquares];
        setHistoryTarget([...historyTarget.slice(0, historyIndex + 1), index]);
        setHistory(nextHistory);
        setHistoryIndex(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
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
                <Board onPlay={handlePlay} xIsNext={xIsNext} squares={squares} gridSize={GRID_SIZE} />
            </div>
            <div className="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10 relative left-10"></div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}