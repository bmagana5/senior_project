const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'Go to the theater or a movie?',
        choice1: 'theater',
        choice2: 'movie>',
        answer: 1
    },
    {
      question:
          "Drink coffee or tea",
      choice1: "coffee",
      choice2: "tea",
  },
  {
    question:"Watch TV or read a book?",
    choice1: "TV",
    choice2: "Read a book",
  },
  {
    question:"Use Facebook or Twitter?",
    choice1: "Facebook",
    choice2: "Twitter",
  },
  {
    question:"Use iPhone or Android phone?",
    choice1: "iPhone",
    choice2: "Android",
  },
  {
    question:"Choose a free trip or money? ",
    choice1: "Trip",
    choice2: "money",
  },
  {
    question:"Stay in a hotel or an Airbnb home?",
    choice1: "Hotel",
    choice2: "Airbnb",
  },
  {
    question:"Hike or bike?",
    choice1: "Hike",
    choice2: "bike",
  },
  {
    question:"Have a night out or evening in?",
    choice1: "Night Out",
    choice2: "Evening in",
  },
  {
    question:"Mac or windows",
    choice1: "Mac",
    choice2: "Windows",
  },
 
];

//CONSTANTS
const CORRECT_BONUS = 0;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        getNewQuestion();
    });
});

startGame();