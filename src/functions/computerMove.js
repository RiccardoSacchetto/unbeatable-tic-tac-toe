export default function computerMove(array, player) {
    let cross = []
    let circle = []

    array.forEach( (el, i) => {
        if (el === 1) { cross.push(i)}
        if (el === 2) { circle.push(i)}
    })

    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]


    if (cross.length <= 1 && circle.length <= 1) { //FIRST TURN
        
        if (!cross.includes(4) && !circle.includes(4)) {
            array.splice(4, 1, player)
        
        } else if (cross.includes(4) || circle.includes(4)) {
            const options = [0, 2, 6, 8]
            let randomNum = Math.floor(Math.random()*options.length)
            if (circle.includes(options[randomNum])) { //ABSOLUTE FIRST TURN
                array.splice(options[(randomNum + 1)], 1, player)

            } else { 
                array.splice(options[randomNum], 1, player) 
            }
        }

    } else if (cross.length >= 2) { //SECOND+ TURN
        let moved = false

        function circleFirst() {
            if (!moved) { //searching for a possible win for circle
                for(let i=0; i<winning.length; i++) {
                    const [a, b, c] = winning[i]
                    if (circle.includes(a) && circle.includes(b) && !cross.includes(c)) {
                        array.splice(c, 1, player)
                        moved = true
                    } else if (circle.includes(a) && circle.includes(c) && !cross.includes(b)) {
                        array.splice(b, 1, player)
                        moved = true
                    } else if (circle.includes(b) && circle.includes(c) && !cross.includes(a)) {
                        array.splice(a, 1, player)
                        moved = true
                    }
                }
            }
        }

        function crossFirst() {
            if (!moved) { 
                if (cross.length === 2) { //special case if computer is second and second turn
                    if (circle.includes(4) && cross.includes(3) && cross.includes(1)) {
                        array.splice(0, 1, player)
                        moved = true
                    } else if (circle.includes(4) && cross.includes(1) && cross.includes(5)) {
                        array.splice(2, 1, player)
                        moved = true
                    } else if (circle.includes(4) && cross.includes(5) && cross.includes(7)) {
                        array.splice(8, 1, player)
                        moved = true
                    } else if (circle.includes(4) && cross.includes(7) && cross.includes(3)) {
                        array.splice(6, 1, player)
                        moved = true
                    }
                }

                if(!moved) { //searching for a possible win for cross
                    for(let i=0; i<winning.length; i++) {
                        const [a, b, c] = winning[i]
                        if (cross.includes(a) && cross.includes(b) && !circle.includes(c)) {
                            array.splice(c, 1, player)
                            moved = true
                        } else if (cross.includes(a) && cross.includes(c) && !circle.includes(b)) {
                            array.splice(b, 1, player)
                            moved = true
                        } else if (cross.includes(b) && cross.includes(c) && !circle.includes(a)) {
                            array.splice(a, 1, player)
                            moved = true
                        }
                    }
                }
            }
        }

        let emptyArray = []
            array.forEach((el, i) => {
                if (el === null) { emptyArray.push(i)}
            })

        if (!moved) {   
            if (player === 1) { // STRATEGIES FOR ATTACK IF YOU ARE NOT UNDER ONE
                crossFirst()
                circleFirst()
                if (!moved) {
                    for(let i=0; i<winning.length; i++) {
                        const [a, b, c] = winning[i]
                        if (!moved) {
                            if (cross.includes(a) && emptyArray.includes(b) && emptyArray.includes(c)) {
                                array.splice(c, 1, player)
                                moved = true
                            } else if (cross.includes(b) && emptyArray.includes(a) && emptyArray.includes(c)) {
                                array.splice(a, 1, player)
                                moved = true
                            } else if (cross.includes(c) && emptyArray.includes(a) && emptyArray.includes(b)) {
                                array.splice(a, 1, player)
                                moved = true
    
                            }
                        }
                    }
                }
            } else if (player === 2) {
                circleFirst()
                crossFirst()
                if (!moved) {
                    for(let i=0; i<winning.length; i++) {
                        const [a, b, c] = winning[i]
                        if (!moved) {
                            if (circle.includes(a) && emptyArray.includes(b) && emptyArray.includes(c)) {
                                array.splice(c, 1, player)
                                moved = true
                            } else if (circle.includes(b) && emptyArray.includes(a) && emptyArray.includes(c)) {
                                array.splice(a, 1, player)
                                moved = true
                            } else if (circle.includes(c) && emptyArray.includes(a) && emptyArray.includes(b)) {
                                array.splice(a, 1, player)
                                moved = true
                            }
                        }
                    }
                }
            }
        }

        if(!moved) {
            let randomNum = Math.floor(Math.random()*emptyArray.length)
            array.splice(emptyArray[randomNum], 1, player)
            moved = true
        }
    }
    return array
}
