console.log('y');

const Player = (name,input) => {
    const selectionArray = ['', '', '', '', '', '', '', '', ''];
    return {name,input,selectionArray};
}

const gameController = (function(){
    //Object Properties
    const user = Player('user','X');
    const cpu = Player('cpu','Y');

    function addMarkToPlayer(input,index){
        if(input == 'X'){
            user.selectionArray[index] = input;
        }
        if(input == 'O'){
            cpu.selectionArray[index] = input;
        }
    }
        

    return {addMarkToPlayer,user,cpu};
})();

const gameBoard = (function () {
    //Object properties
    const gameBoardArr = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    //cache DOM
    const grids = document.querySelectorAll('.field');
    const playerTurn = document.getElementById('player-turn');

    //bind EVENTS
    grids.forEach(grid => grid.addEventListener('click', (e) => {
        addMark(grid.getAttribute('data-index'),currentPlayer);
        renderBoard();
        renderPlayerTurn();
    }));

    //functions
    function renderBoard(){
        grids.forEach((grid,index) => grid.textContent = gameBoardArr[index]);
    }

    function renderPlayerTurn(){
        playerTurn.textContent = `Player ${currentPlayer} Turn`;
    }

    function addMark(field,currentPlayer){
        if(checkFieldAvailability(field)){
            console.log(`field available`);
            gameBoardArr[field - 1] = currentPlayer;
            gameController.addMarkToPlayer(currentPlayer,field);
            switchcurrentPlayer();
        }else{
            console.log(`field not available`);
        }
    }

    function checkFieldAvailability(field){
        if(gameBoardArr[field - 1] == ''){
            return true;
        }else{
            return false;
        }
        
    }

    function reset(){
        for(let i = 0; i < gameBoardArr.length;i++){
            gameBoardArr[i] = '';
        }
        renderBoard();
    }

    function switchcurrentPlayer(){
        (currentPlayer == 'O' ? currentPlayer = 'X' : currentPlayer = 'O');
    }

    return {gameBoardArr};
})();

