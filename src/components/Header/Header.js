import search from "../../helpers/SearchHelper";


import "./Header.css"


function Header(props) {
    return (
        <header className="header">
            <h1 className="app-name">Searching Visualizer</h1>
            <div className="algorithm" >
                <label for="algorithms">Algorithms: </label>
                <select name="algorithms" id="algorithms" onChange={(e) => algorithmChange(e.target.value, props.setAlgorithm)} value={props.algorithm}>
                    <option value="dfs">Depth-First Search</option>
                    <option value="bfs">Breadth-First Search</option>
                    <option value="astar">Astar</option>
                </select>
                <button className="start" onClick={() => search(props.algorithm, props.colors, props.setColors, props.startRow, props.startCol, props.endRow, props.endCol, props.dim)}>Search</button>
            </div>
        </header>
    )
}
function algorithmChange(algorithm, setAlgorithm) {
    setAlgorithm(algorithm)
}





export default Header;