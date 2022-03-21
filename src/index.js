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

  render() {
    const status = `Next player: ${this.state.nextStep ? 'X' : 'O'}`;

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

ReactDOM.render(
    <React.StrictMode>
      <Game />
    </React.StrictMode>,
  document.getElementById('root')
);
