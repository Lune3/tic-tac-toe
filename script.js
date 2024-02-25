const gameBoard = (function (){
    const grid = [];
    for(let i = 0;i < 9;i++){
        grid.push(-1);
    }

    function appendCell(cell,character){
        grid[cell] = character;
    }

    function isAlreadyfilled(cell){
        if(grid[cell] != -1){
            return true;
        }
        else{
        return false;
        }
    }
    return {appendCell,isAlreadyfilled};
})();

const players = (function (){
    const player1 = [];
    const player2 = [];

    function cellSelected(cell,playerTurn){
        if(playerTurn){
            player1.push(cell);
            player1.sort(function(a,b){return a - b});
        } 
        else{
            player2.push(cell);
            player2.sort(function(a,b){return a - b});
        }
    }

    function checkForWin(){ 
        if(player1.length > 2){
            for(let i = 1;i <= 4;i++){
                let flag = false;
                for(let j = 0;j < player1.length - 1;j++){
                    if(player1[j + 1] = player1[j] + i){
                        flag  = true;
                    }
                    else{
                        flag = false;
                        break;
                    }
                }
                if(flag === true){
                    return 1;
                    break;
                }
                else{
                    return false;
                }
            }
        }
        if(player2.length > 2){
            for(let i = 1;i <= 4;i++){
                let flag = false;
                for(let j = 0;j < player2.length - 1;j++){
                    if(player2[j + 1] = player2[j] + i){
                        flag  = true;
                    }
                    else{
                        flag = false;
                    }
                }
                if(flag === true){
                    return 2;
                    break;
                }
                else{
                    return false;
                }
            }
        }
    }

    return {cellSelected,checkForWin};
})();

const gameFlow = function (){
    let playerTurn = true;

    function gameStart(){
        for(let i = 0;i < 9;i++){

            let cell = parseInt(prompt(`Player${+playerTurn + 1}`)) - 1;

            while(checkForErrors(cell)){
                cell = parseInt(prompt(`Select a valid cell player${+playerTurn + 1}`)) - 1;
            }

            if(playerTurn){
                players.cellSelected(cell,playerTurn);
                gameBoard.appendCell(cell,"X");
                let winningPlayer = players.checkForWin();
                if(winningPlayer !== false && winningPlayer === 1){
                    endGame(1);
                    break;
                }
            }
            else{
                players.cellSelected(cell,playerTurn);
                gameBoard.appendCell(cell,"O");
                let winningPlayer = players.checkForWin();
                if(winningPlayer !== false && winningPlayer === 2){
                    endGame(2);
                }
            }

            playerTurn = !playerTurn;
        }
    }
    function checkForErrors(cell){
        if(typeof(cell) != "number" ||cell < 0 || cell > 8 ||gameBoard.isAlreadyfilled(cell)){
            return true;
        }
        else{
        return false;
        }
    }

    function endGame(winningArr){
        if(winningArr === 1){
            alert("Player 1 has won the game");
        }
        else{
            alert("Player 2 has won the game");
        }
    }
    return {gameStart};
}

if(confirm("Ready to play")){
const start = gameFlow();
start.gameStart();
}