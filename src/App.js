import React, { useState } from 'react';
import PriorityQueue from 'js-priority-queue';

import SearchHolder from './components/SearchHolder/SearchHolder';

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

  let [row, col] = randomPlacement(startingColors, "green", dim)
  
  let [startRow, setStartRow] = useState(row)
  let [startCol, setStartCol] = useState(col)

  let [endrow, endcol] = randomPlacement(startingColors, "red", dim)
  let [endRow, setEndRow] = useState(endrow)
  let [endCol, setEndCol] = useState(endcol)


  let [colors, setColors] = useState(startingColors)
  let [mouseDown, setMouseDown] = useState(false);

  for (let i = 0; i < dim; i++) {
    template.push(<div className="grid" />)
  }
  return (
    <div className="App">
      <SearchHolder colors={colors} setColors={setColors} mouseDown={mouseDown} setMouseDown={setMouseDown} template={template}/>
      <button className="start" onClick={() => astar(colors, setColors, startRow, startCol, endRow, endCol, dim)}>Start</button>
    </div>
  );
}

function randomPlacement(colors, color, dim) {
  let row = Math.floor(Math.random() * dim)
  let col = Math.floor(Math.random() * dim)

  console.log("Generated")
  console.log(row + " " + col)
  
  colors[row][col] = color
  return [row, col]
} 

async function astar(colors, setColors, startRow, startCol, endRow, endCol, dim) {
  let q = new PriorityQueue({comparator: function(a, b) {
    let [aRow, aCol] = a[a.length - 1]
    let aHeuristic = a.length + Math.hypot(endCol - aCol, endRow - aRow)

    let [bRow, bCol] = b[b.length - 1]
    let bHeuristic = b.length + Math.hypot(endCol - bCol, endRow - bRow)

    return aHeuristic - bHeuristic
  }})

  q.queue([[startRow - 1, startCol]])
  q.queue([[startRow, startCol - 1]])
  q.queue([[startRow + 1, startCol]])
  q.queue([[startRow, startCol + 1]])
  // let path = q.dequeue()
  // let position = path[path.length - 1]

  let depth = 0
  while(q.length > 0) {
    let path = q.dequeue()
    let position = path[path.length - 1]
    let [checkRow, checkCol] = position
    // console.log(checkRow + " " + checkCol)

    if (checkRow < 0 || checkRow >= dim || checkCol < 0 || checkCol >= dim) { continue }
    let currentColor = colors[checkRow][checkCol]
    if (currentColor === "black" || (currentColor === "green" && depth > 0) || currentColor === "blue") { continue }

    if (colors[checkRow][checkCol] === "red") {
      console.log("solution")
      for (let i = 0; i < path.length - 1; i++) {
        let [row, col] = path[i]
        let colorCopy = [... colors]
        colorCopy[row][col] = "yellow"
        setColors(colorCopy)
        await sleep(50);
      }
      return
    }
    await sleep(5);

    let copyColors = [... colors]
    copyColors[checkRow][checkCol] = "blue"
    setColors(copyColors)

    path.push([checkRow - 1, checkCol])
    q.queue([... path])
    path.pop()

    path.push([checkRow, checkCol - 1])
    q.queue([... path])
    path.pop()

    path.push([checkRow + 1, checkCol])
    q.queue([... path])
    path.pop()

    path.push([checkRow, checkCol + 1])
    q.queue([... path])
    path.pop()

    depth++
  }
  // for (let i = 0; i < 4; i++) {
  //   let position = path[path.length - 1]
  //   console.log(position)
  //   let copyColors = [... colors]
  //   copyColors[position[0]][position[1]] = "yellow"
  //   setColors(copyColors)
  // }
  // let cRow = position[0] 
  // let cCol = position[1]
  // console.log(cRow)
  // console.log(cCol)
  // let colorCopy = [... colors]
  // colorCopy[cRow][cCol] = "yellow"
  // setColors(colorCopy)

}

async function bfs(colors, setColors, row, col, dim) {
  console.log("bfs")
  let startPosition = [row, col]
  let q = []
  q.push([[row - 1, col]])
  q.push([[row, col - 1]])
  q.push([[row + 1, col]])
  q.push([[row, col + 1]])

  let depth = 0
  while (q.length !== 0) {
    console.log(q)
    let path = q.shift()
    let [checkRow, checkCol] = path[path.length - 1]

    if (checkRow < 0 || checkRow >= dim || checkCol < 0 || checkCol >= dim) { continue }
    let currentColor = colors[checkRow][checkCol]
    if (currentColor === "black" || (currentColor === "green" && depth > 0) || currentColor === "blue") { continue }

    if (colors[checkRow][checkCol] === "red") {
      console.log("solution")
      for (let i = 0; i < path.length - 1; i++) {
        let [row, col] = path[i]
        let colorCopy = [... colors]
        colorCopy[row][col] = "yellow"
        setColors(colorCopy)
        await sleep(50);
      }
      return
    }
    await sleep(5);

    let copyColors = [... colors]
    copyColors[checkRow][checkCol] = "blue"
    setColors(copyColors)


    path.push([checkRow - 1, checkCol])
    q.push([... path])
    path.pop()

    path.push([checkRow, checkCol - 1])
    q.push([... path])
    path.pop()

    path.push([checkRow + 1, checkCol])
    q.push([... path])
    path.pop()

    path.push([checkRow, checkCol + 1])
    q.push([... path])
    path.pop()

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
