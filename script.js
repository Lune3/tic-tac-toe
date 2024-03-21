const gameBoard = (function (){
    let grid = [];
    function initializeBoard(){
        grid = [];
        for(let i = 0;i < 9;i++){
            grid.push(-1);
        }
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
    return {appendCell,isAlreadyfilled,initializeBoard};
})();

const players = (function (){
    let player1 = [];
    let player2 = [];

    function clearPlayerTurns(){
        player1 = [];
        player2 = [];
    }

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


    function checkForWinP1(){ 
        const winningPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        if(player1.length >= 3){
            for(let i = 0;i < winningPattern.length;i++){
                if(winningPattern[i].every(playerOne => player1.includes(playerOne))){
                    return true;
                }
            }
        }
        return false;
    }

    function checkForWinP2(){ 
        const winningPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        if(player2.length >= 3){
            for(let i = 0;i < winningPattern.length;i++){
                if(winningPattern[i].every(playerTwo => player2.includes(playerTwo))){
                    return true;
                }
            }
        }
        return false;
    }
    return {cellSelected,checkForWinP1,checkForWinP2,clearPlayerTurns};
})();

const gameFlow = function (){
    const grid = document.querySelectorAll("li");
    let playerTurn = true;
    let counter = 0;
    function gameStart(){
        gameBoard.initializeBoard();
        grid.forEach(containers => {
            containers.addEventListener("click" , (e) =>{
                let cell = e.target.className;
                cell = parseInt(cell.charAt(cell.length - 1)) - 1;
                if(!gameBoard.isAlreadyfilled(cell)){
                    players.cellSelected(cell,playerTurn); 
                    if(!playerTurn){
                        gameBoard.appendCell(cell,"O");
                        const circle = document.createElement("img");
                        circle.src = "Images/1811_circle.png";
                        e.target.appendChild(circle);
                    }
                    else{
                        gameBoard.appendCell(cell,"X");
                        const cross = document.createElement("img");
                        cross.src = "Images/cross-23.png";
                        e.target.appendChild(cross);
                    }
                    playerTurn = !playerTurn;
                    counter++;
                }
                if(players.checkForWinP1()){
                    endGame(1);
                    return;
                }
                else if(players.checkForWinP2()){
                    endGame(2);
                    return;
                }
                else if(counter === 9){
                    endGame(3);
                    return ;
                }
            })
        });
    }


    function endGame(winningArr){
        const dialog = document.querySelector("dialog");
        const button = document.querySelector("button");
        const dialogWindow = document.querySelector("p");
        if(winningArr === 1){
            dialog.showModal();
            dialogWindow.textContent = "Player 1 has won the game";
        }
        else if(winningArr === 2){
            dialog.showModal();
            dialogWindow.textContent = "Player 2 has won the game";
        }
        else if(winningArr == 3){
            dialog.showModal();
            dialogWindow.textContent = "It's a tie";
        }
        button.addEventListener("click",() =>{
            dialog.close();
            clear();
        })
    }

    function clear(){
        players.clearPlayerTurns();
        grid.forEach(gridContainer => {
            gridContainer.textContent = "";
        });
        gameStart();
        playerTurn = true;
        counter = 0;
    }

    return {gameStart};
}

const start = gameFlow();
start.gameStart();