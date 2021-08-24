import astar from "../algorithms/Astar"
import dfs from "../algorithms/Depth-FirstSearch"
import bfs from "../algorithms/Breadth-FirstSearch"

async function search(algorithm, colors, setColors, startRow, startCol, endRow, endCol, dim, setSearched, setRunning) {
    setSearched(true)
    setRunning(true)

    switch(algorithm) {
        case "dfs":
            await dfs(colors, setColors, startRow, startCol, dim)
            break
        case "bfs":
            await bfs(colors, setColors, startRow, startCol, dim) 
            break
        case "astar":
            await astar(colors, setColors, startRow, startCol, endRow, endCol, dim)
            break
        default:
            await dfs(colors, setColors, startRow, startCol, dim)

    }

    setRunning(false)
    

}

export default search;