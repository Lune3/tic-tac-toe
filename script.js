const gameBoard = (function (){
    const grid = [];
    for(let i = 0;i < 9;i++){
        grid.push(-1);
    }
    function appendCell(cell,character){
        grid[cell] = character;
    }
    return {appendCell};
})();

const players = (function (){
    const player1 = [];
    const player2 = [];
    function cellSelected(cell,playerTurn){
        if(playerTurn) player1.push(cell);
        else player2.push(cell);
    }
    return {cellSelected};
})();

const gameFlow = function (){
    let playerTurn = 1;
    
    function gameStart(){
        for(let i = 0;i < 9;i++){
            const cell = parseInt(prompt("Select your cell"));
            if(playerTurn === 1){
                players.cellSelected(cell,playerTurn);
                gameBoard.appendCell(cell,"X");
            }
            else{
                players.cellSelected(cell,playerTurn);
                gameBoard.appendCell(cell,"O");
            }
        }
    }
}