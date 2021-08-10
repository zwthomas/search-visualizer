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
      <button className="start" onClick={() => bfs(colors, setColors, startRow, startCol, dim)}>Start</button>
    </div>
  );
}

function randomPlacement(colors, color, dim) {
  let row = Math.floor(Math.random() * dim)
  let col = Math.floor(Math.random() * dim)
  
  colors[row][col] = color
  return [row, col]
} 

async function bfs(colors, setColors, row, col, dim) {
  console.log("bfs")
  let startPosition = [row, col]
  let q = [startPosition]
  let depth = 0
  while (q.length !== 0) {
    console.log(q)
    let [checkRow, checkCol] = q.shift()

    if (checkRow < 0 || checkRow >= dim || checkCol < 0 || checkCol >= dim) { continue }
    let currentColor = colors[checkRow][checkCol]
    if (currentColor === "black" || (currentColor === "green" && depth > 0) || currentColor === "blue") { continue }

    if (colors[checkRow][checkCol] === "red") {
      console.log("solution")
      return
    }
    await sleep(5);

    let copyColors = [... colors]
    copyColors[checkRow][checkCol] = "blue"
    setColors(copyColors)

    q.push([checkRow - 1, checkCol])
    q.push([checkRow, checkCol - 1])
    q.push([checkRow + 1, checkCol])
    q.push([checkRow, checkCol + 1])
    depth++

  }


}

async function startdfs(colors, setColors, row, col, dim) {
  // await dfs(colors, setColors, row, col, dim, 0)

  let position = [row, col]
  let path = [position]
  let found = false
  found = await dfs(colors, setColors, row - 1, col, dim, 1, path)
  if (!found) {found = await dfs(colors, setColors, row, col - 1, dim, 1, path)}
  if (!found) {found = await dfs(colors, setColors, row + 1, col, dim, 1, path)}
  if (!found) {found = await dfs(colors, setColors,row, col + 1 , dim, 1, path)}
  for (let i = 1; i < path.length; i++) {
    let [row, col] = path[i]
    let colorCopy = [... colors]
    colorCopy[row][col] = "yellow"
    setColors(colorCopy)
    await sleep(50);
  }
  return found
}

async function dfs(colors, setColors, row, col, dim, depth, path) {  
  // console.log("Depth: " + depth)
  if (row < 0 || row >= dim || col < 0 || col >= dim) { return false }
  let currentColor = colors[row][col]
  if (currentColor === "black" || (currentColor === "green" && depth > 0) || currentColor === "blue") { return false}
  if ( currentColor === "red") {console.log("solution"); return true}
  let colorCopy = [... colors]
  colorCopy[row][col] = "blue"
  setColors(colorCopy)
  let position = [row, col]
  path.push(position)
  await sleep(50);
  let found = false
  found = await dfs(colors, setColors, row - 1, col, dim, depth + 1, path)
  if (!found) {found = await dfs(colors, setColors, row, col - 1, dim, depth + 1, path)}
  if (!found) {found = await dfs(colors, setColors, row + 1, col, dim, depth + 1, path)}
  if (!found) {found = await dfs(colors, setColors,row, col + 1 , dim, depth + 1, path)}
  if (!found) {path.pop()}
  return found
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default App;
