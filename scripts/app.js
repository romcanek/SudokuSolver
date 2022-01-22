const init = () => {
    // controls
    const solve = document.getElementById("solve")
    const clear = document.getElementById("clear")
    // inputs
    let inputs = document.querySelectorAll(".sudoku_board .block input")
    inputs.forEach(e => {
        e.value = 0
        e.addEventListener("change", (e) => {
            if (e.target.value > 9 || e.target.value < 0) {
                if (e.target.value != "")
                    e.target.value = 0
            }
        })
    })

    let board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]

    // renew board
    const renew = () => {
        inputs = document.querySelectorAll(".sudoku_board .block input")
        // vytvoreni boardy
        board = [
            [inputs[0], inputs[1], inputs[2], inputs[9], inputs[10], inputs[11], inputs[18], inputs[19], inputs[20]],
            [inputs[3], inputs[4], inputs[5], inputs[12], inputs[13], inputs[14], inputs[21], inputs[22], inputs[23]],
            [inputs[6], inputs[7], inputs[8], inputs[15], inputs[16], inputs[17], inputs[24], inputs[25], inputs[26]],

            [inputs[27], inputs[28], inputs[29], inputs[36], inputs[37], inputs[38], inputs[45], inputs[46], inputs[47]],
            [inputs[30], inputs[31], inputs[32], inputs[39], inputs[40], inputs[41], inputs[48], inputs[49], inputs[50]],
            [inputs[33], inputs[34], inputs[35], inputs[42], inputs[43], inputs[44], inputs[51], inputs[52], inputs[53]],

            [inputs[54], inputs[55], inputs[56], inputs[63], inputs[64], inputs[65], inputs[72], inputs[73], inputs[74]],
            [inputs[57], inputs[58], inputs[59], inputs[66], inputs[67], inputs[68], inputs[75], inputs[76], inputs[77]],
            [inputs[60], inputs[61], inputs[62], inputs[69], inputs[70], inputs[71], inputs[78], inputs[79], inputs[80]],
        ]
    }

    /*
    =============
      find empty
    =============
    */
    const findEmpty = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j].value == 0) {
                    return [i, j]
                }
            }
        }
        return false
    }

    /*
    =============
       validate
    =============
    */
    const valid = (num, pos) => {
        // check row
        for (let i = 0; i < 9; i++) {
            /*
            console.log(pos[0])
            console.log(i)
            console.log(board[pos[0]][i])
            */
            let rchk = board[pos[0]][i].value
            if (rchk == num && pos[1] != i) {
                return false;
            }
        }

        // check col
        for (let i = 0; i < 9; i++) {
            let cchk = board[i][pos[1]].value
            if (cchk == num && pos[0] != i) {
                return false;
            }
        }

        // check box
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (board[x][y].className == board[pos[0]][pos[1]].className && board[x][y].value == num && x != pos[0] && y != pos[1]) {
                    return false
                }
            }
        }
        return true
    }

    /*
    =============
       solve
    =============
    */
    const solveIt = () => {
        let row;
        let col;
        let find = findEmpty()
        if (find == false) {
            console.log("hotovo")
            return true
        }
        else {
            row = find[0]
            col = find[1]
        }
        for (let i = 1; i < 10; i++) {
            if (valid(i, [row, col]) == true) {
                board[row][col].value = i
                board[row][col].style.backgroundColor = "green";
                if (solveIt()) {
                    return true
                }
                board[row][col].value = 0
            }
        }
        return false
    }
    solve.addEventListener("click", () => {
        renew()

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j].value != 0) {
                    if (!valid(board[i][j].value, [i, j])) {
                        alert("Tohle zadání nemá řešení")
                        return
                    }
                }
            }
        }

        solveIt()

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j].style.backgroundColor == "green" && board[i][j].value == 0) {
                    board[i][j].style.backgroundColor = "red"
                }
            }
        }
    })

    /*
    =============
        clear
    =============
    */
    clear.addEventListener("click", () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                board[i][j].style.backgroundColor = "rgb(39, 39, 39)"
                board[i][j].value = 0
            }
        }
    })
}

window.addEventListener("DOMContentLoaded", init)