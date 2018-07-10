import React, { Component } from 'react';
import Board from './Board';
import calculateWinner from '../common/common';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coordinates: Array(9).fill(null),
        order: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      click: -1
    };
  }

  handleClick(i, x, y) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const coordinates = current.coordinates.slice();
    const order = current.order.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    coordinates[i] = '(' + x + ', ' + y + ')';
    order[history.length - 1] = i;
    this.setState({
      history: history.concat([{
        squares: squares,
        coordinates: coordinates,
        order: order,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      click: i
    });
  }

  jumpTo(step, order) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      click: order
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const order = step.order[move - 1];
      const desc = move ?
          'Go to move #' + move + ' ' + step.coordinates[order] :
          'Go to game start';
      return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move, order)}>{desc}</button>
          </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                click={this.state.click}
                size={3}
                onClick={(i, x, y) => this.handleClick(i, x, y)}
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

export default Game;