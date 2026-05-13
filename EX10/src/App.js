import React from 'react';
import './App.css';

const styleArgument = { 
    fontSize: '100px', 
    color: 'red',
    cursor: 'pointer' // 讓滑鼠移上去變手指圖案
};

const changeText = (event) => {
    console.log(event.target);
    event.target.innerText = event.target.innerText + "被點了";
};

function App() {
  return (
    <div className="App">
      {/* 加上 onClick 事件與 style */}
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
    </div>
  );
}

export default App;