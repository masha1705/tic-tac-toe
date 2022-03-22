import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    return (
      <button 
        className="square"
        onClick={ props.onClick }
      >
      { props.value}
      </button>
    );
  }

function RestartButton (props) {
    return (
        <button 
          id="restart-button"
            style={{ display: props.display }} 
            onClick={ props.onClick}
        >
          Restart
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: new Array(9).fill(null),
        nextStep: true
      };
    }

    renderSquare(i) {
    return (
     <Square 
       value={ this.state.squares[i] } 
       onClick = { () => this.handleClick(i) }
    />
     );
    }

  handleClick(i) {
    if (this.state.squares[i]) {
      return;
    }
    
    const newSquares = this.state.squares.slice();
    newSquares[i] = this.state.nextStep ? 'X': 'O';
    this.setState({ 
      squares: newSquares,
      nextStep: !this.state.nextStep
    });
  }

  restartGame() {
    this.setState({
      squares: new Array(9).fill(null),
      nextStep: true
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const endGame = !this.state.squares.includes(null);
    let status = '';

    if (winner) {
      status = `The winner is ${calculateWinner(this.state.squares)}`
    } else if (endGame) {
      status = 'Game over';
    } else {
      status = `Next player: ${this.state.nextStep ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
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
        <RestartButton display={ winner || endGame ? 'block' : 'none'} 
          onClick={ () => this.restartGame()}
        />
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
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

// function ckeckEndGame(squares) {
//   return !squares.includes(null);
// }

ReactDOM.render(
    <React.StrictMode>
      <Game />
    </React.StrictMode>,
  document.getElementById('root')
);
