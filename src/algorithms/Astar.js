import PriorityQueue from 'js-priority-queue';

import sleep from "../helpers/Sleep"


async function astar(colors, setColors, startRow, startCol, endRow, endCol, dim) {
    let q = new PriorityQueue({
      comparator: function (a, b) {
        let [aRow, aCol] = a[a.length - 1]
        let aHeuristic = a.length + Math.hypot(endCol - aCol, endRow - aRow)
  
        let [bRow, bCol] = b[b.length - 1]
        let bHeuristic = b.length + Math.hypot(endCol - bCol, endRow - bRow)
  
        return aHeuristic - bHeuristic
      }
    })
  
    q.queue([[startRow - 1, startCol]])
    q.queue([[startRow, startCol - 1]])
    q.queue([[startRow + 1, startCol]])
    q.queue([[startRow, startCol + 1]])
    // let path = q.dequeue()
    // let position = path[path.length - 1]
  
    let depth = 0
    while (q.length > 0) {
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
          let colorCopy = [...colors]
          colorCopy[row][col] = "yellow"
          setColors(colorCopy)
          await sleep(50);
        }
        return
      }
      await sleep(5);
  
      let copyColors = [...colors]
      copyColors[checkRow][checkCol] = "blue"
      setColors(copyColors)
  
      path.push([checkRow - 1, checkCol])
      q.queue([...path])
      path.pop()
  
      path.push([checkRow, checkCol - 1])
      q.queue([...path])
      path.pop()
  
      path.push([checkRow + 1, checkCol])
      q.queue([...path])
      path.pop()
  
      path.push([checkRow, checkCol + 1])
      q.queue([...path])
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

  export default astar