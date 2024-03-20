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
            console.log("player 1 = ",player1);
        } 
        else{
            player2.push(cell);
            player2.sort(function(a,b){return a - b});
            console.log("player 2 = ",player2);
        }
    }

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    function checkForWinP1(){ 
        const winningPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        if(player1.length >= 3){
            for(let i = 0;player1.length - i >= 3;i++){
                const tempArr = [];
                for(let j = 0;j < 3;j++){
                    tempArr.push(player1[j + i]);
                }
                for(let j = 0;j < winningPattern.length;j++){
                    if(arrayEquals(tempArr,winningPattern[j])){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function checkForWinP2(){ 
        const winningPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        if(player2.length >= 3){
            for(let i = 0;player2.length - i >= 3;i++){
                const tempArr = [];
                for(let j = 0;j < 3;j++){
                    tempArr.push(player2[j + i]);
                }
                for(let j = 0;j < winningPattern.length;j++){
                    if(arrayEquals(tempArr,winningPattern[j])){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    return {cellSelected,checkForWinP1,checkForWinP2};
})();

const gameFlow = function (){
    let playerTurn = false;

    const grid = document.querySelectorAll("li");
    

    function gameStart(){
        // for(let i = 0;i < 9;i++){

        //     // let cell = parseInt(prompt(`Player${+playerTurn + 1}`)) - 1;

        //     while(checkForErrors(cell)){
        //         // cell = parseInt(prompt(`Select a valid cell player${+playerTurn + 1}`)) - 1;
        //     }

        //     if(!playerTurn){
        //         players.cellSelected(cell,!playerTurn);
        //         gameBoard.appendCell(cell,"X");
        //         let winningPlayer = players.checkForWinP1();
        //         if(winningPlayer === true){
        //             endGame(1);
        //             return ;
        //         }
        //     }
        //     else{
        //         players.cellSelected(cell,!playerTurn);
        //         gameBoard.appendCell(cell,"O");
        //         let winningPlayer = players.checkForWinP2();
        //         if(winningPlayer === true){
        //             endGame(2);
        //             return ;
        //         }
        //     }

        //     playerTurn = !playerTurn;
        // }
        // endGame(3);
        grid.forEach(containers => {
            containers.addEventListener("click" , (e) =>{
                let cell = e.target.className;
                cell = parseInt(cell.charAt(cell.length - 1));
                players.cellSelected(cell,playerTurn); 
                if(playerTurn){
                    const circle = document.createElement("img");
                    circle.src = "Images/1811_circle.png";
                    e.target.appendChild(circle); 
                }
                else{
                    const cross = document.createElement("img");
                    cross.src = "Images/cross-23.png";
                    e.target.appendChild(cross);
                }
                playerTurn = !playerTurn;
            })
        });
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
        else if(winningArr === 2){
            alert("Player 2 has won the game");
        }
        else{
            alert("It's a tie");
        }
    }
    return {gameStart,endGame};
}

const start = gameFlow();
start.gameStart();