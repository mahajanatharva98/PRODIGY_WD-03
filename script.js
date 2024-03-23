// Select all the boxes on the game board
const boxes = document.querySelectorAll(".box");

// Player X starts the game
let currentPlayer = "X";

// Game board state
const boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to handle a player's move
function handleMove(index) {
    if (boardState[index] === "") {
        boardState[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("turn-info").textContent = `Turn for ${currentPlayer}`;
    }
}

// Function to check for a winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            return boardState[a];
        }
    }
    return null;
}

// Function to reset the game
function resetGame() {
    boardState.fill("");
    boxes.forEach((box) => (box.textContent = ""));
    currentPlayer = "X";
    document.getElementById("turn-info").textContent = "Turn for X";
}

// Add click event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!checkWinner() && boardState[index] === "") {
            handleMove(index);
            const winner = checkWinner();
            if (winner) {
                document.getElementById("turn-info").textContent = `${winner} wins!`;
            }
        }
    });
});

// Add a click event listener to the Reset button
document.getElementById("reset").addEventListener("click", resetGame);

// Initial message
document.getElementById("turn-info").textContent = "Turn for X";
