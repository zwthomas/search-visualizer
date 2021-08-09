import React, { useState } from 'react';

import SearchHolder from './components/SearchHolder/SearchHolder';

import './App.css';
import { computeHeadingLevel } from '@testing-library/react';

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

  let [row, col] = randomPlacement(startingColors, "green", dim)
  let [startRow, setStartRow] = useState(row)
  let [startCol, setStartCol] = useState(col)

  randomPlacement(startingColors, "red", dim)
  let [colors, setColors] = useState(startingColors)
  let [mouseDown, setMouseDown] = useState(false);

  for (let i = 0; i < dim; i++) {
    template.push(<div className="grid" />)
  }
  return (
    <div className="App">
      <SearchHolder colors={colors} setColors={setColors} mouseDown={mouseDown} setMouseDown={setMouseDown} template={template}/>
      <button className="start" onClick={() => dfs(colors, setColors, startRow, startCol, dim, 0)}>Start</button>
    </div>
  );
}

function randomPlacement(colors, color, dim) {
  let row = Math.floor(Math.random() * dim)
  let col = Math.floor(Math.random() * dim)
  
  colors[row][col] = color
  return [row, col]
} 

async function dfs(colors, setColors, row, col, dim, depth) {  
  // console.log("Depth: " + depth)
  if (row < 0 || row >= dim || col < 0 || col >= dim) { return false }
  let currentColor = colors[row][col]
  if (currentColor === "black" || (currentColor === "green" && depth > 0) || currentColor === "blue") { return false}
  if ( currentColor === "red") {console.log("solution"); return true}
  let colorCopy = [... colors]
  colorCopy[row][col] = "blue"
  setColors(colorCopy)
  await sleep(50);
  let found = false
  found = await dfs(colors, setColors, row - 1, col, dim, depth + 1)
  if (!found) {found = await dfs(colors, setColors, row, col - 1, dim, depth + 1)}
  if (!found) {found = await dfs(colors, setColors, row + 1, col, dim, depth + 1)}
  if (!found) {found = await dfs(colors, setColors,row, col + 1 , dim, depth + 1)}
  return found
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default App;
