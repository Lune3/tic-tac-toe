const gameBoard = (function (){
    const grid = [];
    for(let i = 0;i < 9;i++){
        grid.push(-1);
    }
    function appendCell(cell,character){
        grid[cell] = character;
        // console.log(grid);
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
            console.log(player1);
        } 
        else{
            player2.push(cell);
            player2.sort(function(a,b){return a - b});
            // console.log(player2);
        }
    }

    function checkForWin(){ 
        if(player1.length > 2){
            for(let i = 1;i <= 4;i++){
                let flag = false;
                for(let j = 0;j < player1.length - 1;j++){
                    if(player1[j + 1] = player1[j] + 1){
                        flag  = true;
                    }
                    else{
                        flag = false;
                    }
                }
                if(flag === true){
                    return [true,1];
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
                    if(player2[j + 1] = player2[j] + 1){
                        flag  = true;
                    }
                    else{
                        flag = false;
                    }
                }
                if(flag === true){
                    return [true,2];
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
    return {gameStart};
}

if(confirm("Ready to play")){
const start = gameFlow();
start.gameStart();
}