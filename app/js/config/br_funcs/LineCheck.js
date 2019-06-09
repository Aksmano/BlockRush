class LineMatch {
    constructor() {
        console.log("LineCheck class created");

    }

    checkHoriz(board, i) {
        console.log(JSON.stringify(board[i], null, ""));
        var isMatch = board[i][0]
        var howMany = 1
        var indexes = []
        var matches = []
        var flag = false
        for (let j = 1; j < 9; j++)
            if (isMatch == board[i][j]) {
                isMatch = board[i][j]
                howMany++
                console.log("is match", howMany);
                if (indexes.length == 0)
                    indexes.push(j - 1)
                indexes.push(j)
            }
            else {
                console.log("isn't match");
                if (howMany >= 3) {
                    flag = true
                    console.log("how many = " + howMany)
                    console.log(indexes)
                    for (let k = 0; k < indexes.length; k++)
                        for (let l = i; l > 0; l--)
                            if (board[l - 1][indexes[k]] == 8) {
                                console.log("change 8")
                                board[l][indexes[k]] = Math.ceil(Math.random() * 6) - 1
                                break
                            }
                            else {
                                console.log("change normal")
                                board[l][indexes[k]] = board[l - 1][indexes[k]]
                            }
                    matches.push(indexes)
                }
                isMatch = board[i][j]
                howMany = 1
                indexes = []

                // else if (indexes.length >= 3) {
                //     if (isMatch != board[i][j - 1])
                //         for (let k = 0; k < howMany - 1; k++)
                //             indexes.pop()
                // }

            }
        console.log(indexes.length);
        console.log(howMany);


        if (howMany >= 3) {
            flag = true
            console.log("how many = " + howMany)
            for (let k = 0; k < indexes.length; k++)
                for (let l = i; l > 0; l--)
                    if (board[l - 1][indexes[k]] == 8) {
                        console.log("change 8")
                        board[l][indexes[k]] = Math.ceil(Math.random() * 6) - 1
                        break
                    }
                    else {
                        console.log("change normal")
                        board[l][indexes[k]] = board[l - 1][indexes[k]]
                    }
            matches.push(indexes)
        }
        // if (indexes < 3)
        //     indexes = []
        console.log(JSON.stringify(board[i], null, ""));
        console.log(JSON.stringify(board, null, ""));
        console.log(flag);
        console.log(indexes);


        return board, matches
    }

    checkVert(board, j) {
        var isMatch = board[9][j]
        var howMany = 1
        var indexes = []
        var flag = false
        for (let i = 8; i > 0; i--)
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