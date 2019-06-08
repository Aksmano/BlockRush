class LineMatch {
    constructor() {
        console.log("LineCheck class created");

    }

    checkHoriz(board, i) {
        var isMatch = 9
        var howMany = 0
        var indexes = []
        for (let j = 0; j < 9; j++)
            if (isMatch == 9 || isMatch == board[i][j]) {
                isMatch = board[i][j]
                console.log("is match");
                howMany++
                indexes.push(j)
            }
            else {
                console.log("isn't match");
                isMatch = board[i][j]
                howMany = 1
                indexes = [board[i][j]]
            }
            console.log(indexes.length);
            
        if (howMany >= 3)
            for (let k = 0; k < indexes.length; k++)
                for (let l = i; l > 0; l--)
                    if (board[l - 1][indexes[k]] == 8) {
                        console.log("change")
                        board[l][indexes[k]] = Math.ceil(Math.random * 6) - 1
                        break
                    }
                    else
                        board[l][indexes[k]] = board[l - 1][indexes[k]]
        console.log(JSON.stringify(board, null, ""));

        return board
    }

    checkVert(board, j) {
        var isMatch = 9
        var howMany = 0
        var indexes = []
        for (let i = 9; i > 0; i--)
            if (isMatch == 9 || isMatch == board[i][j]) {
                howMany++
                indexes.push(i)
            }
            else {
                howMany = 0
                isMatch = board[i][j]
                indexes = []
            }

        if (howMany >= 3)
            for (let l = indexes[0]; l > 0; l--)
                try {
                    board[l][j] = board[l - (indexes.length)][j]
                }
                catch{
                    board[l][j] = Math.ceil(Math.random * 6) - 1
                }
        console.log(JSON.stringify(board, null, ""));

        return board
    }

}