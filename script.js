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

    function playRound(markIndex){
        gameBoard.drawMark(markIndex,getCurrentPlayerSign());
        round++;
        displayController.renderMessage(getCurrentPlayerSign());
    }

    function getCurrentPlayerSign(){
        return round % 2 == 0 ? playerO.getSign() : playerX.getSign();
    }

    function reset(){
        round = 1;
        isOver = false;
        displayController.renderMessage(getCurrentPlayerSign());
    }

    return {playRound,reset};
})();

const displayController = (function(){
    //cache DOM
    const grids = document.querySelectorAll('.field');
    const turnMessage = document.getElementById('player-turn');
    const resetButton = document.querySelector('#reset-button');

    //bind events
    grids.forEach(grid => grid.addEventListener('click', (e) => {
        if(!gameBoard.isFieldAvailable(grid.getAttribute('data-index'))) return;
        gameController.playRound(grid.getAttribute('data-index'));
        renderBoard();
    }));

    resetButton.addEventListener('click',(e) => resetGame());

    //functions
    function renderBoard(){
        grids.forEach((grid,index) => {grid.textContent = gameBoard.getMark(index)});
    }

    function renderMessage(currentPlayer){
        turnMessage.textContent = `Player ${currentPlayer} Turn`;
    }

    function resetGame(){
        gameBoard.reset();
        gameController.reset();
        renderBoard();
    }

    return{renderMessage};
})();

