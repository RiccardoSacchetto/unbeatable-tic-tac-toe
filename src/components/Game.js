import React, {useEffect, useState} from "react";
import Box from "./Box"
import Footer from "./Footer";
import winFunction from "../functions/winFunction.js"
import computerMove from "../functions/computerMove"

// Legenda: 
// 0 || null = null
// 1= cross
// 2= circle

function Game() {
    const [crossIsNext, setCrossIsNext] = useState(true)
    const [boxes, setBoxes] = useState(Array(9).fill(null))
    const lineClass = winFunction(boxes)
    const [computerTurn, setComputerTurn] = useState(2)
    const win = handleWinner()
    function handleWinner() {
        if(boxes.includes(null) === false || lineClass !== undefined) { return true } else return false
    }

    function handleTurn(num) {
        
        if(boxes[num] === null && win === false) {
            let tempArrayBoxes = [...boxes]
            tempArrayBoxes[num] = crossIsNext ? 1 : 2
            setBoxes(tempArrayBoxes)
            setCrossIsNext(!crossIsNext)
        }      
    }

    function handleGame() {
        if (computerTurn === 1) {
            setComputerTurn(2)
        } else { 
            setComputerTurn(1)
        }
        setBoxes(Array(9).fill(null))
        setCrossIsNext(true)
    }

    useEffect(() => {
        if ((!win) && ((computerTurn === 2 && !crossIsNext) || (computerTurn === 1 && crossIsNext))) {
            setTimeout(() => {
                let tempBoxes = computerMove(boxes, computerTurn)
                setBoxes(tempBoxes)
                setCrossIsNext(!crossIsNext)
            }, 150)
        }   
    }, [crossIsNext, computerTurn])

    return (
        <div id="app">
            <div id="game" className={lineClass}>
                {boxes.map( (box, i) => {
                    return (
                        <Box key={i + 1 } id={i} boxes={box} onClick={handleTurn}/>
                    )
                })
                }
            </div>
            <Footer win={win} boxes={boxes} turn={computerTurn} onClick={handleGame}/>
        </div>
    )
}

export default Game


    /* do a big check and if is okay jus style the text of the winner*/