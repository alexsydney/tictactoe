console.log(`Working`);

(function(){
 // Set Global Variables
  let hasWonRow       = false;
  let hasWonColumn    = false;
  let hasWonDiagonal1 = false;
  let hasWonDiagonal2 = false;
  let winnerFound     = false;
  const boardDimesion   = 3;

  const currentPlayer   = 1;  // player 1 = O, player 2 = X
  let currentMoves    = 1;

  let movesBeforeWin  = (2 * boardDimesion) - 1;
  let totalMoves      = boardDimesion*boardDimesion;

  // Set Array globally and randomize values

  let items = [
    [   0,    0,    0   ],
    [   0,    0,    0   ],
    [   0,    0,    0   ]
  ];

  randomizeArray();

 $('grid').click(function(e){
   let $this = $(this);
 })

 // Prevent player click on taking mark grid have been selected
 if($this.attr("data-select")) {
   $('.Info').html("Player " + currentPlayer + "'s turn - <strong>You cannot click on a marked spot</strong>");
   return;
 };

 // Set appropriate attributes/values to grid clicked
   if(currentPlayer == 1) {
      $this.addClass('marked-o').attr({ // mark as marked-o
        'data-select' : "selected",
        'data-marked': "o"});
   } else {
      $this.addClass('marked-o').attr({ // marked as marked-x
       'data-select' : "selected",
       'data-marked': "o"});
   }

  // Change the value of the 2-D array (a game logic)
    let currentRow = $this.data('row');
    let currentColumn = $this.data('column');

    items[currentRow][currentColumn] = currentPlayer;




    let gameLogic = function(){

    }

    //check with the row
    let winCondRow = function(row) {
        hasWonRow = true; // reset this to be true
        for (let i = 0; i < items.length; i++) {
           console.log(`items[row][i]`);
           if(items[row][i] != items[row][0]){
             hasWonRow = false; //reset back to be false
           }
        }
    }

    // check with Column
    let winCondColumn = function(column){

    }



})
