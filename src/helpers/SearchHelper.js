import astar from "../algorithms/Astar"
import dfs from "../algorithms/Depth-FirstSearch"
import bfs from "../algorithms/Breadth-FirstSearch"

function search(algorithm, colors, setColors, startRow, startCol, endRow, endCol, dim) {
    switch(algorithm) {
        case "dfs":
            dfs(colors, setColors, startRow, startCol, dim)
            break
        case "bfs":
            bfs(colors, setColors, startRow, startCol, dim) 
            break
        case "astar":
            astar(colors, setColors, startRow, startCol, endRow, endCol, dim)
            break
        default:
            dfs(colors, setColors, startRow, startCol, dim)

    }
    

}

export default search;