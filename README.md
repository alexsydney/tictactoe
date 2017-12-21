This is my Project 0

Overview
Let's start out with something fun - a game!

We'll be making Tic Tac Toe, a game that takes seconds to learn but minutes to master! Everyone will get a chance to be creative, and work through some really tough programming challenges to get your feet wet in the world of web development.

What You've Learned
By the time you submit this project, you will have covered new ground in many of the big themes of the course:

Command Line: Practice interacting with the computer and navigating the filesystem from the command line.
Source Control: Manage and interact with a git repository to store changes to code.
Programming Fundamentals: Work with array, objects, event handlers & callbacks, while learning how to strategically solve problems and resolve errors.
Web Fundamentals: Learn how communication happens over the internet, and how to structure, style, and animate documents within a browser. Also learn how to respond to actions taken by your users and the data they input into the browser.
Browser Applications: Dive into CSS and learn how to use libraries and frameworks to get lots of style for free.
Deployment: Host a static web site in a managed hosting environment.
Products and Teams: Document your code and your code repository so others understand what you've built.

Big Goals
Build a web application from scratch, without a starter codebase
Use your programming skills to map out the game logic for a simple game like Tic Tac Toe
Separate HTML, CSS, and JavaScript files in your application
Build an application to a spec that someone else gives you
Build a dynamic game that allows two players to compete

Pseudocode

startUp()
 - Play game start sound
 - Make game heading visible

newGame()
 - reload page

tickClick()
  If cell clicked is blank then
    If X player turn then
      Display an 'X' in clicked cell
      Set turn to 'O' player
      Add 1 to turns count
      Register click in array
      Play crosses sound
    Else
      Display an 'O' in clicked cell
      Set turn to 'X' player
      Add 1 to turns count
      Register click in array
      Play noughts sound
    End
  End
  Check for winner
  If winner then
    Show message
    play game over sound
  End
  If clicks > 8 then
    show draw game message
  End

  winnerGame()
    If 3 'X' in a row then
       set crosses as winner
    end

    If 3 'O' in a row then
        set noughts as winner
    end

    return winner

  showMessage()  
    Build message
    set message location
    set message as visible
    Hide 'New Game' button


(Link to live Tic tac toe game)[https://alexsydney.github.io/tictactoe/]

In this project. I choose adventure theme, Iron man, captain of America for players and image background.

Wishlist: I really like to put more themes and players and allow users can select any theme and player from the list before they can start to play a game.
