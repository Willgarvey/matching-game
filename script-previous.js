// Colors are shuffled and the pairs of colors are assigned to each of the cards
// User can click Single Player or Two Player
// Choosing a game type assigns some variables and sets some elements
// The game starts by assigning an event reciever to each card to handle either game type
// and to decide whose turn it is, if a match was made, the score, and when the game is over
// Animations are handled by assigning and removing css classes to html elements in JavaScript
// Cards are created in the HTML and CSS for this page and manipulated with JavaScript

// properties
let playerOne = "Player 1";
let playerTwo = "Player 2";
let gameOver = false;
let clickable = false;
let processingPair = false;
let firstCard = null;
let secondCard = null;
let gameMode = null;
let cardTypes = [];
let matchedPairs = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

// selectors
let cards = document.querySelectorAll(".card");
let choice = document.querySelector(".choice");
let playersTurn = document.querySelector(".currentPlayer");
let scoreboardPlayerOne = document.querySelector(".scoreboardPlayerOne");
let scoreboardPlayerTwo = document.querySelector(".scoreboardPlayerTwo");
let singlePlayerMode = document.querySelector(".singlePlayer");
let twoPlayerMode = document.querySelector(".twoPlayer");
let resetButton = document.querySelector(".restart");

// hide elements by default this can be moved into your html
// playersTurn.classList.add("hidden");
// scoreboardPlayerOne.classList.add("hidden");
// scoreboardPlayerTwo.classList.add("hidden");

singlePlayerMode.addEventListener("click", () => {
  //TODO: You can make gameMode an parameter for the startGame method to clarify gameMode is required
  gameMode = "single player";
  startGame();
});

twoPlayerMode.addEventListener("click", () => {
  gameMode = "two players";
  startGame();
});

