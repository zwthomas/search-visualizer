import "./SearchHolder.css"


function SearchHolder(props) {
    return (
        <div className="search">
            {props.template.map((element, row) => (
                <div className="grid-row" key={"row" + row}>
                    {props.template.map((element, col) => (
                        <div className="grid" key={"row" + row +"col" + col} row={row} col={col} style={{"backgroundColor": props.colors[row][col]}} onMouseEnter={(e) => {handleMouseEnter(props.mouseDown, e, props.colors, props.setColors)}} onMouseDown={(e) => {props.setMouseDown(true)}} onMouseUp={(e) => {props.setMouseDown(false)}}/>
                    ))}
                </div>
            
            ))}

           
        </div>
    )
}

function handleMouseEnter(mouseDown, e, colors, setColors) {
    let row = e.target.attributes.row.value
    let col = e.target.attributes.col.value
    let onColor = colors[row][col]
    if (mouseDown && onColor != "green" && onColor != "red") {
        let colorCopy = [... colors]
        colorCopy[row][col] = "black"
        setColors(colorCopy)
    }
    
}

  

export default SearchHolder;