console.log(`Test if the link correct`);


let winnerFound     = false;
const boardDimesion   = 3;

let currentPlayer   = 1;  // player 1 = O, player 2 = X
let currentMoves    = 1;
//count for the game to play
let gameCount = 0;
let gameDraw  = 0;
let totalGame = 0;
let play1Win = 0;
let play2Win = 0;

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
    console.log(`items[row][d]`);
    if(items[row][d] != items[row][0]){
      hasWonRow = false; //reset back to be false
    }
  }
  return hasWonRow;
};


let winCondColumn = function(column){
  let hasWonColumn = true; // reset to be true
  for (let j = 0; j < items[column].length; j++) {
    console.log(`items[j][column]`);
    if(items[j][column] != items[0][column]){
      hasWonColumn = false; //reset back to be false
    }
  }
  return hasWonColumn; // TODO: make this a local variable
};

// check for diagonal from left to right direction
let winCondDiagonalLeftRight = function(){
  let hasWonDiagonal1 = true; // reset this to be true
  // let hasWonDiagonal1 = true; // reset this to be true
  for (let k = 0; k < boardDimesion; k++) {
    console.log({k, itemsKK: items[k][k]});
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
  // let squareSize = boardDimesion - 1;
  for (let l = 0; l < boardDimesion; l++) {
    console.log(`items[l][squareSize - l]`);
    // check if the item select is not first row and column
    if(items[l][squareSize - l] !== items[0][squareSize - 0]) {
      hasWonDiagonal2 = false;  // reset back to be false
    }
  }
  return hasWonDiagonal2;
};


// check for row, column on each row
let gameLogic = function(row, col){
  //count number of game to play
  // gameCount += 1 ;
  // console.log(`game Count `, gameCount);

  console.log('gameLogic()', row, col);
    // call this function for diagonal from left to right
    winCondDiagonalLeftRight();
    // call this function for diagonal from right to left
    winCondDiagonalRightLeft();

    console.log('WIN CHECK:', winCondRow(row) || winCondColumn(col) || winCondDiagonalLeftRight() || winCondDiagonalRightLeft());


    if(winCondRow(row) || winCondColumn(col) || winCondDiagonalLeftRight() || winCondDiagonalRightLeft() ) {
      console.log(`Someone already wonn...`);
      let x = $('.marked-x').length;
      let o = $('.marked-o').length;
      winnerFound = true;  // found a winner and set value to be true
      // check who is winner between player 1 or player 2
      //only applause when game had winner
      // let gameCount = 1;
      if( x >= o ){
        play2Win += 1;

        $('.overlay .theMessage').text("Well done Player 2, You've won the game!");
        console.log(`Number game player 2 win: `, play2Win);
      } // end if
      // called this message and display a message
      // $('#applause')[0].play();
      showMainMessage();
      play1Win += 1;
      console.log(`player 1's winner count: `, play1Win);
    } else {
      gameDraw += 1;
      console.log(`It is draw game.`); // no one winer
      console.log(`Number game draw :`, gameDraw);
    } // end else

     gameCount += 1;

    // if(winnerFound = true){
    //   $('#applause')[0].play();
    // }
  // }
  };
 // check out total games
  totalGame = gameCount + 1;
  console.log('totalGame:', totalGame);

  // display message
  let showMainMessage = function(){
    console.log('showMainMessage()');
    $('.Info').addClass('hide'); $('.overlay').fadeIn('1000'); $('.message').addClass('show');
  };

  // each player has their turn to play on.
  let switchPlayer  = function(){
    currentPlayer = (currentPlayer == 1) ? 2 : 1;
    console.log('switched to ', currentPlayer );
    // Change Info message
    if(currentPlayer == 1) {
      $('.Info').text("Player 1's turn");
    } else {
      $('.Info').text("Player 2's turn");
      // $('.Info').text("Player 2's turn");
    };
  };

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

  // Set appropriate attributes/values to grid clicked
  if(currentPlayer == 1) {
    $this.addClass('marked-o').addClass(playerTwo.avatarClass).attr({ // mark as marked-o
      'data-select' : "selected",
      'data-marked': "o"});
      $('#sound2')[0].play();
    } else {
      $this.addClass('marked-x').addClass(playerOne.avatarClass).attr({
        // marked as marked-x
        'data-select' : "selected",
        'data-marked': "o"});

      $('#sound1')[0].play();
    } // check player tick x and o

      // Change the value of the 2-D array (a game logic)
      let currentRow = $this.data('row');
      let currentColumn = $this.data('column');
      console.log({currentRow, currentColumn});
      items[currentRow][currentColumn] = currentPlayer;
      //check if any current move
      console.log({currentMoves, movesBeforeWin});
      if(currentMoves >= movesBeforeWin) {
        gameLogic(currentRow, currentColumn); // call gameLogic function, check for win
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
        // location.reload();
        gameReset();
        $('.overlay').fadeOut();
      });

      // const $clap = $('.clap').ready('')
      // totalGame = totalGame + 1;
      // console.log('totalGame:', totalGame);
