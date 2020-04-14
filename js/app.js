const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestionOut = [];
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let data = fetch('../data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('File not found. HTTP ERROR: ' + response.status)
        }
        return response.json();

    })
    .then(data => {
        startGame(data);
    })



let scoreVal = 0;
const TOTAL_SCORE = 60;
// const MAX_QUESTIONS = 3;

startGame = (data) => {
    let totalQuestion = document.querySelector('.totalQuestions');
    totalQuestion.innerText = `${data.length}`
    score = 0;
    availableQuestions = data;


    getNewQuestion(availableQuestions);




    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;

            const selectedContainer = selectedChoice.parentElement;

            if (selectedChoice.innerHTML === currentQuestionOut["Answer"]) {
                scoreVal += 10;


                selectedContainer.classList.add('correct');
                setTimeout(() => {
                    selectedContainer.classList.remove('correct');
                }, 300);
                getNewQuestion(availableQuestions);
            } else {
                selectedContainer.classList.add('incorrect');
                setTimeout(() => {
                    selectedContainer.classList.remove('incorrect');
                    getNewQuestion(availableQuestions);
                }, 300);


            }








        })

    });


}


getNewQuestion = (arr) => {

    if (availableQuestions.length === 0) {
        const finishBtn = document.getElementById("finish-btn");

        finishBtn.removeAttribute("disabled");

    } else {
        let counter = availableQuestions.length;

        let currQuestion = document.querySelector('.currQuestion');
        currQuestion.innerText = `${counter}`;

        let progressWidth = document.querySelector(".progress-bar");
        progressWidth.style.width = `${(counter / 6) *100}%`;


        questionCounter++;

        let questionIndex = Math.floor(Math.random() * arr.length);
        let currentQuestion = availableQuestions[questionIndex];
        currentQuestionOut = currentQuestion;

        question.innerText = currentQuestion["question"];

        choices.forEach(choice => {
            const number = choice.dataset['number'] - 1;
            choice.innerText = currentQuestion["choice"][number]
        });

        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;
    }




};