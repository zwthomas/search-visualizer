import sleep from "../helpers/Sleep"

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
        q.push([...path])
        path.pop()

        path.push([checkRow, checkCol - 1])
        q.push([...path])
        path.pop()

        path.push([checkRow + 1, checkCol])
        q.push([...path])
        path.pop()

        path.push([checkRow, checkCol + 1])
        q.push([...path])
        path.pop()

        depth++

    }


}

export default bfs