//Variables
let timer = questions.length * 10;
let startButton = document.querySelector("#start-quiz");
let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;
let score = 0;
let myInterval = 0;

//Starts Quiz & Sets Timer
startButton.addEventListener("click", function () {
    event.preventDefault();
    showQuestions();
    let myInterval = setInterval(function () {
        timer--;
        if (timer > 0)
            document.querySelector("#timer").textContent = "Time: " + timer + " seconds remaining";
        if (timer <= 0) {
            clearInterval(myInterval);
            
            results()
        }
    }, 1000);
})

//Show Quiz Questions
function showQuestions() {
    document.querySelector("#starting-quiz").innerHTML = "";
    let current = questions[currentQuestion];
    document.querySelector("#question").innerHTML = current.title;
    document.querySelector("#response").innerHTML = "";
    document.querySelector("#correct").innerHTML = "";

    for (var i = 0; i < current.choices.length; i++) {
        let choice = document.createElement("button")
        choice.innerHTML = current.choices[i];
        choice.setAttribute("class", "choice");
        choice.setAttribute("value", i);
        choice.onclick = verify;
        document.querySelector("#response").appendChild(choice);
    }
}

//Correct Answer Verification
function verify() {
    console.log(this.value, questions[currentQuestion].answer)
    if (questions[currentQuestion].answer === parseInt(this.value)) {
        correctAnswer++
        score = score + 10

    } else {
        incorrectAnswer++
        timer = timer - 15

    }
    console.log(correctAnswer, incorrectAnswer);

    currentQuestion++
    if (currentQuestion === questions.length) {
        score = score + timer
        timer = 0
    }
    else {
        showQuestions()
    }
}
//Results Page
function results() {
    document.querySelector("h3").innerHTML = "Final Score";
    document.querySelector("#quiz-area").innerHTML = score;

    let highscore = document.createElement("button");
    document.body.appendChild(highscore);

    let restartQuiz = document.createElement("button");
    document.body.appendChild(restartQuiz);
    restartQuiz.id = "restart";
    restartQuiz.innerHTML = "Restart Quiz";

    restartQuiz.addEventListener("click", function () {
        location.reload();
    })

    //Set or Clear Highscore
    highscore.id = "choice"
    highscore.innerHTML = "Submit Score";
    highscore.addEventListener("click", function () {
        event.preventDefault();
        playerName = prompt("What is your name?");
        window.localStorage.setItem(playerName, score);
        console.log(playerName, score)
        window.localStorage.getItem(playerName, score);
        document.querySelector("#highscore-list").innerHTML = playerName + " - " + score;
        document.querySelector("h3").innerHTML = "";
        document.querySelector("#quiz-area").innerHTML = "";

        if (document.getElementById("clear-score")) {
        } else {
            let clearScore = document.createElement("button");
            document.body.appendChild(clearScore);
            clearScore.id = "clear-score";
            clearScore.innerHTML = "Clear Scores";
            clearScore.addEventListener("click", function () {
                window.localStorage.clear();
                document.querySelector("#highscore-list").innerHTML = "";
            })
        }
    })

}
