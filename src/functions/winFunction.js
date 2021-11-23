export default function winFunction(array) {  
    const winner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    const winningClassNames = [
        "line-top",
        "line-center",
        "line-bottom",
        "line-left",
        "line-center-vertical",
        "line-right",
        "line-diagonal-left",
        "line-diagonal-right",    
    ]

    for (let i = 0; i< winner.length; i++) {
        const [a, b, c] = winner[i]
        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
            return winningClassNames[i]
        } 
    }
}