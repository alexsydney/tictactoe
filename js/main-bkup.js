console.log(`Test if the link correct`);

// const gameObject = {
//   hasWonRow: false,
//   hasWonDiagonal1: false,
//   hasWonDiagonal1: false,
//   hasWonDiagonal2: false,
//   winnerFound: false
// }
// Set Global Variables
let hasWonRow       = false;
let hasWonColumn    = false;
let hasWonDiagonal1 = false;
let hasWonDiagonal2 = false;
let winnerFound     = false;
const boardDimesion   = 3;

let currentPlayer   = 1;  // player 1 = O, player 2 = X
let currentMoves    = 1;
let gameCount  = 0;
let winerCount = 0;
let totalGame = 0;

let movesBeforeWin  = (2 * boardDimesion) - 1;
let totalMoves      = boardDimesion*boardDimesion;

// Set Array globally and randomize values

const items = [
  [   0,    0,    0   ],
  [   0,    0,    0   ],
  [   0,    0,    0   ]
];

//check with the row
let winCondRow = function(row) {
  hasWonRow = true; // reset this to be true
  for (let d = 0; d < items[row].length; d++) {
    console.log(`items[row][d]`);
    if(items[row][d] != items[row][0]){
      hasWonRow = false; //reset back to be false
    }
  }
};


let winCondColumn = function(column){
  hasWonColumn = true; // reset to be true
  for (let j = 0; j < items[column].length; j++) {
    console.log(`items[j][column]`);
    if(items[j][column] != items[0][column]){
      hasWonColumn = false; //reset back to be false
    }
  }
};

// function winCondColumn(column) {
//   hasWonColumn = true;
//   for( j = 0; j < items[column].length; j++) {
//     console.log(items[j][column]);
//     if(items[j][column] != items[0][column]) {
//       hasWonColumn = false;
//     }
//   }
// }



// check for diagonal from left to right direction
let winCondDiagonalLeftRight = function(){
  hasWonDiagonal1 = true; // reset this to be true
  for (let k = 0; k < boardDimesion; k++) {
    console.log(`items[k][k]`);
    // check if the item selected is not on first row and first column
    if(items[k][k] != [0][0]){
      hasWonDiagonal1 = false; // reset back to be false
    }
  }
};

// check for diagonal from right to left direction
let winCondDiagonalRightLeft = function(){
  hasWonDiagonal2 = true; // reset this to be true
  let squareSize = boardDimesion - 1;
  for (let l = 0; l < boardDimesion; l++) {
    console.log(`items[l][squareSize - l]`);
    // check if the item select is not first row and column
    if(items[l][squareSize - l] != items[0][squareSize - 0]) {
      hasWonDiagonal2 = false;  // reset back to be false
    }
  }
};


