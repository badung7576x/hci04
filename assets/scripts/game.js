var placeLetterInterval = 500;
var placeLetterTimer, moveLettersTimer;
var startButton, resetButton;
var box, message, score;

var list_am_dau = {'S': ['s'], 'T':['t'], 'K': ['k', 'c'], 'H':['h'], 'R':['r'], 'P':['b'], 
                   'KR': ['ng', 'ngh'], 'KP':['g', 'gi'], 'SH':['d'], 'SP':['n', 'đ'], 
                   'PR':['l', 'q'], 'SR':['ch'], 'SK':['nh'], 'TK':['d'], 'TP':['n'], 
                   'RH':['m'], 'SPH':['p'], 'SPK':['v'], 'STR':['c']};
var list_am_chinh = {'-HSUO':['uổ'], 'N-SUO':['uỗ'], :['ă'], 'N-UO':['uộ'], '-SY':['uớ'], :['uỳa'], :['uờ'], :['uở'], 
                     :['uỡ'], :['uâ'],:[ 'uợ'], :['ọa']};
// var list_am_cuoi = {'p', 'c', 't', 'ch', 'u', 'ng', 'i', 'y', 'nh', 'm', 'n', 'o'};

function placeLetter() {
    var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    var newLetter = document.createElement("div");
    newLetter.innerHTML = letter;
    newLetter.className = letter;

    newLetter.style.top = Math.random() * 300 + "px";
    newLetter.style.right = 1000 - (Math.random() * 500) + "px";

    box.appendChild(newLetter);
}

function moveLetters() {
    var boxes = document.querySelectorAll("#box > div");
    let failCount = 0;
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.right = parseInt(boxes[i].style.right) - 10 + "px";
        if (parseInt(boxes[i].style.right) <= -10) {
            endGame();
        }
    }
}

function decreaseLetterSpeed(score) {
    if (parseInt(score.innerHTML) % 20 === 0) {
        clearInterval(placeLetterTimer);
        placeLetterInterval = placeLetterInterval * 1.1
        placeLetterTimer = setInterval(placeLetter, placeLetterInterval)
    }
}

function endGame() {
    clearInterval(moveLettersTimer);
    clearInterval(placeLetterTimer);
    document.removeEventListener('keydown', keyboardInput);
    message.classList.remove("hidden");
    resetButton.classList.remove("disabled")
}


function resetGame() {
    message.classList.add("hidden");
    resetButton.classList.add("disabled")
    score.innerHTML = 0;

    var boxes = document.querySelectorAll("#box > div");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].remove();
    }

    startGame();
}

function keyboardInput() {
    if (event.keyCode === 27) {
        return endGame();
    };

    var key = String.fromCharCode(event.keyCode).toLowerCase();
    var boxes = document.getElementsByClassName(key);

    if (boxes[0]) {
        boxes[0].remove();
        score.innerHTML = parseInt(score.innerHTML) + 1;
        decreaseLetterSpeed(score);
    } else {
        score.innerHTML = parseInt(score.innerHTML) - 1;
    }

}


function startGame() {
    placeLetterTimer = setInterval(placeLetter, placeLetterInterval);
    moveLettersTimer = setInterval(moveLetters, 200);
    document.addEventListener('keydown', keyboardInput);
    startButton.classList.add("disabled");
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Running!");

    message = document.getElementById('message');
    box = document.getElementById('box');
    score = document.getElementById("score");

    startButton = document.getElementById('start')
    startButton.onclick = startGame;

    resetButton = document.getElementById('reset')
    resetButton.onclick = resetGame;
});