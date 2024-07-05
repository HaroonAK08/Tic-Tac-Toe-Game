let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#reset-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let movesCount = 0;
let singlePlayer = false;
let gameOver = false;

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initializeGame = () => {
  turn0 = true;
  movesCount = 0;
  gameOver = false;
  msgContainer.classList.add("hide");
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
};

const handleBoxClick = (box) => {
  if (gameOver) return;

  if (turn0) {
    // Player O
    box.innerText = "O";
    turn0 = false;
  } else {
    // Player X
    box.innerText = "X";
    turn0 = true;
  }
  box.disabled = true;
  movesCount++;
  checkWinners();
  if (!turn0 && singlePlayer && !gameOver) {
    setTimeout(computerMoves, 500);
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const computerMoves = () => {
  if (gameOver) return;

  let availableBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (availableBoxes.length > 0) {
    let randomBox =
      availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turn0 = true;
    movesCount++;
    checkWinners();
  }
};

const checkWinners = () => {
  for (let pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner", pos1Val);
        showWinner(pos1Val);
        disableBoxes();
        gameOver = true;
        return;
      }
    }
  }
  if (movesCount === 9) {
    msg.innerText = "No winner, it's a tie!";
    msgContainer.classList.remove("hide");
    gameOver = true;
  }
};

const startGame = (mode) => {
  singlePlayer = mode === "single-player";
  initializeGame();
};

const resetGame = () => {
  initializeGame();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => handleBoxClick(box));
});

rstBtn.addEventListener("click", resetGame);

initializeGame();
