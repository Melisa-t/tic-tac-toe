const gameBoard = {
  isPlayersTurn: false,
  isFinished: false,
  winner: null,
  winningConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ],
  playerOne: {
    score: 0,
    tag: `X`,
  },
  playerTwo: {
    score: 0,
    tag: `O`,
  },
  // player turn change
  checkPlayerTurn: function () {
    return !this.isPlayersTurn ? this.playerOne : this.playerTwo;
  },
  //on click, data cell text content should
  //change to players turn.
  changeCell: function () {
    const cellBtn = document.querySelectorAll(`.cell`);
    for (let i = 0; i < cellBtn.length; i++) {
      cellBtn[i].addEventListener("click", () => {
        const currentPlayer = this.checkPlayerTurn();
        cellBtn[i].textContent = currentPlayer.tag;
        this.changeStyle();
        this.isPlayersTurn = !this.isPlayersTurn;
      });
    }
  },
  changeStyle: function () {
    const currentPlayer = this.checkPlayerTurn();
    const xBtn = document.querySelector(`.x`);
    const oBtn = document.querySelector(`.o`);
    if (currentPlayer === this.playerOne) {
      xBtn.style.backgroundColor = `#78A083`;
      oBtn.style.backgroundColor = `#35374B`;
    } else {
      oBtn.style.backgroundColor = `#78A083`;
      xBtn.style.backgroundColor = `#35374B`;
    }
  },
};

gameBoard.changeCell();
