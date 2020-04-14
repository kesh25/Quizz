window.onload = () => {
    let scores = JSON.parse(localStorage.getItem('highscores'));
    let container = document.querySelector(".scorearea");
    scores.forEach(score => {
        let div = document.createElement("div");
        div.classList.add("player");
        let h4 = document.createElement("h4");
        h4.innerText = score.usernameValue + "" + ":";
        let p = document.createElement("p");
        p.innerText = score.currentScore;

        div.appendChild(h4);
        div.appendChild(p);

        container.append(div);
    })


}