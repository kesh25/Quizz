let score = document.querySelector(".scoreVal");
let username = document.getElementById("username");
let submit = document.getElementById("submit");

let scoredValues = localStorage.getItem('highscores');

let currentScore = JSON.parse(localStorage.getItem('Score'));

window.onload = function () {
    score.innerText = currentScore;

}

submit.addEventListener('click', e => {
    e.preventDefault();
    let usernameValue = username.value;
    if (usernameValue) {
        let playerScore = {
            usernameValue,
            currentScore,
        }
        if (!scoredValues) {
            let scores = [];
            scores.push(playerScore);
            scores.sort((a, b) => {
                return b.currentScore - a.currentScore;
            });
            scores.splice(5);

            localStorage.setItem("highscores", JSON.stringify(scores));

        } else {
            let scores = JSON.parse(localStorage.getItem('highscores'));

            scores.push(playerScore);
            scores.sort((a, b) => {
                return b.currentScore - a.currentScore;
            });
            scores.splice(5);
            localStorage.setItem("highscores", JSON.stringify(scores));
        }
        username.value = "";
        window.alert("Score Saved");
    }
})