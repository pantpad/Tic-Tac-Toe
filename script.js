console.log('y');

const Player = (sign) => {
  
    const getSign = () => {
      return sign;
    };
  
    return { getSign };
};
  
const gameBoard = (function () {
    //Object properties
    const arr = ['', '', '', '', '', '', '', '', ''];
    //functions
    function drawMark(field,mark){arr[field-1] = mark;};

    function getMark(field){return arr[field];}

    function isFieldAvailable(field){
        if(arr[field - 1] == ''){
            return true;
        }else{
            return false;
        }
    }

    function reset(){
        for(let i = 0; i < arr.length;i++){
            arr[i] = '';
        }
    }

    return {drawMark,getMark,isFieldAvailable,reset};
})();

const gameController = (function(){
    //Object Properties
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];

    function playRound(markIndex){
        gameBoard.drawMark(markIndex,getCurrentPlayerSign());
        if(hasCurrentPlayerWon()){
            isOver = true;
            displayController.renderMessage(`Player ${getCurrentPlayerSign()} HAS WON`);
        }else{
            if(round == 9){
                isOver = true;
                displayController.renderMessage(`It's a DRAW!`);
            }else{
            round++;
            displayController.renderMessage(`Player ${getCurrentPlayerSign()} Turn`);
            }
        }
    }

    function getCurrentPlayerSign(){
        return round % 2 == 0 ? playerO.getSign() : playerX.getSign();
    }

    function hasCurrentPlayerWon(){
        return winningCombination.some(combination => combination.every(winningIndex => gameBoard.getMark(winningIndex) == getCurrentPlayerSign()));
    }

    function isGameOver(){
        return isOver;
    }
    function reset(){
        round = 1;
        isOver = false;
        displayController.renderMessage(getCurrentPlayerSign());
    }

    return {playRound,isGameOver,reset};
})();

const displayController = (function(){
    //cache DOM
    const grids = document.querySelectorAll('.field');
    const turnMessage = document.getElementById('player-turn');
    const resetButton = document.querySelector('#reset-button');

    //bind events
    grids.forEach(grid => grid.addEventListener('click', (e) => {
        if(gameController.isGameOver() || !gameBoard.isFieldAvailable(grid.getAttribute('data-index'))) return;
        gameController.playRound(grid.getAttribute('data-index'));
        renderBoard();
    }));

    resetButton.addEventListener('click',(e) => resetGame());

    //functions
    function renderBoard(){
        grids.forEach((grid,index) => {grid.textContent = gameBoard.getMark(index)});
    }

    function renderMessage(message){
        turnMessage.textContent = message;
    }

    function resetGame(){
        gameBoard.reset();
        gameController.reset();
        renderBoard();
    }

    return{renderMessage};
})();

