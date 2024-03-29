import { bool, func } from 'prop-types';
import Square from './Square';
import { boolean, number } from 'yargs';

const WIN_SQAURE_COLOR = "red";

type BoardProps = {
    squares: Array<string>,
    xIsNext: Boolean, 
    onPlay: Function, 
    gridSize: number
}

type WinnerData = {
    player?: string,
    winTable?: number[],
}


function calculateWinner(squares: Array<string>): WinnerData {
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
    return { };
}


export default function Board({ squares, xIsNext, onPlay, gridSize } : BoardProps) {
    function handleClick(i: number) {
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