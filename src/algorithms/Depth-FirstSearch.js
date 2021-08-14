import sleep from "../helpers/Sleep"

async function dfs(colors, setColors, row, col, dim) {
    // await dfsRun(colors, setColors, row, col, dim, 0)

    let position = [row, col]
    let path = [position]
    let found = false
    found = await dfsRun(colors, setColors, row - 1, col, dim, 1, path)
    if (!found) { found = await dfsRun(colors, setColors, row, col - 1, dim, 1, path) }
    if (!found) { found = await dfsRun(colors, setColors, row + 1, col, dim, 1, path) }
    if (!found) { found = await dfsRun(colors, setColors, row, col + 1, dim, 1, path) }
    for (let i = 1; i < path.length; i++) {
        let [row, col] = path[i]
        let colorCopy = [...colors]
        colorCopy[row][col] = "yellow"
        setColors(colorCopy)
        await sleep(50);
    }
    return found
}

async function dfsRun(colors, setColors, row, col, dim, depth, path) {
    // console.log("Depth: " + depth)
    if (row < 0 || row >= dim || col < 0 || col >= dim) { return false }
    let currentColor = colors[row][col]
    if (currentColor === "black" || (currentColor === "green" && depth > 0) || currentColor === "blue") { return false }
    if (currentColor === "red") { console.log("solution"); return true }
    let colorCopy = [...colors]
    colorCopy[row][col] = "blue"
    setColors(colorCopy)
    let position = [row, col]
    path.push(position)
    await sleep(50);
    let found = false
    found = await dfsRun(colors, setColors, row - 1, col, dim, depth + 1, path)
    if (!found) { found = await dfsRun(colors, setColors, row, col - 1, dim, depth + 1, path) }
    if (!found) { found = await dfsRun(colors, setColors, row + 1, col, dim, depth + 1, path) }
    if (!found) { found = await dfsRun(colors, setColors, row, col + 1, dim, depth + 1, path) }
    if (!found) { path.pop() }
    return found
}

export default dfs