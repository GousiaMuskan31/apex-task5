// Puzzle Data
const puzzles = [
  { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
  { question: "I have keys but no locks. I have space but no room. What am I?", answer: "keyboard" },
  { question: "What has hands but can’t clap?", answer: "clock" }
];

let currentPuzzle = 0;
let solved = 0;
let timeLeft = 300; // 5 minutes in seconds
let timer;

// Elements
const puzzleQuestion = document.getElementById("puzzleQuestion");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitAnswer");
const startBtn = document.getElementById("startGame");
const feedback = document.getElementById("feedback");
const timerDisplay = document.getElementById("timer");
const puzzlesSolved = document.getElementById("puzzlesSolved");

// Start Game
startBtn.addEventListener("click", () => {
  currentPuzzle = 0;
  solved = 0;
  timeLeft = 300;
  updateTimerDisplay();
  puzzleQuestion.textContent = puzzles[currentPuzzle].question;
  answerInput.value = "";
  feedback.textContent = "";
  startTimer();
});

// Submit Answer
submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim().toLowerCase();
  if (answer === puzzles[currentPuzzle].answer) {
    solved++;
    puzzlesSolved.textContent = solved;
    feedback.textContent = "✅ Correct!";
    currentPuzzle++;
    answerInput.value = "";

    if (currentPuzzle < puzzles.length) {
      puzzleQuestion.textContent = puzzles[currentPuzzle].question;
    } else {
      puzzleQuestion.textContent = "🎉 Congratulations! You escaped the room!";
      clearInterval(timer);
    }
  } else {
    feedback.textContent = "❌ Try again!";
  }
});

// Timer
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      puzzleQuestion.textContent = "⏰ Time’s up! You failed to escape.";
      feedback.textContent = "";
    }
  }, 1000);
}

function updateTimerDisplay() {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  timerDisplay.textContent = `Time Left: ${min}:${sec < 10 ? "0" : ""}${sec}`;
}