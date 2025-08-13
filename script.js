console.log("Portfolio script loaded");

// Log line count to detect appended code
const scriptContent = document.currentScript ? document.currentScript.textContent : "Script content not accessible";
console.log(`Script length: ${scriptContent.split('\n').length} lines`);

// Toggle Dark Mode function
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Trivia Game logic
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyperlink Text Model", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-size", "text-size", "font-style", "text-scale"],
    answer: "font-size"
  },
  {
    question: "What is the purpose of JavaScript's 'async' keyword?",
    options: ["Synchronous execution", "Asynchronous execution", "Style rendering", "Database querying"],
    answer: "Asynchronous execution"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultElement = document.getElementById("result");

  if (questionElement && optionsElement && resultElement) {
    questionElement.innerText = q.question;
    optionsElement.innerHTML = "";
    q.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.className = "trivia-button";
      btn.innerText = option;
      btn.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(btn);
    });
    resultElement.innerText = "";
  } else {
    console.error("Missing DOM elements for trivia game");
  }
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const resultElement = document.getElementById("result");

  if (resultElement) {
    if (selected === q.answer) {
      score++;
      resultElement.innerText = "Correct! You're killing it!";
      resultElement.style.color = "#00ff00";
    } else {
      resultElement.innerText = `Nope! The answer was "${q.answer}".`;
      resultElement.style.color = "#e74c3c";
    }
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 1000);
  } else {
    console.error("Missing result element for trivia game");
  }
}

function showResult() {
  const percentage = (score / questions.length) * 100;
  let message = "";
  if (percentage === 100) {
    message = "You're a Tech Mastermind! 🤖";
  } else if (percentage >= 70) {
    message = "Solid skills! You're a Web Wizard! ✨";
  } else {
    message = "Nice try! Keep learning! 📚";
  }
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultElement = document.getElementById("result");
  const playAgainButton = document.getElementById("play-again");

  if (questionElement && optionsElement && resultElement && playAgainButton) {
    questionElement.innerText = "";
    optionsElement.innerHTML = "";
    resultElement.innerText = `Score: ${score}/${questions.length}! ${message}`;
    playAgainButton.style.display = "block";
  } else {
    console.error("Missing DOM elements for trivia result");
  }
}

// AI Code Cracker Game logic
let secretCode = [];
let attempts = 0;
const maxAttempts = 10;

function generateSecretCode() {
  secretCode = [];
  for (let i = 0; i < 4; i++) {
    secretCode.push(Math.floor(Math.random() * 10));
  }
}

function checkCodeGuess() {
  const guessInput = document.getElementById("code-guess");
  const feedbackElement = document.getElementById("code-feedback");
  const attemptsElement = document.getElementById("attempts");
  const submitButton = document.getElementById("submit-guess");
  const resetButton = document.getElementById("reset-code-cracker");

  if (!guessInput || !feedbackElement || !attemptsElement || !submitButton || !resetButton) {
    console.error("Missing DOM elements for Code Cracker game");
    return;
  }

  const guessValue = guessInput.value;
  if (!/^\d{4}$/.test(guessValue)) {
    feedbackElement.innerText = "Please enter a valid 4-digit code!";
    feedbackElement.style.color = "#e74c3c";
    return;
  }

  attempts++;
  const guess = guessValue.split("").map(Number);
  let correctDigits = 0;
  let correctPositions = 0;

  const codeCopy = [...secretCode];
  guess.forEach((digit, index) => {
    if (codeCopy.includes(digit)) {
      correctDigits++;
      codeCopy[codeCopy.indexOf(digit)] = null;
    }
    if (digit === secretCode[index]) {
      correctPositions++;
    }
  });

  if (correctPositions === 4) {
    feedbackElement.innerText = `AI Decoded! You cracked the code in ${attempts} attempts! 🎉`;
    feedbackElement.style.color = "#00ff00";
    submitButton.style.display = "none";
    resetButton.style.display = "block";
  } else if (attempts >= maxAttempts) {
    feedbackElement.innerText = `AI Lockout! Max attempts reached. The code was ${secretCode.join("")}.`;
    feedbackElement.style.color = "#e74c3c";
    submitButton.style.display = "none";
    resetButton.style.display = "block";
  } else {
    feedbackElement.innerText = `AI Analysis: ${correctDigits} digits correct, ${correctPositions} in the right position.`;
    feedbackElement.style.color = "var(--text)";
  }

  attemptsElement.innerText = `Attempts: ${attempts}/${maxAttempts}`;
  guessInput.value = "";
}

function resetCodeCracker() {
  const guessInput = document.getElementById("code-guess");
  const feedbackElement = document.getElementById("code-feedback");
  const attemptsElement = document.getElementById("attempts");
  const submitButton = document.getElementById("submit-guess");
  const resetButton = document.getElementById("reset-code-cracker");

  if (guessInput && feedbackElement && attemptsElement && submitButton && resetButton) {
    attempts = 0;
    generateSecretCode();
    guessInput.value = "";
    feedbackElement.innerText = "";
    attemptsElement.innerText = `Attempts: ${attempts}/${maxAttempts}`;
    submitButton.style.display = "block";
    resetButton.style.display = "none";
  } else {
    console.error("Missing DOM elements for Code Cracker reset");
  }
}

// Initialize games and event listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, initializing portfolio");

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const submitGuess = document.getElementById("submit-guess");
  const resetCodeCrackerButton = document.getElementById("reset-code-cracker");
  const playAgainButton = document.getElementById("play-again");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  } else {
    console.error("Dark mode toggle button not found");
  }
  if (submitGuess) {
    submitGuess.addEventListener("click", checkCodeGuess);
  } else {
    console.error("Submit guess button not found");
  }
  if (resetCodeCrackerButton) {
    resetCodeCrackerButton.addEventListener("click", resetCodeCracker);
  } else {
    console.error("Reset code cracker button not found");
  }
  if (playAgainButton) {
    playAgainButton.addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      playAgainButton.style.display = "none";
      loadQuestion();
    });
  } else {
    console.error("Play again button not found");
  }

  loadQuestion();
  generateSecretCode();
  const attemptsElement = document.getElementById("attempts");
  if (attemptsElement) {
    attemptsElement.innerText = `Attempts: ${attempts}/${maxAttempts}`;
  } else {
    console.error("Attempts element not found");
  }
});