// check for row, column on each row
let gameLogic = function(){

  console.log('gameLogic()');

  for (let i = 0; i < items[0].length; i++) {
    // check a row false/blank
    if(hasWonRow == false){
      winCondRow(i); // called winCondRow and pass row value
    } // end for
    for ( i = 0; i < items[0].length; i++) {
      // check for column on same row
      if(hasWonColumn == false) {
        winCondColumn(i); // called winCondColumn and pass column value
      } // end if
    } // end for column

    // call this function for diagonal from left to right
    winCondDiagonalLeftRight();
    // call this function for diagonal from right to left
    winCondDiagonalRightLeft();

    // check any value of row or column or left to right or right to left is true

    console.log({hasWonRow, hasWonColumn, hasWonDiagonal1, hasWonDiagonal2});

    if(hasWonRow || hasWonColumn || hasWonDiagonal1 || hasWonDiagonal2) {
      console.log(`Someone already wonn...`);
      let x = $('.marked-x').length;
      let o = $('.marked-o').length;
      winnerFound = true;  // found a winner and set value to be true
      // check who is winner between player 1 or player 2

      winerCount += 1;
      console.log(`winerCount: `, winerCount );
      if( x >= o ){
        $('.overlay .theMessage').text("Well done Player 2, You've won the game!");
      } // end if
      // called this message and display a message
      showMainMessage();
    } else {
      console.log(`It is draw game.`); // no one winer
    } // end else

    gameCount += 1 ;
    console.log(`gameCount `, gameCount);
  }
  };


  // //check with the row
  // let winCondRow = function(row) {
  //   hasWonRow = true; // reset this to be true
  //   for (let d = 0; d < items[row].length; d++) {
  //     console.log(`items[row][d]`);
  //     if(items[row][d] != items[row][0]){
  //       hasWonRow = false; //reset back to be false
  //     }
  //   }
  // };

  // check with Column
  // let winCondColumn = function(column){
  //   hasWonColumn = true; // reset to be true
  //   for (let j = 0; j < items[column].length; j++) {
  //     console.log(`items[j][column]`);
  //     if(items[j][column] != items[0][column]){
  //       hasWonColumn = false; //reset back to be false
  //     }
  //   }
  // };


  // // check for diagonal from left to right direction
  // let winCondDiagonalLeftRight = function(){
  //   hasWonDiagonal1 = true; // reset this to be true
  //   for (let k = 0; k < boardDimesion; k++) {
  //     console.log(`items[k][k]`);
  //     // check if the item selected is not on first row and first column
  //     if(items[k][k] != [0][0]){
  //       hasWonDiagonal1 = false; // reset back to be false
  //     }
  //   }
  // };

  // // check for diagonal from right to left direction
  // let winCondDiagonalRightLeft = function(){
  //   hasWonDiagonal2 = true; // reset this to be true
  //   let squareSize = boardDimesion - 1;
  //   for (let l = 0; l < boardDimesion; l++) {
  //     console.log(`items[l][squareSize - l]`);
  //     // check if the item select is not first row and column
  //     if(items[l][squareSize - l] != items[0][squareSize - 0]) {
  //       hasWonDiagonal2 = false;  // reset back to be false
  //     }
  //   }
  // };

  // display message
  let showMainMessage = function(){
    console.log('showMainMessage()');
    $('.Info').addClass('hide'); $('.overlay').fadeIn('1000'); $('.message').addClass('show');
  };

  // each player has their turn to play on.
  let switchPlayer  = function(){
    currentPlayer = (currentPlayer == 1) ? 2 : 1;
    console.log('switched to ', currentPlayer );
  };

  // Change Info message
  if(currentPlayer == 1) {
    $('.Info').text("Player 2's turn");
  } else {
    $('.Info').text("Player 1's turn");
  }; // if Info message display


// event handler start from here
//clicked on grid
console.log('grid handler', $('.grid'));
$('.grid').on('click', function(e){
  let $this = $(this);

  console.log('cell clicked!');

  // Prevent player click on taking mark grid have been selected
  if($this.attr("data-select")) {
    $('.Info').html("Player " + currentPlayer + "'s turn - <strong>You cannot click on a marked spot</strong>");
    return;
  }; // end of data-select


const playerTwo = {
  avatarClass: 'iron-man-weapon'
}

const playerOne = {
  avatarClass: 'captain-america-weapon'
}

  // Set appropriate attributes/values to grid clicked
  if(currentPlayer == 1) {
    $this.addClass('marked-o').addClass(playerTwo.avatarClass).attr({ // mark as marked-o
      'data-select' : "selected",
      'data-marked': "o"});
    } else {
      $this.addClass('marked-x').addClass(playerOne.avatarClass).attr({ // marked as marked-x
        'data-select' : "selected",
        'data-marked': "o"});
      }; // check player tick x and o

      // Change the value of the 2-D array (a game logic)
      let currentRow = $this.data('row');
      let currentColumn = $this.data('column');

      items[currentRow][currentColumn] = currentPlayer;
      //check if any current move
      console.log({currentMoves, movesBeforeWin});
      if(currentMoves >= movesBeforeWin) {
        gameLogic(); // call gameLogic function
      }; // end of currentMoves

      // Conditions for end of game without winner (Draw)
      if(currentMoves >= totalMoves && winnerFound == false) {
        //display and call show message as draw game
        $('.overlay .theMessage').text("It's a draw game!");
        showMainMessage(); //call showMainMessage to display
      }; // draw message codition

      switchPlayer();  //call switchPlayer
      currentMoves++;  // increasing currentMoves counter
      }); // end of grid

      // // when click ready button to play game to call preventDefault and hide start-message class and make start-overlay class fade out time
      $('.lets-play').click( function(e) {
        e.preventDefault();
        $('.start-message').addClass('hide');
        $('.start-overlay').fadeOut('1000');
      });

      // // when click on play again button and it call preventDefault method and reload method to start new game
      $('.message').on('click', '.play-again', function(e){
        e.preventDefault();
        location.reload();
      });

      totalGame = gameCount + 1;
      console.log('totalGame:', totalGame);