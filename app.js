const questions = [
    {
        q: "What brand is this?",
        img: "https://www.motortrend.com/uploads/2023/01/2023-Ford-Mustang-Mach-1-6M-42.jpg",
        answers: [
            "Renault",
            "Lada",
            "Ford",
            "Mustang"
        ],
        correct: "Ford"
    },
    {
        q: "What model is this?",
        img: "https://hips.hearstapps.com/hmg-prod/images/2022-honda-civic-hatchback-sport-touring-309-1634066512.jpg?crop=0.554xw:0.415xh;0.327xw,0.525xh&resize=1200:*",
        answers: [
            "Golf",
            "Huracan",
            "Sprinter",
            "Civic"
        ],
        correct: "Civic"
    },
    {
        q: "From what country is this car?",
        img: "https://hips.hearstapps.com/hmg-prod/images/2023-audi-r8-gt-rear-three-quarters-motion-1664827983.jpg?crop=0.782xw:0.717xh;0.150xw,0.184xh&resize=980:*",
        answers: [
            "Romania",
            "Germany",
            "Transnistria",
            "UK"
        ],
        correct: "Germany"
    },
    {
        q: "Guess the logo",
        img: "https://mir-s3-cdn-cf.behance.net/user/276/ea308718167987.56748eb87c60d.jpg",
        answers: [
            "Samsung",
            "Sony",
            "Seria A",
            "Superb"
        ],
        correct: "Samsung"
    },
    {
        q: "Guess the logo",
        img: "https://i.pinimg.com/originals/66/98/d2/6698d28bf4693ddcdf4cf335e41a6c81.png",
        answers: [
            "Michigan",
            "Michelin",
            "Roberto",
            "Michael"
        ],
        correct: "Michelin"
    },
    {
        q: "Guess the logo",
        img: "https://i.pinimg.com/736x/c4/10/55/c4105538e0ec9b3f486d1f02b3d32277.jpg",
        answers: [
            "Mustache",
            "Brown Red",
            "Red Papillon",
            "Pringles"
        ],
        correct: "Pringles"
    },
    {
        q: "Guess the logo",
        img: "https://cdn.virily.com/wp-content/uploads/2017/08/1200x630bb-1.jpg",
        answers: [
            "RedTube",
            "YouTube",
            "RedSquare",
            "WhiteTriangle"
        ],
        correct: "YouTube"
    },
    {
        q: "Which country is the most richest in the world?",
        img: "https://media.istockphoto.com/id/1178040199/photo/luxembourg-city-luxembourg.jpg?s=612x612&w=0&k=20&c=Nkp2opvfv0wAmZh1k7fxaNsobfqdcgQvHCqEfUffji0=",
        answers: [
            "Luxembourg",
            "Singapore",
            "Qatar",
            "Ireland"
        ],
        correct: "Luxembourg"
    },
    {
        q: "From which game is this pro player?",
        img: "https://www.esports.net/wp-content/uploads/2022/06/S1mple.jpg",
        answers: [
            "Dota 2",
            "Valorant",
            "CSGO",
            "PUBG"
        ],
        correct: "CSGO"
    },
    {
        q: "In which team is playing Monesy?",
        img: "https://www.esports.net/wp-content/uploads/2021/06/Monesy-G2.jpg",
        answers: [
            "Na'Vi",
            "G2 Esports",
            "Team Vitality",
            "Cloud9"
        ],
        correct: "G2 Esports"
    }
];

const gameDiv = document.getElementById("game");
const scoreDiv = document.getElementById("score");
const timerDiv = document.getElementById("timer");
const message = document.getElementById("message");

let iQuestion = 0;
let score = 0;
let streak = 0;
let count = 10;


// questions.forEach(question => {
//     gameDiv.innerHTML += `
//         <div class='question'>
//             <img src=${question.img}>
//             <h1>${question.q}</h1>
//             <div class='answers'>
//                 <span>${question.answers[0]}</span>
//                 <span>${question.answers[1]}</span>
//                 <span>${question.answers[2]}</span>
//                 <span>${question.answers[3]}</span>
//             </div>
//         </div>
//     `
// })

function showQuestion(qNumber) {
    if (qNumber >= questions.length) {
        endGame()
        return;
    }

    message.innerHTML = "";
    gameDiv.innerHTML = "";
    gameDiv.innerHTML += `
        <div class='question'>
            <img src=${questions[qNumber].img}>
            <h1>${questions[qNumber].q}</h1>
            <div class='answers'>
                <span class='answer'>${questions[qNumber].answers[0]}</span>
                <span class='answer'>${questions[qNumber].answers[1]}</span>
                <span class='answer'>${questions[qNumber].answers[2]}</span>
                <span class='answer'>${questions[qNumber].answers[3]}</span>
            </div>
        </div>
    `;

    const answers = document.getElementsByClassName('answer');
    let seconds = 10;
    let timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer);
            iQuestion += 1;
            showQuestion(iQuestion);
            return;
        }

        seconds -= 0.5;
        timerDiv.innerHTML = `<h1>${seconds}</h1><span>seconds</span>`

        if (seconds <= 5) {
            timerDiv.firstElementChild.style.color = "red"
        }
    }, 500);
    
    Array.from(answers).forEach(ans => {
        ans.addEventListener("click", () => {
            if (questions[qNumber].correct == ans.textContent) {
                streak += 1;
                if (streak >= 5) {
                    message.innerHTML = `
                        <h1 id='fire'>You're on fire!</h1>
                    `;
                    message.firstElementChild.style.color = 'orange';
                } else {
                    message.innerHTML = `
                        <h1>Great job!</h1>
                    `;
                    message.firstElementChild.style.color = 'green';
                }
                score += 100 * seconds;
                ans.style.color = 'green';
                ans.style.textShadow = '2px 4px 4px rgba(0, 128, 0, 0.5)'
            } else {
                streak = 0;
                message.innerHTML = `
                    <h1>Loser!</h1>
                `;
                message.firstElementChild.style.color = 'red';
                count -= 1;
                ans.style.color = 'red';
                ans.style.textShadow = '2px 4px 4px rgba(255, 0, 0, 0.5)'
                Array.from(answers).forEach(answer => {
                    if (answer.textContent === questions[qNumber].correct) {
                        answer.style.color = 'green';
                        answer.style.textShadow = '2px 4px 4px rgba(0, 128, 0, 0.5)';
                    }
                });
            }
            clearInterval(timer);
            showScore(score, count);

            ans.parentElement.style.pointerEvents = 'none';

            setTimeout(() => {
                iQuestion += 1;
                showQuestion(iQuestion);
            }, 2000)
        });
    });
}

function showScore(sc, count) {
    scoreDiv.innerHTML = `
        <h1>${sc}</h1><span>score</span>
    `;

    console.log(count)
    if (count > questions.length / 2) {
        scoreDiv.firstElementChild.style.color = 'green'
    } else {
        scoreDiv.firstElementChild.style.color = 'red'
    }
}

function endGame() {
    gameDiv.innerHTML = `
        <div class='end'>
            <h1>The game has ended</h1>
        </div>
    `;

    timerDiv.style.display = "none";
}

showQuestion(iQuestion);