import React from 'react';
import './App.css';

// 1. 棋格元件 (Function Component)
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// 2. 棋盤元件 (Class Component)
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

// 3. 遊戲核心元件 (Class Component) - 管理歷史紀錄與時間旅行
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    // 如果已有贏家或該格已被點過，則不作任何事
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // 建立時間旅行的歷史步驟按鈕
    const moves = history.map((step, move) => {
      const desc = move ?
        '回到步驟 #' + move :
        '回到遊戲開始';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} style={{ margin: '4px', padding: '4px 8px' }}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = '贏家是: ' + winner;
    } else if (this.state.stepNumber === 9) {
      status = '平手！';
    } else {
      status = '下一 penal 玩家: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // 1. 最外層縱向容器
      <div className="game-container">
        
        {/* 2. 標題移到最上方中央 */}
        <h1 className="game-title">React — OX 遊戲</h1>
        
        {/* 3. 下方的遊戲卡片主體 */}
        <div className="game-card">
          
          {/* 左半邊：九宮格棋盤 */}
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          
          {/* 右半邊：遊戲狀態與時間旅行按鈕 */}
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>

        </div>
      </div>
    );
  }
}

// 4. 計算勝負的輔助函數
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫向連線
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縱向連線
    [0, 4, 8], [2, 4, 6],             // 斜向連線
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;