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

//Adding functions
function startQuiz() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.quiz-box').style.display = 'block';

    timer = setInterval(function(){
        timeLeft--;
        document.querySelector('.timer').innerText = timeLeft;

        if (timeLeft <= 0){
            endQuiz();
        }
    }, 1000);

    displayQuestion();
}

function displayQuestion(){
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    var q = questions[currentQuestionIndex]
    document.querySelector('.question').innerText = q.question;

    var options = document.querySelector('.options span');
    options.forEach((option, index) =>{
        option.innerText = q.options[index];
    });
}

function checkAnswer(index) {
    var correct = questions[currentQuestionIndex].answer;

    if (index !== correct){
        timeLeft -= 5;
    }

    currentQuestionIndex++;
    displayQuestion();
}

function endQuiz(){
    clearInterval(timer);
    document.querySelector('.quiz-box').style.display = 'none';
    document.querySelector('.score-box').style.display = 'block';
    document.querySelector('.score-box p').innerText = timeLeft;
}

document.querySelector('.start-btn').addEventListener('click', startQuiz); //Starting the quiz once the start button is clicked

var options = document.querySelectorAll('.option');
options.forEach((option, index) =>{
    option.addEventListener('click', function(){
        checkAnswer(index);
    });
});