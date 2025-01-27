class Tetri_I {
    constructor() {
        // klasa która zmienia pozycje numerów w głównej tablicy z grą 
    }

    goDown(board, model) {
        var flag = false
        var pos = []
        for (let i = board.length - 2; i > 0; i--)
            for (let j = 0; j < board[i].length; j++)
                if (board[i][j] == 1)
                    if (board[i + 1][j] == 2 || board[i + 1][j] == 9) {
                        for (let i = board.length - 2; i > 0; i--)
                            for (let j = 0; j < board[i].length; j++)
                                if (board[i][j] == 1)
                                    board[i][j] = 2
                        flag = true
                    }
                    else
                        pos.push([i, j])

        if (flag)
            model = null
        else
            for (let i = 0; i < pos.length; i++) {
                board[pos[i][0]][pos[i][1]] = 0
                board[pos[i][0] + 1][pos[i][1]] = 1
            }
        return [board, model, pos]
    }

    goSide(board, side) {
        var flag = false
        var pos = []
        for (let i = board.length - 2; i > 0; i--)
            for (let j = 0; j < board[i].length; j++)
                if (board[i][j] == 1)
                    if (board[i][j + side] == 2 || board[i][j + side] == 9)
                        flag = true
                    else
                        pos.push([i, j])

        if (!flag)
            for (let i = 0; i < pos.length; i++) {
                board[pos[i][0]][pos[i][1]] = 0
                board[pos[i][0]][pos[i][1] + side] = 1
            }

        return [board, flag, pos]
    }

    rotate(board){
        
    }

    // positionVert(board, model) {
    //     var cont = 0
    //     var tail = true
    //     console.log(model.children[0].getWorldPosition());

    //     for (let i = board.length - 2; i > 0; i--) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             // console.log("here")
    //             if (board[i][j] == 1 && (board[i + 1][j] == 9 || board[i + 1][j] == 2) && board[i - 1][j] == 1) {
    //                 model = null
    //                 for (let i = board.length - 2; i > 0; i--)
    //                     for (let j = 0; j < board[i].length; j++)
    //                         if (board[i][j] == 1)
    //                             board[i][j] = 2
    //                 cont = 4
    //                 break
    //             }
    //             else if (board[i][j] == 1 && board[i + 1][j] == 1 && (board[i - 1][j] == 9 || board[i - 1][j] == 0) && tail) {
    //                 board[i][j] = 0
    //                 tail = false
    //                 cont++
    //                 break
    //             }
    //             else if (board[i][j] == 1 && board[i + 1][j] == 1 && board[i - 1][j] == 1) {
    //                 cont++
    //                 break
    //             }
    //             else if (board[i][j] == 1 && board[i + 1][j] == 0 && board[i - 1][j] == 1) {
    //                 board[i + 1][j] = 1
    //                 i--
    //                 cont++
    //                 break
    //             }
    //         }
    //         if (cont == 4)
    //             break
    //     }
    //     // console.log(JSON.stringify(board, "/n", ""))
    //     return [board, model]
    // }

    // positionHoriz(board, model) {
    //     var cont = 0
    //     var tail = true
    //     var flag = true
    //     for (let i = board.length - 2; i > 0; i--) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             // console.log("here")
    //             if (board[i][j] == 1) {
    //                 for (let k = 0; k < 4; k++)
    //                     if (board[i + 1][j + k] == 9 || board[i + 1][j + k] == 2) {
    //                         flag = false
    //                         model = null
    //                         for (let i = board.length - 2; i > 0; i--)
    //                             for (let j = 0; j < board[i].length; j++)
    //                                 if (board[i][j] == 1)
    //                                     board[i][j] = 2
    //                         cont = 4
    //                         break
    //                     }
    //                 if (flag) {
    //                     board[i + 1][j] = 1
    //                     board[i + 1][j + 1] = 1
    //                     board[i + 1][j + 2] = 1
    //                     board[i + 1][j + 3] = 1
    //                     board[i][j] = 0
    //                     board[i][j + 1] = 0
    //                     board[i][j + 2] = 0
    //                     board[i][j + 3] = 0
    //                 }
    //                 else break
    //             }
    //         }
    //         if (cont == 4)
    //             break
    //     }
    //     // console.log(JSON.stringify(board, "/n", ""))
    //     return [board, model]
    // }

    // rotateToHoriz(board) {
    //     var flag = false
    //     for (let i = board.length - 2; i > 0; i--) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             if (board[i][j] == 1) {
    //                 if ((board[i - 2][j - 1] == 2 || board[i - 2][j - 1] == 9
    //                     || board[i - 2][j - 2] == 2 || board[i - 2][j - 2] == 9
    //                     || board[i - 2][j - 3] == 2 || board[i - 2][j - 3] == 9)
    //                     && (board[i - 2][j + 1] == 2 || board[i - 2][j + 1] == 9
    //                         || board[i - 2][j + 2] == 2 || board[i - 2][j + 2] == 9
    //                         || board[i - 2][j + 3] == 2 || board[i - 2][j + 3] == 9)) {
    //                     console.log("inside");

    //                     return [board, false]
    //                 }
    //                 if (board[i - 2][j - 1] == 2 || board[i - 2][j - 1] == 9) {
    //                     board[i - 2][j - 1] = 1
    //                     board[i - 2][j + 1] = 1
    //                     board[i - 2][j + 2] = 1
    //                 }
    //                 console.log("ssssss");
    //                 board[i][j] = 0
    //                 board[i - 1][j] = 0
    //                 board[i - 3][j] = 0
    //                 if (board[i - 2][j - 1] == 9) {
    //                     board[i - 2][1] = 1
    //                     board[i - 2][2] = 1
    //                     board[i - 2][3] = 1
    //                     board[i - 2][4] = 1
    //                 }
    //                 else if (board[i - 2][j + 1] == 9 || board[i - 2][j + 2] == 9) {
    //                     board[i - 2][10] = 1
    //                     board[i - 2][9] = 1
    //                     board[i - 2][8] = 1
    //                     board[i - 2][7] = 1
    //                 }
    //                 else {
    //                     board[i - 2][j - 1] = 1
    //                     board[i - 2][j + 1] = 1
    //                     board[i - 2][j + 2] = 1
    //                 }
    //                 flag = true
    //                 break
    //             }
    //         }
    //         if (flag)
    //             break
    //     }
    //     return [board, true]
    // }

    // rotateToVert(board) {
    //     var flag = false
    //     for (let i = board.length - 2; i > 0; i--) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             if (board[i][j] == 1) {
    //                 if ((board[i - 1][j + 1] == 2 || board[i + 1][j + 1] == 9
    //                     || board[i - 2][j + 1] == 2 || board[i - 1][j + 1] == 9
    //                     || board[i - 3][j + 1] == 2 || board[i - 2][j + 1] == 9)
    //                     && (board[i + 1][j + 1] == 2 || board[i + 1][j + 1] == 9
    //                         || board[i + 2][j + 1] == 2 || board[i + 2][j + 1] == 9
    //                         || board[i + 3][j + 1] == 2 || board[i + 3][j + 1] == 9)) {
    //                     return [board, false]
    //                 }
    //                 if (board[i + 1][j + 1] == 9 || board[i + 2][j + 1] == 9) {
    //                     board[i][j] = 0
    //                     board[i][j + 2] = 0
    //                     board[i][j + 3] = 0
    //                     board[20][j + 1] = 1
    //                     board[18][j + 1] = 1
    //                     board[17][j + 1] = 1
    //                 }
    //                 else {
    //                     board[i][j] = 0
    //                     board[i][j + 2] = 0
    //                     board[i][j + 3] = 0
    //                     board[i - 1][j + 1] = 1
    //                     board[i + 1][j + 1] = 1
    //                     board[i + 2][j + 1] = 1
    //                 }
    //                 flag = true
    //                 break
    //             }
    //         }
    //         if (flag)
    //             break
    //     }
    //     return [board, true]
    // }

    // moveToSideVert(board, side) {
    //     var flag = false
    //     for (let i = board.length - 2; i > 0; i--) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             if (board[i][j] == 1) {

    //                 if (board[i][j + side] == 9 || board[i][j + side] == 2) {
    //                     return [board, false]
    //                     // flag = true
    //                     // break
    //                 }
    //                 else {
    //                     board[i][j + side] = 1
    //                     board[i - 1][j + side] = 1
    //                     board[i - 2][j + side] = 1
    //                     board[i - 3][j + side] = 1
    //                     board[i][j] = 0
    //                     board[i - 1][j] = 0
    //                     board[i - 2][j] = 0
    //                     board[i - 3][j] = 0
    //                     flag = true
    //                     break
    //                 }
    //             }
    //         }
    //         if (flag)
    //             break
    //     }
    //     return [board, true]
    // }
    // moveToSideHoriz(board, side) {
    //     var flag = false
    //     for (let i = board.length - 2; i > 0; i--) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             if (board[i][j] == 1) {
    //                 if ((board[i][j + side] == 9 || board[i][j + side] == 2) && side == -1 || (board[i][j + 3 + side] == 9 || board[i][j + 3 + side] == 2) && side == 1) {
    //                     return [board, false]
    //                     // flag = true
    //                     // break
    //                 }
    //                 else {
    //                     if (side == -1) {
    //                         board[i][j + side] = 1
    //                         board[i][j + 3] = 0
    //                     }
    //                     else if (side == 1) {
    //                         board[i][j - 1 + side] = 0
    //                         board[i][j + 3 + side] = 1
    //                     }
    //                     flag = true
    //                     break
    //                 }
    //             }
    //         }
    //         if (flag)
    //             break
    //     }
    //     return [board, true]
    // }
}