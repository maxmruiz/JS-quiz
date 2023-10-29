let currentQuestionIndex = 0;
let score = 0;
let timer = 15;
let timerInterval;

var startBtn = document.querySelector('.start-btn');
var container = document.querySelector('.container');
var scoreBox = document.getElementById('highscore-btn');
var quizBox = document.querySelector('.quiz-box');
var optionsList = document.querySelectorAll('.option-list');
var timerText = document.querySelector('.time-left');
var nextBtn = document.querySelector('next-btn');
var totalQuestionsText = document.querySelector('.total-questions');

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    container.style.display = 'none';
    quizBox.style.display = 'block';

    displayQuestion();

    timerInterval = setInterval(function(){
        timer--;
        timerText.textContent = timer;

        if (timer <= 0){
            endQuiz();
        }
    }, 1000);
}

function displayQuestion(){
    let question = optionsList[currentQuestionIndex];
    question.style.display = 'block';

    totalQuestionsText.innerHTML = `<p>${currentQuestionIndex + 1}</p> of <p>12</p>`;
}

optionsList.forEach((options, index) => {
    options.addEventListener('click', (e) => {
        if(e.target.classList.contains('option')){
            clearInterval(timerInterval);
            let isCorrect = e.target.querySelector('.correct');
            if(isCorrect){
                score++;
            }
            if (currentQuestionIndex < optionsList.length -1 ){
                optionsList[currentQuestionIndex].style.display = 'none';
                currentQuestionIndex++;
                displayQuestion();
                timer = 15;
                timerInterval = setInterval(function(){
                    timer--;
                    timerText.textContent = timer;
                    if(timer <= 0){
                        endQuiz();
                    }
                }, 1000);
            } else {
                endQuiz();
            }
        }
    });
});