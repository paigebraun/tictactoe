let mark;
const gameboard = document.querySelector('.gameboard');
const pickPlayerBox = document.querySelector('.pickPlayerBox');
const pickPlayerText = document.querySelector('.pickPlayerText');
const pickO = document.getElementById('pickO');
const pickX = document.getElementById('pickX');

function startGame(callback) {
    //Listen for which mark user picks and present starting gameboard accordingly
    pickPlayerBox.addEventListener('click', pickPlayerFunc)
    function pickPlayerFunc(e) {
        if (e.target.id === 'pickO') {
            mark = 'O';
            e.target.style.filter = 'none';
            e.target.style.boxShadow = 'inset 2px 2px 3px rgb(201, 201, 201)';
            e.target.style.backgroundColor = '#f7f7f7';
            setTimeout(displayGame, 300);
        }
        else if (e.target.innerText === 'O') {
            mark = 'O';
            e.target.parentNode.style.filter = 'none';
            e.target.parentNode.style.boxShadow = 'inset 2px 2px 3px rgb(201, 201, 201)';
            e.target.parentNode.style.backgroundColor = '#f7f7f7';
            setTimeout(displayGame, 300);
        }
        else if (e.target.id === 'pickX') {
            mark = 'X';
            e.target.style.filter = 'none';
            e.target.style.boxShadow = 'inset 2px 2px 3px rgb(201, 201, 201)';
            e.target.style.backgroundColor = '#f7f7f7'; 
            setTimeout(displayGame, 300);
        }
        else if (e.target.innerText === 'X') {
            mark = 'X';
            e.target.parentNode.style.filter = 'none';
            e.target.parentNode.style.boxShadow = 'inset 2px 2px 3px rgb(201, 201, 201)';
            e.target.parentNode.style.backgroundColor = '#f7f7f7';
            setTimeout(displayGame, 300);
        }
    }
    function displayGame() {
        pickPlayerBox.style.display = 'none';
        pickPlayerText.style.display = 'none';
        gameboard.style.display = 'grid';
        pickPlayerBox.removeEventListener('click', pickPlayerFunc);
        callback(mark);
    }
}

//callback function to save which mark the player picks
function assignPlayer(mark) {
    let player1 = mark;
    gameModule(player1);
}

//simulate gameplay against the computer
function gameModule(player1) {
    const startText_x = document.querySelector('.startText_x');
    const startText_o = document.querySelector('.startText_o');
    const restartBtn = document.querySelector('.restartBtn');
    const playAgainBtn = document.querySelector('.playAgainBtn');
    const winnerMsg = document.querySelector('.winnerMsg');
    const x_won = document.querySelector('.x_won');
    const o_won = document.querySelector('.o_won');
    const tie = document.querySelector('.tie');

    let gameboardArray = ['', '', '', '', '', '', '', '', ''];

    let computer;
    if (player1 === 'X') {
        startText_x.style.display = 'block';
        computer = 'O';
    }
    else {
        startText_o.style.display = 'block';
        computer = 'X';
    }
    restartBtn.style.display = 'block'

    //Restart game if restart or play again buttons are clicked
    restartBtn.addEventListener('click', restartFunc);
    playAgainBtn.addEventListener('click', restartFunc);
    function restartFunc() {
        restartBtn.style.boxShadow = 'inset 3px 3px 3px rgba(0, 0, 0, 0.2)';
        restartBtn.style.backgroundColor = '#dd2626';
        playAgainBtn.style.boxShadow = 'inset 3px 3px 3px rgba(0, 0, 0, 0.2)';
        playAgainBtn.style.backgroundColor = '#dd2626';
        setTimeout(restartGame, 300);
    }
    function restartGame() {
        location.reload();
        
    }
    
    const winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
  
    //Gameplay
    let idx = 0;
    let winner = false;
    let currentPlayer = player1;
    
    gameboard.addEventListener('click', gameboardFunc);
    function gameboardFunc(e) {
        startText_x.style.display = 'none';
        startText_o.style.display = 'none';

        //Add X or O to empty spot on gameboard
        if((e.target.childNodes.length === 0) && (winner === false)) {
            const play = document.createElement('div');
            play.className = currentPlayer;
            play.innerText = currentPlayer;
            e.target.appendChild(play);

            //Update gameboard array
            idx = e.target.id.slice(-1);
            gameboardArray[idx] = currentPlayer;

            //Check for win & display win message
            for (i=0; i < winning_combinations.length; i++) {
                if (((gameboardArray[winning_combinations[i][0]] === gameboardArray[winning_combinations[i][1]]) && (gameboardArray[winning_combinations[i][0]] === gameboardArray[winning_combinations[i][2]])) &&
                    (gameboardArray[winning_combinations[i][0]] != '')) {
                    for (j=0; j<winning_combinations[i].length; j++) {
                        gameboard.children[winning_combinations[i][j]].style.backgroundColor = '#67A766';
                    }
                    winner = true;
                    restartBtn.style.display = 'none';
                    winnerMsg.style.display = 'flex';
                    if (gameboardArray[winning_combinations[i][0]] === 'X') {
                        x_won.style.display = 'block';
                    } else {
                        o_won.style.display = 'block';
                    }
                } 
            }
            
            //Check if its a tie game
            if ((gameboardArray.includes('') === false) && (winner === false)){
                restartBtn.style.display = 'none';
                winnerMsg.style.display = 'flex';
                tie.style.display = 'block';
            }
            switchTurn();
        }
    }
    function switchTurn() {
        if (currentPlayer === player1) {
            currentPlayer = computer;
        } else {
            currentPlayer = player1;
        }
    }
    
}

startGame(assignPlayer);