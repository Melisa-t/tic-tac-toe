const gameBoard = {
  isPlayersTurn: false,
  isFinished: false,
  winner: null,

  playerOne: {
    userName: `X Player`,
    tag: `X`,
    moves: [],
  },
  playerTwo: {
    userName: `O Player`,
    tag: `O`,
    moves: [],
  },
  playGame: function () {
    this.reset();
    this.changeCell();
  },
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

  checkPlayerTurn: function () {
    return !this.isPlayersTurn ? this.playerOne : this.playerTwo;
  },
  changeCell: function () {
    const cellBtn = document.querySelectorAll(`.cell`);
    for (let i = 0; i < cellBtn.length; i++) {
      cellBtn[i].addEventListener("click", () => {
        const currentPlayer = this.checkPlayerTurn();
        if (cellBtn[i].textContent !== ``) {
          alert(`Choose another cell!`);
        } else {
          currentPlayer.moves.push(i);
          cellBtn[i].textContent = currentPlayer.tag;
          this.checkWin();
          this.changeStyle();
          this.isPlayersTurn = !this.isPlayersTurn;
        }
      });
    }
  },

  isSubset: function (array1, array2) {
    return array2.every((e) => array1.includes(e));
  },

  checkWin: function () {
    const currentPlayer = this.checkPlayerTurn();
    for (let i = 0; i < this.winningConditions.length; i++) {
      if (
        currentPlayer.moves.length >= 3 &&
        this.isSubset(currentPlayer.moves, this.winningConditions[i])
      ) {
        this.winner = currentPlayer;
        modalBox.showModal(currentPlayer.userName);
        this.reset();
      } else if (
        (this.playerOne.moves.length === 5 ||
          this.playerTwo.moves.length === 5) &&
        this.winner === null
      ) {
        modalBox.showDrawModal();
        this.reset();
      }
    }
  },

  changeStyle: function () {
    const currentPlayer = this.checkPlayerTurn();
    const xBtn = document.querySelector(`.x`);
    const oBtn = document.querySelector(`.o`);
    if (currentPlayer === this.playerOne) {
      oBtn.style.backgroundColor = `#78A083`;
      xBtn.style.backgroundColor = `#35374B`;
    } else {
      xBtn.style.backgroundColor = `#78A083`;
      oBtn.style.backgroundColor = `#35374B`;
    }
  },

  resetCells: function () {
    const cellBtn = document.querySelectorAll(`.cell`);
    for (let i = 0; i < cellBtn.length; i++) {
      cellBtn[i].textContent = ``;
    }
    this.playerOne.moves = [];
    this.playerTwo.moves = [];
    this.isPlayersTurn = false;
    this.winner = null;
    this.isFinished = true;
  },
  reset: function () {
    this.resetCells();
    const restartBtn = document.querySelector(`.restart-btn`);
    restartBtn.addEventListener("click", (e) => {
      this.resetCells();
    });
  },
};

const modalBox = {
  showModal: function (player) {
  modal.style.display = "block";
  modalP.textContent = `${player} won! ⭐`;
},

showDrawModal: function (){
    modal.style.display = "block";
  modalP.textContent = `Draw! 👾`;
},

closeModal: function () {
  modal.style.display = "none";
  modalP.textContent = ``;
},
}
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close");
const modalP = document.querySelector(
  `.modal-content > .modal-text-container > p`
);

closeBtn.onclick = function () {
  modalBox.closeModal();
};
window.onclick = function (event) {
  if (event.target == modal) {
    modalBox.closeModal();
  }
};
gameBoard.playGame();
