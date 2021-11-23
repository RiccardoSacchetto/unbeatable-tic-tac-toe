import React from "react"
import Circle from "./Circle"
import Cross from "./Cross"


function Box({id, boxes, onClick, names}) {

    const ids = [
        "top-left",    
        "top",
        "top-right",
        "left",
        "center",
        "right",
        "bottom-left",
        "bottom",
        "bottom-right"
    ]

    return(
        <div className="box" onClick={() => onClick(id)}>
            <div className="inside-box" id={ids[id]}>
                { boxes === 1 && <Cross /> }
                { boxes === 2 && <Circle /> }
            </div>
        </div>
    )
}

export default Box
