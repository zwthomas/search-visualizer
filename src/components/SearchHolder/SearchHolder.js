import "./SearchHolder.css"


function SearchHolder() {
    let dim = 20
    let template = []
    for (let i = 0; i < dim; i++) {
        template.push(<div className="grid"/>)
    }
    console.log(template)
    return (
        <div className="search">
            {template.map(element => (
                <div className="grid-row">
                    {template.map(element => (
                        <div className="grid" onClick={() => alert("bitch")}/>
                    ))}
                </div>
            
            ))}

           
        </div>
    )
}

export default SearchHolder;