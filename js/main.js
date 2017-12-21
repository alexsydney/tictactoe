const boardDimesion   = 3;
let currentPlayer   = 1;  // player 1 = O, player 2 = X
let currentMoves    = 1;

let scores = {
  1: {
    win: 0,
    lose: 0,
    draw: 0
  },
  2: {
    win: 0,
    lose: 0,
    draw: 0
  },

  updateWin: function (winner) {
    let loser;
    if(winner === 1){
      loser = 2;
    } else {
      loser = 1;
    }
    this[winner].win += 1;
    this[loser].lose += 1;
  }
};

const movesBeforeWin  = (2 * boardDimesion) - 1;
let totalMoves      = boardDimesion*boardDimesion;

const playerTwo = {
  avatarClass: 'iron-man-weapon'
};

const playerOne = {
  avatarClass: 'captain-america-weapon'
};

// Set Array globally and randomize values
let items = [
  [   0,    0,    0   ],
  [   0,    0,    0   ],
  [   0,    0,    0   ]
];

const gameReset = function () {
  currentMoves = 1;
  items = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  $('.grid').attr('class', 'grid');  // remove symbols from game boardDimesion

  $('.grid').removeAttr('data-select');
};

//check with the row
let winCondRow = function(row) {
  let hasWonRow = true; // reset this to be true
  for (let d = 0; d < items[row].length; d++) {
    if(items[row][d] != items[row][0]){
      hasWonRow = false; //reset back to be false
    }
  }
  return hasWonRow;
};

let winCondColumn = function(column){
  let hasWonColumn = true; // reset to be true
  for (let j = 0; j < items[column].length; j++) {
    if(items[j][column] != items[0][column]){
      hasWonColumn = false; //reset back to be false
    }
  }
  return hasWonColumn; // TODO: make this a local variable
};

// check for diagonal from left to right direction
let winCondDiagonalLeftRight = function(){
  let hasWonDiagonal1 = true; // reset this to be true
  for (let k = 0; k < boardDimesion; k++) {
    // check if the item selected is not on first row and first column
    if(items[k][k] !== items[0][0]){
      hasWonDiagonal1 = false; // reset back to be false
    }
  }
  return hasWonDiagonal1;
};

// check for diagonal from right to left direction
let winCondDiagonalRightLeft = function(){
  let hasWonDiagonal2 = true; // reset this to be true
  let squareSize = boardDimesion - 1;
  for (let l = 0; l < boardDimesion; l++) {
    // check if the item select is not first row and column
    if(items[l][squareSize - l] !== items[0][squareSize - 0]) {
      hasWonDiagonal2 = false;  // reset back to be false
    }
  }
  return hasWonDiagonal2;
};

// check for row, column on each row
let gameLogic = function(row, col){

  if(winCondRow(row) || winCondColumn(col) || winCondDiagonalLeftRight() || winCondDiagonalRightLeft() ) {
    scores.updateWin(currentPlayer);
    gameOverMessage(currentPlayer);
  } else if (currentMoves >= totalMoves){
    scores[1].draw += 1;
    scores[2].draw += 1;
    gameOverMessage(0);  // 0 means a draw
  } // end else

};

// check out total games
// display message
let showMainMessage = function(){
  $('.Info').addClass('hide'); $('.overlay').fadeIn('1000'); $('.message').addClass('show');
};

// each player has their turn to play on.
let switchPlayer  = function(){
  currentPlayer = (currentPlayer == 1) ? 2 : 1;
  // Change Info message
  if(currentPlayer == 1) {
    $('.Info').text("Player 1's turn");
  } else {
    $('.Info').text("Player 2's turn");
  }
};

const gameOverMessage = function (winType) {
  if( winType === 0 ){
    // draw
    $('#player1Score .draws').text(scores[1].draw);
    $('#player2Score .draws').text(scores[2].draw);
    $('.overlay .theMessage').text("It's a draw game!");
  } else {
    $('.overlay .theMessage').text(`Well done player ${winType}, You've won the game!`);
    $(`#player1Score .wins`).text( scores[1].win );
    $(`#player2Score .wins`).text( scores[2].win );
    $(`#player1Score .losses`).text( scores[1].lose );
    $(`#player2Score .losses`).text( scores[2].lose );
    $('#applause')[0].play();
  }
  showMainMessage();
};

// event handler start from here
$('.grid').on('click', function(e){
  let $this = $(this);
  // Prevent player click on taking mark grid have been selected
  if($this.hasClass('marked-o') || $this.hasClass('marked-x')) {
    $('.Info').html("Player " + currentPlayer + "'s turn - <strong>You cannot click on a marked spot</strong>");
    return;
  }; // end of data-select

  // Set appropriate attributes/values to grid clicked
  if(currentPlayer == 1) {
    $this.addClass('marked-o').addClass(playerTwo.avatarClass)
    $('#nought')[0].play();
  } else {
    $this.addClass('marked-x').addClass(playerOne.avatarClass);
    $('#cross')[0].play();
  }

  // Change the value of the 2-D array (a game logic)
  let currentRow = $this.data('row');
  let currentColumn = $this.data('column');
  items[currentRow][currentColumn] = currentPlayer;

  //check if any current move
  if(currentMoves >= movesBeforeWin) {
    gameLogic(currentRow, currentColumn); // call gameLogic function, check for win
  }

  switchPlayer();  //call switchPlayer
  currentMoves++;  // increasing currentMoves counter

}); // end of grid


//when click select players buttons for game. It will display all players
$('select-players').click( function(e) {
  e.preventDefault();
  $('.start-message').addClass('hide');
  $('.start-overlay').fadeOut('1000');
});

// when click ready button to play game to call preventDefault and hide start-message class and make start-overlay class fade out time
$('.lets-play').click( function(e) {
  e.preventDefault();
  $('.start-message').addClass('hide');
  $('.start-overlay').fadeOut('1000');
});

// when click on play again button and it call preventDefault method and reload method to start new game
$('.message').on('click', '.play-again', function(e){
  e.preventDefault();
  gameReset();
  $('.overlay').fadeOut('500');
});