function startGame() {
  
  function hideHeader(){
    choice.classList.add("hidden");
    singlePlayerMode.classList.add("hidden");
    twoPlayerMode.classList.add("hidden");
  }
  function showHeader(){
    choice.classList.remove("hidden");
    singlePlayerMode.classList.remove("hidden");
    twoPlayerMode.classList.remove("hidden");
  }
  function hideTwoPlayer(){
    playersTurn.classList.add("hidden");
    scoreboardPlayerOne.classList.add("hidden");
    scoreboardPlayerTwo.classList.add("hidden");
  }
  // TODO: This is never referenced with my refactoring somehow
  const showTwoPlayer = () => {
    playersTurn.classList.remove("hidden");
    scoreboardPlayerOne.classList.remove("hidden");
    scoreboardPlayerTwo.classList.remove("hidden");
  }
  //TODO: You can change this to a function if you want?
  function restart() {
    resetButton.classList.add("hidden");
    showHeader();
    hideTwoPlayer();
    currentPlayer = "Player 1"
    document.querySelector('#currentPlayer').textContent = playerOne; // this element is referenced in the beginning and can be simplified
    gameOver = false;
    gameMode = null;
    matchedPairs = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    document.getElementById("playerOneScore").textContent = playerOneScore; // TODO: This can be simplified
    document.getElementById("playerTwoScore").textContent = playerTwoScore; // TODO: This can be simplified
    cards.forEach((card) => { // this is a loop that goes through each card. forEach card, it removes
      // card.removeEventListener("click", gameLogic);
      // TODO: No need to remove card types here. Looks more realistic card.dataset.cardType = ""; // the cardType data attribute (sets it to an empty string)
      card.classList.remove("matched"); // and removes the "matched" class. This effectively resets
      card.classList.remove("flipped"); // the state of each card "erasing" what type of card it is and whether it's been matched or not.
    }); // finally, card.classList.remove("flipped") removes the "flipped" status of the cards, so when the 
    // Restart Game button is pressed, the cards shuffle and get flipped to their front side (black side)
    // TODO: Do not need to shuffle here assignCards(); // finally, calls assignCards function which assigns new card types to each card in a shuffled order
    clickable = false;
    firstCard = null;
    secondCard = null; // TODO: Semicolon missing here
  }
  // Shuffle the card types in the array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { // decrements from the end to the beginning of the array
      const j = Math.floor(Math.random() * (i + 1));
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  }
  // Assign the card types to each card
  function assignCards() {
    cardTypes = [];
    for (let i = 0; i < 10; i++) { // this populates the cardTypes array with numbers up to but not including 10
      cardTypes.push(i, i); // we're pushing the same number twice to create a matching pair
    }

    cardTypes = shuffle(cardTypes);
    // let cards = document.querySelectorAll(".card"); // TODO: cards is already declared and is already accessible
    for (let i = 0; i < cards.length; i++) {
      cards[i].dataset.cardType = cardTypes[i]; // assigns each card a cardType from the shuffled cardTypes array
    } 
    // dataset.cardType is a way to set a custom data attribute ('data-card-type') on each card element
    // the dataset.cardType is assigning the value of the card to a number in an array from 0-9, and then in the CSS,
    // we have said "the card with the data-card-type of [0] - [9] gets this color."
  }

  resetButton.classList.remove("hidden");
  resetButton.addEventListener("click", restart);
  hideHeader();

  // Single Player parameters to set
  //TODO: This if can be removed and boolean moved above
  if (gameMode === "single player") {
    clickable = true
    console.log(cards);}
  // Two Player paramaters to set
  // TODO: This can be changed to an if statement
  else if (gameMode === "two players") {
    clickable = true
    currentPlayer = "Player 1";
    scoreboardPlayerOne.classList.remove("hidden");
    scoreboardPlayerTwo.classList.remove("hidden");
    playersTurn.classList.remove("hidden");
  }
  // Define the event listeners for each card in the game
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (clickable === true) { // TODO: You can add the next if check to this as "AND NOT CARD CONTAINS MATCHED CLASS"
        // If card was already matched, do nothing
        if (card.classList.contains("matched")) {
          return}
          // Check if none of the cards have the flipped class and the game is not over
        if (!gameOver && !card.classList.contains("flipped")) {// TODO: Add clickable = false when all matches are found to remove this gameover check
          card.classList.add("flipped");
          // Check if none of the cards have the flipped class and both first and second cards are null, then 
          //if (!card.classList.contains("flipped") /*&& firstCard !== card && secondCard !== card*/ ) {
          //  card.classList.add("flipped");}
          // Select the first card
          if (!firstCard) {
            firstCard = card;}
          // Select the second card
          else if (firstCard !== card && !secondCard) { // This runs if match or
            secondCard = card;
            clickable = false;}
          // TODO: If you check if the cards are a match first then you can use the else cluase for the no matches case
          // TODO: If you switch these you can add the code to change current player name in the mismatch case
          // TODO: So it does not change until the cards are flipped back over for smoother UI.
          // Check if the cards are not a match and flip over
          if (firstCard.dataset.cardType !== secondCard.dataset.cardType) {
            setTimeout(() => {
              if (!firstCard.classList.contains("matched") && !secondCard.classList.contains("matched")) {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");}
              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
            // TODO: Added this to make it work for both game types
            if (gameMode === "two players") {
              currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
              // Change the current player between 1 and 2
              //TODO: Replace the below commented if else with one line of code getting the text from currentPlayer
              document.getElementById("currentPlayer").textContent = currentPlayer;
            //   if (currentPlayer === "Player 1") {
            //     document.getElementById("currentPlayer").textContent = playerOne;}
            //   else {
            //     document.getElementById("currentPlayer").textContent = playerTwo;}
           }     
          }
          // Otherwise set cards as a match
          else {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            clickable = true;
            matchedPairs++
            // Add a point for the current player
            if (gameMode === "two players") {
              if (currentPlayer === "Player 1") {
                playerOneScore++;
                document.getElementById("playerOneScore").textContent = playerOneScore;
              }
              else {
                playerTwoScore++;
                document.getElementById("playerTwoScore").textContent = playerTwoScore;
              }
            }   
          }
          // Check if all pairs have been matched
          if (matchedPairs === cardTypes.length / 2) {
            gameOver = true;
            setTimeout(() => {
              if (playerOneScore > playerTwoScore) {
                alert("player 1 is the winner");
              } else if (playerTwoScore > playerOneScore) {
                alert("player 2 is the winner");
              } else {
                alert("it's a tie");
              }
              restart();
            }, 100);
          }
        }
      }
    });
  });
  // Assign a color value from the color array to each card on the page
  assignCards();
}