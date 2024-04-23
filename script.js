// Pairs of colors are shuffled in an array and then assigned to each of the cards
// User can choose Single Player or Two Player to start the game
// The game starts by assigning an event reciever to each card to handle either game type
// andecide whose turn it is, if a match was made, the score, and when the game is over
// Animations are handled by assigning and removing css classes to html elements in JavaScript
// Cards are created in the HTML and CSS for this page and manipulated with JavaScript

// properties
let mainMenu = true;
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
let playersTurn = document.querySelector(".currentPlayer");
let restartContainer = document.querySelector(".restartContainer");
let scoreboard = document.querySelector(".scoreboard");
let scoreboardPlayerOne = document.querySelector(".scoreboardPlayerOne");
let scoreboardPlayerTwo = document.querySelector(".scoreboardPlayerTwo");
let singlePlayerMode = document.querySelector(".singlePlayer");
let twoPlayerMode = document.querySelector(".twoPlayer");
let resetButton = document.querySelector(".restart");
let menu = document.querySelector(".menu");
let title = document.querySelector(".title");
let gameTitle = document.querySelector(".gameTitle");

let end = document.querySelector(".end");
let result = document.querySelector(".result");
let restartGame = document.querySelector(".mainMenu");

// Flip the cards for show after the cards are assigned
flipCardsWithDelay();

// event listeners to select either Single Player or Two Players
singlePlayerMode.addEventListener("click", () => {
  startGame(gameMode = "single player");
});
twoPlayerMode.addEventListener("click", () => {
  startGame(gameMode = "two players");
});
resetButton.addEventListener("click", restart);

//Functions
//Flips card in random streaks during the main menu
async function flipCardsWithDelay() {
  for (let i = 0; i < cards.length; i++) {
    if (!mainMenu){
      break;
    }
    const randomIndex = Math.floor(Math.random() * 20); // Generate a random index between 0 and 19
    const card = cards[randomIndex];
    if (cards[randomIndex].classList.contains("flipped")){
      continue;
    }
    setTimeout(() => {
      card.classList.add("flipped");
      setTimeout(() => {
        card.classList.remove("flipped");
      }, 500); // Half a second (500 milliseconds) delay to remove the class
    }, 500); // 1 second delay for each card (multiplied by its index)
    await new Promise(resolve => setTimeout(resolve, 250)); // Half a second delay
    if (i === cards.length/2-1){
      i=0;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Half a second dela
      assignCards();
    }
  }
}
async function waitForCardsNotFlipped() {
  const cards = document.querySelectorAll(".card");
  // Check if any card has flipped class
  function isAnyCardFlipped() {
    return Array.from(cards).some(card => card.classList.contains("flipped"));
  }
  // Wait until all cards no longer have the flipped class
  while (isAnyCardFlipped()) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 1 second
  assignCards();
  clickable = true;
}
function restart() {
  resetButton.classList.add("hidden");
  playersTurn.classList.add("hidden");
  scoreboardPlayerOne.classList.add("hidden");
  scoreboardPlayerTwo.classList.add("hidden");
  scoreboardPlayerOne.display = "hidden";
  scoreboardPlayerTwo.display = "hidden";
  singlePlayerMode.classList.remove("hidden");
  twoPlayerMode.classList.remove("hidden");
  menu.classList.remove("hidden");
  title.classList.remove("hidden");
  gameTitle.classList.add("hidden");
  scoreboard.classList.remove("revealScoreboard");
  scoreboard.display = "none";
  end.classList.add("hidden");
  result.classList.add("hidden");
  restartGame.classList.add("hidden");
  
  currentPlayer = "1";
  document.querySelector('#currentPlayer').textContent = currentPlayer; // this element is referenced in the beginning and can be simplified
  mainMenu = true;
  gameOver = false;
  gameMode = null;
  matchedPairs = 0;
  playerOneScore = 0;
  playerTwoScore = 0;
  document.getElementById("playerOneScore").textContent = playerOneScore; 
  document.getElementById("playerTwoScore").textContent = playerTwoScore; 
  cards.forEach((card) => { 
    card.classList.remove("matched"); 
    card.classList.remove("flipped"); 
  });
  clickable = false;
  firstCard = null;
  secondCard = null;
  flipCardsWithDelay();
}
function assignCards() {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap array elements at index i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  cardTypes = [];
  for (let i = 0; i < 10; i++) {// Create an list of each number twice 1 through 10
    cardTypes.push(i, i);
  }
  cardTypes = shuffle(cardTypes);
  // Set a custom data attribute ('data-card-type') for each card element
  for (let i = 0; i < cards.length; i++) {
    cards[i].dataset.cardType = cardTypes[i]; // assigns a cardType from the shuffled cardTypes
  } // In CSS we have defined that cards with the data-card-type of [0]-[9] are assigned a specified color.   
}

