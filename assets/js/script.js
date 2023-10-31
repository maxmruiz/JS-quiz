//Adding all questions/answers into an array to be more easily accesible 

var questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        options: ['<script>', '<javascript>', '<scripting>', '<js>'],
        answer: 0
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        options: ['<script src="xxx.js">', '<script href="xxx.js">', '<script name="xxx.js">'],
        answer: 0
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        options: ['msg("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");', 'msgBox("Hello World");'],
        answer: 2
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        options: ['if (i <> 5)', 'if (i != 5)', 'if i =! 5 then', 'if i <> 5'],
        answer: 1
    },
    {
        question: 'How do you call a function named "myFunction"?',
        options: ['call myFunction()', 'myFunction()', 'call function myFunction()'],
        answer: 1
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        options: ['//This is a comment', 'This is a comment', '<!--This is a comment-->'],
        answer: 0
    },
    {
        question: 'How does a WHILE loop start?',
        options: ['while i = 1 to 10', 'while (i <= 10)', 'while (i <= 10; i++)'],
        answer: 1
    },
    {
        question: 'How does a FOR loop start?',
        options: ['for i = 1 to 5', 'for (i = 0; i <= 5)', 'for (var i = 0; i < length; i++)', 'for (i <= 5; i++)'],
        answer: 2
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        options: ['var colors = ["red", "green", "blue"]', 'car colors = (1."red", 2."green", 3."blue")', 'var colors = "red", "green", "blue"', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'],
        answer: 0
    },
    {
        question: 'How do you declare a JavaScript variable?',
        options: ['v carName;', 'var carName;', 'variable carName;'],
        answer: 1
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        options: ['X', '-', '*', '='],
        answer: 3
    },
    {
        question: 'How do you create a function in JavaScript?',
        options: ['function:myFunction()', 'function myFunction()', 'function = myFunction()'],
        answer: 1
    }
];

//Declaring initial variables
let currentQuestionIndex = 0;
let timer;
let timeLeft = 15;
let userScore = 0;
let answered = [];

// Declaring commonly used selectors
var container = document.querySelector(".container");
var quizBox = document.querySelector(".quiz-box");
var questionElement = document.querySelector(".question span");
var optionsElement = document.querySelector(".option-list");
var timeLeftElement = document.querySelector(".time-left");
var questionDiv = document.querySelector('.question');
var optionsDiv = document.querySelector('.option-list');
var scoreBox = document.querySelector('.score-box');
var finalScoreElem = scoreBox.querySelector('span p:first-of-type');
var totalQuestionsElem = scoreBox.querySelector('span p:last-of-type');

//Adding function to start the test
document.querySelector(".start-btn").addEventListener("click", function() {
    container.style.display = "none";
    quizBox.style.display = "block";

    //Keeping track of which question user is on
    document.querySelector('.total-questions-num').textContent = questions.length;

    loadQuestion(currentQuestionIndex);
    setTimer();
});

//Function for timer of quiz, once a question is answered incorrectly, the time is decreased by 2s
function setTimer(){
    timeLeft = 15;
    timeLeftElement.innerHTML = timeLeft;

    clearInterval(timer);

    timer = setInterval(function(){
        timeLeft--;
        timeLeftElement.innerHTML = timeLeft;
        //If user does not answer question in 15 seconds, they move onto the next question
        if (timeLeft <= 0){
            moveToNextQuestion();
        }
    }, 1000);
}

//Parent function of displaying each question and answer one by one
function loadQuestion(index) {
    var question = questions[index];

    questionDiv.textContent = question.question;
    optionsDiv.innerHTML = '';

    document.querySelector('.current-question').textContent = currentQuestionIndex + 1;

    question.options.forEach((option, idx) => {
        var optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;

        optionDiv.addEventListener("click", function() {
            if (answered.includes(currentQuestionIndex)) return;

            document.querySelectorAll('.option').forEach(function(opt){
                opt.classList.remove('selected-option');
            })

            optionDiv.classList.add('selected-option');

            //Checks if the answer user provided is correct answer, if yes, added to users score
            if (idx === question.answer) {
                userScore++;
            } else {
                timeLeft -= 2;//If not 2 seconds is removed
            }

            answered.push(currentQuestionIndex);

        });

        optionsDiv.appendChild(optionDiv);
    });

    setTimer();
}

document.querySelector(".next-btn").addEventListener("click", moveToNextQuestion);

//Checking to make sure that if there are more questions after the current one, to load it
function moveToNextQuestion(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        loadQuestion(currentQuestionIndex);
    } else {
        endQuiz(); //Otherwise end quiz if no more questions
    }
}

//Once the quiz is finished, timer clears and the score is displayed
function endQuiz() {
    clearInterval(timer);
    quizBox.style.display = "none";

    finalScoreElem.textContent = userScore;
    totalQuestionsElem.textContent = questions.length;

    scoreBox.style.display = 'block';

}

//If the user wishes to save their score, they will be prompted to enter their intials to save on leaderboard
document.querySelector('.save-score').addEventListener('click', function(){
    var initials = prompt("Enter your initials to save your score:");
    var score = userScore;

    saveScores(initials, score);
    alert('Score saved!');
});

//This function actually saves the users score onto local storage so it can be accessed
function saveScores(initials, score){
    var highScores = JSON.parse(localStorage.getItem('highscores')) || [];

    highScores.push({initials: initials, score: score});

    highScores.sort((a, b) => b.score - a.score);

    highScores = highScores.slice(0, 10);

    localStorage.setItem('highscores', JSON.stringify(highScores));

}

//If the user wishes to check the highscores, they click the 'highscore' button and are shown each person that has submitted their score
document.querySelector('.highscores').addEventListener('click', function(){
    var highScores = JSON.parse(localStorage.getItem('highscores')) || [];

    var highscoreContainerDiv = document.querySelector('.highscore-container');
    var scoreBoxDiv = document.querySelector('.score-box');
    var highscoreUl = highscoreContainerDiv.querySelector('.highscore-list');

    highscoreUl.innerHTML = '';

    highScores.forEach(scoreItem => {
        var li = document.createElement('li');
        li.textContent = `${scoreItem.initials}: ${scoreItem.score}`;
        highscoreUl.appendChild(li);
    });

    scoreBoxDiv.style.display = 'none';

    highscoreContainerDiv.style.display = 'block'
});

//Try again button for users who wish to play quiz again
document.querySelectorAll('.try-again').forEach(btn => {
    btn.addEventListener('click', function(){
        resetQuiz();
        scoreBox.style.display = 'none';
        document.querySelector('.highscore-container').style.display = 'none';
        quizBox.style.display = 'block';
        loadQuestion(currentQuestionIndex);
    });
});

//If the game is played again, variables would need to be set back to original value
function resetQuiz(){
    currentQuestionIndex = 0;
    timeLeft = 15;
    userScore = 0;
    answered = [];
    clearInterval(timer);
}
