import search from "../../helpers/SearchHelper";


import "./Header.css"


function Header(props) {
    return (
        <header className="header">
            <h1 className="app-name">Searching Visualizer</h1>
            <div className="algorithm" >
                <label for="algorithms">Algorithms: </label>
                <select name="algorithms" id="algorithms" onChange={(e) => algorithmChange(e.target.value, props.setAlgorithm)} value={props.algorithm}>
                    <option value="bfs">Breadth-First Search</option>
                    <option value="dfs">Depth-First Search</option>
                    <option value="astar">Astar</option>
                </select>
                <button className="start" disabled={props.searched} onClick={() => {search(props.algorithm, props.colors, props.setColors, props.startRow, props.startCol, props.endRow, props.endCol, props.dim, props.setSearched, props.setRunning)}}>Search</button>
                <button className="clear" disabled={props.running} onClick={() => clear(props.colors, props.setColors, props.setRunning, props.setSearched)}>Clear</button>
            </div>
        </header>
    )
}
function algorithmChange(algorithm, setAlgorithm) {
    setAlgorithm(algorithm)
}



function clear(colors, setColors, setRunning, setSearched) {
    console.log("clear")
    let colorCopy = [... colors]

    for (let i = 0; i < colorCopy.length; i++) {
        for (let j = 0; j < colorCopy[i].length; j++) {
            let currentColor = colorCopy[i][j]
            if (currentColor != "green" && currentColor!= "red" && currentColor != "black") {
                colorCopy[i][j] = "white"
            }
        }
    }
    setColors(colorCopy)
    setRunning(false)
    setSearched(false)
}





export default Header;