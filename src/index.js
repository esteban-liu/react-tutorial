import React from "react";
import ReactDom from "react-dom/client"
//
import "./index.css";

// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square"
//                     onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }


function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    lastPos: Array(2).fill(null), // [colNum, rowNum]
                },
            ],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        let colNum = i % 3 + 1;
        let rowNum = Math.trunc(i / 3) + 1;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                lastPos: [colNum, rowNum],
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(number) {
        this.setState({
            xIsNext: (number % 2) === 0,
            stepNumber: number,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((value, number) => {
            const desc = number
                ? `Go to move #${number},
                 col:${value['lastPos'][0]}, 
                 row:${value['lastPos'][1]}`
                : 'Start';
            return (
                <li key={number}>
                    <button onClick={() => this.jumpTo(number)}>{desc}</button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner
        } else if (this.state.stepNumber === 9) { // When no one wins, display a message about the result being a draw.
            status = 'No winner'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => {
                            this.handleClick(i)
                        }}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


//
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Game/>);


//
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}