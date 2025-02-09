
const test_questions = [
    {
        "question": "What comes next in the sequence? 2, 6, 12, 20, __",
        "options": ["28", "30", "32", "36"],
        "answer": "30"
    },
    {
        "question": "A farmer has 17 sheep, and all but 9 run away. How many sheep are left?",
        "options": ["0", "8", "9", "17"],
        "answer": "9"
    },
    {
        "question": "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        "options": ["Echo", "Shadow", "Wave", "Fire"],
        "answer": "Echo"
    },
    {
        "question": "Which word does not belong in the group? Apple, Banana, Carrot, Grape",
        "options": ["Apple", "Banana", "Carrot", "Grape"],
        "answer": "Carrot"
    },
    {
        "question": "A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much does the ball cost?",
        "options": ["$0.05", "$0.10", "$0.15", "$0.20"],
        "answer": "$0.05"
    }
];

const score_remarks = [
    "Damnn you're on fire 🔥",
    "Awesome attempt 🧧",
    "Above average at least 👏",
    "Common Take another swing 👇🏽",
    "Lucky number Eyy 🥲, Take another spin",
    "Try Again!, Only way to go now is up"
]

// DOM elements
const firstElement = document.getElementById('first')
const secondElement = document.getElementById('second')
const thirdElement = document.getElementById('third')
const questionElement = document.getElementById("question")
const optionsElement = document.getElementById("options")
const progressElement = document.getElementById("progress")
const scoreElement = document.getElementById("score")
const remarkElement = document.getElementById("remark")
const totalElement = document.getElementById("total")
const nextButton = document.getElementById("next")
const startButton = document.getElementById("start")
const restartButton = document.getElementById("restart")
const timerElement = document.getElementById("timer")


// state tracking
let currentQuestionIndex = 0
let currentQuestionPlus = currentQuestionIndex + 1
let score = 0
let timeLeft = 12
let timer

// Load the question
startButton.addEventListener("click", function () {
    firstElement.style.display = "none";
    secondElement.style.display = "flex";
    progressElement.textContent = `Question ${currentQuestionIndex + 1} out of ${test_questions.length}`
    loadQuestion()
})

// load question
function loadQuestion() {
    const currentQuestion = test_questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    timeLeft = 12; // Reset timer each time a new question loads
    startTimer();

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button")
        button.textContent = option
        button.classList.add("option")
        button.addEventListener("click", () => selectAnswer(option));
        optionsElement.append(button)
    })

    progressElement.textContent = `Question ${currentQuestionIndex + 1} out of ${test_questions.length}`
}

// Timer function 10 seconds per question
function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            // Update the timer display
            timerElement.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
        } else {
            clearInterval(timer);  // Stop the timer when it reaches 0
            nextButton.click();  // Go to the next question automatically when time is up
        }
    }, 1000);
}

// Mark the question
function selectAnswer(option) {
    const currentQuestion = test_questions[currentQuestionIndex];
    if ( option === currentQuestion.answer ) {
        score++ // Increase Score if the answer is correct
    }

    currentQuestionIndex++ // Increase question number to the next number
    if (currentQuestionIndex < test_questions.length) {
        loadQuestion()
    } else {
        displayResult()
    }
}

// Display Test result
function displayResult() {
    firstElement.style.display = "none"
    secondElement.style.display = "none";
    thirdElement.style.display = "block";
    scoreElement.textContent = score
    remarkElement.textContent = "Remark: " + score_remarks[5 - score]
    totalElement.textContent = test_questions.length
}

// Restart quiz on click
restartButton.addEventListener('click', function () {
    currentQuestionIndex = 0
    score = 0
    thirdElement.style.display = "none";
    secondElement.style.display = "none";
    firstElement.style.display = "block";
})

// // Go to next question on reminder else show result
nextButton.addEventListener('click', function () {
    selectAnswer("null")
})

// Start Quiz
restartButton.click();
// function startButton.addEvent("click", )

