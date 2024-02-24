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
            
        }
    }

    return {cellSelected};
})();

const gameFlow = function (){
    let playerTurn = 1;

    function gameStart(){
        for(let i = 0;i < 9;i++){

            let cell = parseInt(prompt("Select your cell")) - 1;

            while(checkForErrors(cell)){
                cell = parseInt(prompt("Select a valid cell")) - 1;
            }

            if(playerTurn === 1){
                players.cellSelected(cell,playerTurn);
                gameBoard.appendCell(cell,"X");
            }
            else{
                players.cellSelected(cell,playerTurn);
                gameBoard.appendCell(cell,"O");
            }

            playerTurn = 0;
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
    return {gameStart};
}

const start = gameFlow();
start.gameStart();