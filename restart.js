function restart() {
    resetButton.classList.add("hidden");
    playersTurn.classList.add("hidden");
    scoreboardPlayerOne.classList.add("hidden");
    scoreboardPlayerTwo.classList.add("hidden");
    choice.classList.remove("hidden");
    singlePlayerMode.classList.remove("hidden");
    twoPlayerMode.classList.remove("hidden");
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
   