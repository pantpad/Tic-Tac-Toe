console.log('y');

const gameBoard = (function () {
    //Object properties
    const gameBoardArr = ['', '', '', '', '', '', '', '', ''];
    let currentUser = 'X';
    //cache DOM
    const grids = document.querySelectorAll('.field');
    const playerTurn = document.getElementById('player-turn');

    //bind EVENTS
    grids.forEach(grid => grid.addEventListener('click', (e) => {
        addMark(grid.getAttribute('data-index'),currentUser);
        renderBoard();
        renderPlayerTurn();
    }));

    //functions
    function renderBoard(){
        grids.forEach((grid,index) => grid.textContent = gameBoardArr[index]);
    }

    function renderPlayerTurn(){
        playerTurn.textContent = `Player ${currentUser} Turn`;
    }

    function addMark(field,currentUser){
        if(checkFieldAvailability(field)){
            console.log(`field available`);
            gameBoardArr[field - 1] = currentUser;
            switchCurrentUser();
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

    function switchCurrentUser(){
        (currentUser == 'O' ? currentUser = 'X' : currentUser = 'O');
    }

    return {gameBoardArr};
})();

