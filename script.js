const solution = "JUSTUS";
let attempts = 0;
const maxAttempts = 6;

function submitGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.toUpperCase();
  const message = document.getElementById("message");

  if (guess.length !== 6) {
    message.textContent = "Must be 6 letters.";
    return;
  }

  const board = document.getElementById("board");
  for (let i = 0; i < 6; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";

    if (guess[i] === solution[i]) {
      tile.classList.add("correct");
    } else if (solution.includes(guess[i])) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }

    tile.textContent = guess[i];
    board.appendChild(tile);
  }

  attempts++;
  input.value = "";
  message.textContent = "";

  if (guess === solution) {
    flashVictory();
  } else if (attempts >= maxAttempts) {
    fakeMalware();
  }
}

function flashVictory() {
  const overlay = document.getElementById("overlay");
  overlay.textContent = "JUSTUS";
  overlay.style.backgroundColor = "black";
  overlay.style.color = "red";
  overlay.classList.remove("hidden");
  setTimeout(() => {
    overlay.textContent = getVictoryMessage();
  }, 1500);
}

function fakeMalware() {
  const overlay = document.getElementById("overlay");
  overlay.textContent = "⚠️ JUSTUS HAS CORRUPTED YOUR SESSION ⚠️";
  overlay.classList.remove("hidden");
}

function getVictoryMessage() {
  const messages = [
    "you've only scratched the surface",
    "congrats. now uninstall yourself.",
    "you were always meant to lose",
    "this isn't the end...",
    "the system is watching you"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
