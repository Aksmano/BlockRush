class LineMatch {
    constructor() {
        console.log("LineCheck class created");

    }

    checkHoriz(board, i) {
        console.log(JSON.stringify(board[i], null, ""));
        console.log("Horiz");
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
                else console.log("isn't match");
                isMatch = board[i][j]
                howMany = 1
                indexes = []

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
        // console.log(JSON.stringify(board[i], null, ""));
        console.log("Vert");

        var isMatch = board[9][j]
        var howMany = 1
        var indexes = []
        var matches = []
        var flag = false
        for (let i = 8; i > 0; i--)
            if (isMatch == board[i][j]) {
                isMatch = board[i][j]
                howMany++
                console.log("is match", howMany);
                if (indexes.length == 0)
                    indexes.push(i + 1)
                indexes.push(i)
            }
            else {
                if (howMany >= 3) {
                    console.log("how many = " + howMany)
                    console.log(indexes)
                    matches.push(indexes)
                }
                else console.log("isn't match");
                isMatch = board[i][j]
                howMany = 1
                indexes = []
            }

        if (howMany >= 3) {
            console.log("how many = " + howMany)
            matches.push(indexes)
        }
        
        indexes = []

        for (let i = 0; i < matches.length; i++)
            for (let k = 0; k < matches[i].length; k++)
                indexes.push(matches[i][k])

        for (let k = 9; k > 0; k--)
            if (k <= indexes[0])
                try {
                    if (board[k - indexes.length][j] == 8) {
                        console.log("change 8")
                        board[k][j] = Math.ceil(Math.random() * 6) - 1
                    }
                    else {
                        console.log("change normal")
                        board[k][j] = board[k - indexes.length][j]
                    }
                }
                catch{
                    console.log("change catch")
                    board[k][j] = Math.ceil(Math.random() * 6) - 1
                }
        console.log(JSON.stringify(board, null, ""));
        console.log(flag);
        console.log(indexes);

        return board, matches
    }

}