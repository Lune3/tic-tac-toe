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
        if(!playerTurn){
            player1.push(cell);
            player1.sort(function(a,b){return a - b});
            console.log("Player 1 turns are = ",player1);
        } 
        else{
            player2.push(cell);
            player2.sort(function(a,b){return a - b});
            console.log("Player 2 turns are = ",player2);
        }
    }

    function checkForWinP1(){ 
        const winningPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        if(player1.length >= 3){
            for(let i = 0;i < player1.length;i++){
                const tempArr = [];
                for(let j = 0;j < 3;j++){
                    tempArr.push(player1)
                }
            }
        }
    }

    return {cellSelected,checkForWin};
})();

const gameFlow = function (){
    let playerTurn = false;

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
                // if(winningPlayer === 1){
                //     endGame(1);
                //     break;
                // }
            }
            else{
                players.cellSelected(cell,playerTurn);
                gameBoard.appendCell(cell,"O");
                let winningPlayer = players.checkForWin();
                // if(winningPlayer === 2){
                //     endGame(2);
                //     break;
                // }
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