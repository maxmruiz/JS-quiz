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
var nextButton = document.querySelector('next-btn');
var totalQuestionsText = document.querySelector('.total-questions');

