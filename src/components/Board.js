import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i, x, y) {
    return (
        <Square
            value={this.props.squares[i]}
            click={i === this.props.click}
            onClick={() => this.props.onClick(i, x, y)}
            key={i}
        />
    );
  }

  render() {
    let index = 0;
    return (
        <div>
          {Array(3).fill(Array(3).fill(null)).map((arr, i) => {
            return (
                <div className="board-row" key={i}>
                  {arr.map((value, j) => {
                    return (
                        this.renderSquare(index++, i + 1, j + 1)
                    );
                  })}
                </div>
            );
          })}
        </div>
    );
  }
}

export default Board;