// Main game loop that sets game type and card event listeners to handle the game logic
function startGame(gameMode) {
  // built-in functions 
  mainMenu = false;
  if (gameMode === "two players") {
    currentPlayer = "1";
    scoreboardPlayerOne.classList.remove("hidden");
    scoreboardPlayerTwo.classList.remove("hidden");
    scoreboardPlayerOne.display = "flex";
    scoreboardPlayerTwo.display = "flex";
    scoreboard.display = "flex";
    playersTurn.classList.remove("hidden");
    end.classList.add("hidden");
    result.classList.add("hidden");
    restartGame.classList.add("hidden");
  }
  else {
    restartContainer.classList.add("flex");
  }
  // Trigger the function when needed
  waitForCardsNotFlipped();
  resetButton.classList.remove("hidden");
  singlePlayerMode.classList.add("hidden");
  twoPlayerMode.classList.add("hidden");
  menu.classList.add("hidden");
  title.classList.add("hidden");
  gameTitle.classList.remove("hidden");
  scoreboard.classList.add("revealScoreboard");
  // Define the event listeners for each card in the game
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (clickable === true && !card.classList.contains("matched")) {
        card.classList.add("flipped");
        // If the first card has not been selected yet
        if (!firstCard) {
          firstCard = card;
        }
        // If first card has already been selected but not the second card
        else if (firstCard !== card && !secondCard) {
          secondCard = card;
          clickable = false;
          // Check if the first and second cards match
          if (firstCard.dataset.cardType === secondCard.dataset.cardType) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            clickable = true;
            matchedPairs++
            // Add a point for the current player
            if (gameMode === "two players") {
              // If current player is Player 1 add to their score, else add to Player 2's score
              currentPlayer === "1" ? playerOneScore++ : playerTwoScore++;
              console.log(currentPlayer+"'s score increased");
              document.getElementById("playerOneScore").textContent = playerOneScore;
              document.getElementById("playerTwoScore").textContent = playerTwoScore;
            }
          } 
          // Otherwise the first and second cards do not match
          else {
            setTimeout(() => {
              firstCard.classList.remove("flipped");
              secondCard.classList.remove("flipped");
              firstCard = null;
              secondCard = null;
              clickable = true;
              // Change the current player if in Two Player Mode
              if (gameMode === "two players") {
                currentPlayer = currentPlayer === "1" ? "2" : "1";
                document.getElementById("currentPlayer").textContent = currentPlayer;
              }     
            }, 500);        
          }         
        }
        // Check if all pairs have been matched
        if (matchedPairs === cardTypes.length / 2) {
          gameOver = true;
          clickable = false;
          // TODO: Reveal the end menu
          end.classList.remove("hidden");
          result.classList.remove("hidden");
          restartGame.classList.remove("hidden");
          restartGame.addEventListener("click", restart);
          // Set the Play Again button event listener based on current game type
          // Main menu button will restart the game
          if (gameMode === "two players"){
            if (playerOneScore > playerTwoScore) {
              document.getElementById("result").innerHTML = "PLAYER 1 WINS!";         
            } else if (playerTwoScore > playerOneScore) {
              document.getElementById("result").innerHTML = "PLAYER 2 WINS!";
            } else if (playerOneScore === playerTwoScore) {
              document.getElementById("result").innerHTML = "TIE GAME";
            }
          } else if (gameMode === "one player") {
            document.getElementById("result").innerHTML = "YOU WIN!";
          }                       
        }
      }
    });
  });
}



