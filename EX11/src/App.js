import React, { useState } from 'react'; // 引入 useState 勾子
import './App.css';

function App() {
  // 定義 state，count 是數值，setCount 是改變數值的方法
  const [count, setCount] = useState(0);

  // 定義樣式
  const textStyle = {
    fontSize: '50px',
    color: 'blue'
  };

  const buttonStyle = {
    fontSize: '20px',
    margin: '10px',
    padding: '10px 20px',
    cursor: 'pointer'
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React State 練習</h1>
      
      {/* 顯示目前的數字 */}
      <div style={textStyle}>目前計數：{count}</div>

      {/* 按鈕點擊事件  */}
      <button style={buttonStyle} onClick={() => setCount(count + 1)}>
        +1
      </button>
      
      <button style={buttonStyle} onClick={() => setCount(count - 1)}>
        -1
      </button>

      <div style={{ marginTop: '20px' }}>
        <p>長庚大學 資工系</p>
      </div>
    </div>
  );
}

export default App;