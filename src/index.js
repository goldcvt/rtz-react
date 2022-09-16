import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components';

function* range(start, end) {
  for (let i = start; i <= end; i++) {
      yield i;
  }
}

function Dot(props) {
    const Button = styled.button`
        position: absolute;
        left: ${props => props.x};
        top: ${props => props.y};
    `
  return (
    <button className="dot" onClick={props.onClick}>
      {props.value}
      {props.keyProp}

    </button>
  //   <button className="dot" onClick={console.log("clicked")}>
  //     {props.value}
  //   </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.dotsCountW = 100;
    this.dotsCountH = 100;
    this.step = 100;
    this.state = {
      squares: Array(60).fill({x: 0, y: 0}),
    };
  }
  handleClick(i) {
    console.log(i);
    console.log();
  }
  renderDot(i) {
    this.setState(
        this.state.squares.map((square, squareIdx) => {
            if (squareIdx % this.dotsCountW !== 0) {
                square.x += squareIdx * this.step;
            }
            if (squareIdx % this.dotsCountH !== 0) {
                square.y += squareIdx * this.step;
            }
            return square;
        })
    )
    const {x, y} = this.state.squares[i];
    return (
      <Dot
        x={x}
        y={y}
        key = {i}   
        keyProp = {i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
        <div className="board-row">
          {[[...Array(400).keys()].map(i => this.renderDot(i+1))]}
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
      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
// const element = <h1>Hello, world</h1>;
root.render(<Game />);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
