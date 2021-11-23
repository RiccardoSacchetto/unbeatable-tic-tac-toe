import React, {useEffect, useState} from "react";

function Button({win, onClick, boxes, turn}) {
    const [display, setDisplay] = useState({display : "none"})

    function handleText() {
        let emptyArray = []
        boxes.forEach((el, i) => {
            if (el === null) { emptyArray.push(i)}
        })
        let move = (9- emptyArray.length)

        if (boxes.includes(null) === false ) {
            return "DRAW"
        } else {
            if(((move === 0 || move === 2 || move === 4 || move === 6 || move === 8) && turn === 2) ||
                ((move === 1 || move === 3 || move === 5 || move === 7 || move === 9) && turn === 1)) {
                if (win) {
                    return "COMPUTER WIN"
                }
                if (!win) return "PLAYER TURN"
            } else if(((move === 1 || move === 3 || move === 5 || move === 7 || move === 9) && turn === 2) ||
                    ((move === 0 || move === 2 || move === 4 || move === 6 || move === 8) && turn === 1)) {
                if (win) return "PLAYER WIN"
                if (!win) return "COMPUTER TURN"
            }
        }
    }
    
    useEffect(() => {
        if (win) {
            setDisplay({display: "block"})}

    }, [win])

    return (
        <div>
            <p className="turn-p">{handleText()}</p>
            <div className="button-container">
                <button  style={display} className="button button-start" onClick={onClick} disabled={!win}>
                restart
                </button>
            </div>
        </div>
    )
}

export default Button