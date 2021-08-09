import React, { useState } from 'react';
import "./SearchHolder.css"


function SearchHolder() {
    
    let [color, setColor] = useState("blue")
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
    let [colors, setColors] = useState(startingColors)
    let [mouseDown, setMouseDown] = useState(false);

    for (let i = 0; i < dim; i++) {
        template.push(<div className="grid"/>)
    }
    return (
        <div className="search">
            {template.map((element, row) => (
                <div className="grid-row">
                    {template.map((element, col) => (
                        <div className="grid" row={row} col={col} style={{"backgroundColor": colors[row][col]}} onMouseEnter={(e) => {handleMouseEnter(mouseDown, e, colors, setColors)}} onMouseDown={(e) => {setMouseDown(true)}} onMouseUp={(e) => {setMouseDown(false)}}/>
                    ))}
                </div>
            
            ))}

           
        </div>
    )
}

function handleMouseEnter(mouseDown, e, colors, setColors) {
    let row = e.target.attributes.row.value
    let col = e.target.attributes.col.value

    if (mouseDown) {
        let colorCopy = [... colors]
        colorCopy[row][col] = "black"
        setColors(colorCopy)
    }
    
}

export default SearchHolder;