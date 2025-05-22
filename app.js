let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["yellow", "purple", "green", "red"];
let started = false; 
let level = 0;

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");

// Display highest score initially
h3.innerHTML = `Highest Score: <b>${highestScore}</b>`;
h3.style.color = "green";

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press Any Key to Restart`;

        // Flash red
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 250);

        // Update highest score
        if (level > highestScore) {
            highestScore = level;
        }
        h3.innerHTML = `Highest Score: <b>${highestScore}</b>`;

        restart();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function restart() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
