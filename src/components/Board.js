import Square from './Square';

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
            return [squares[a], lines[i]];
        }
    }
    return [null, null];
}


export default function Board({ squares, xIsNext, onPlay, gridSize }) {
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
        let squareColors = Array(gridSize * gridSize).fill(null);
        if (winner) {
            for (let i = 0; i < winningSquares.length; ++i) {
                squareColors[winningSquares[i]] = WIN_SQAURE_COLOR;
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