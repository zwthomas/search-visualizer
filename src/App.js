import React, { useState } from 'react';
import PriorityQueue from 'js-priority-queue';

import SearchHolder from './components/SearchHolder/SearchHolder';
import Header from './components/Header/Header';

import './App.css';

function App() {

  let dim = 20
  let template = []
  let startingColors = []
  for (let i = 0; i < dim; i++) {
    let tempColors = []
    for (let j = 0; j < dim; j++) {
      tempColors.push("white")
    }
    startingColors.push(tempColors)
  }

  let row = Math.floor(dim / 2)
  let sCol = Math.floor(row / 2)

  startingColors[row][sCol] = "green"
  let [startRow, setStartRow] = useState(row)
  let [startCol, setStartCol] = useState(sCol)


  startingColors[row][dim - sCol] = "red"
  let [endRow, setEndRow] = useState(row)
  let [endCol, setEndCol] = useState(dim - sCol)


  let [colors, setColors] = useState(startingColors)
  let [mouseDown, setMouseDown] = useState(false);
  let [algorithm, setAlgorithm] = useState("bfs");
  let [searched, setSearched] = useState(false)
  let [running, setRunning] = useState(false)

  for (let i = 0; i < dim; i++) {
    template.push(<div className="grid" />)
  }
  return (
    <div className="App">
      <Header 
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        colors={colors}
        setColors={setColors}
        startRow={startRow}
        startCol={startCol}
        endRow={endRow}
        endCol={endCol}
        dim={dim}
        searched={searched}
        setSearched={setSearched}
        running={running}
        setRunning={setRunning}
      />
      <SearchHolder colors={colors} setColors={setColors} mouseDown={mouseDown} setMouseDown={setMouseDown} template={template} />
    </div>
  );
}


function randomPlacement(colors, color, dim) {
  let row = Math.floor(Math.random() * dim)
  let col = Math.floor(Math.random() * dim)

  console.log("Generated")
  console.log(row + " " + col)

  // colors[row][col] = color
  return [row, col]
}



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default App;
