const myQuestions = [
    {
        question: "What is the original color of German Shepherds",
        a: 'silver',
        b: 'liver',
        c: 'blue',
        d: `black and tan`,
        correct: 'd'
    },

    {
        question: "What were Shepherds bred for?",
        a: 'war',
        b: 'herding',
        c: 'hunting',
        d: 'retrieving',
        correct: 'b'
    },

    {
        question: "What rank for most intelligent dog did Shepherds receive",
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        correct: 'c'
    },

    {
        question: "What is a life span of a German Shpherd?",
        a: '9-13',
        b: '7-10',
        c: '5-7',
        d: '13-6',
        correct: 'a'
    },

    {
        question: "What is the range litter size of a German Shepherd?",
        a: '2-3',
        b: '1-2',
        c: '4-9',
        d: '10+',
        correct: 'c'
    }
];

const quiz = document.getElementById('quiz');
const highScore = document.getElementById('highScore');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitButton = document.getElementById('submit');

var timeEl = document.querySelector(".time");
var timerbutEL= document.querySelector("#startquiz");
var quizbox = document.querySelector(".quiz-container");

var secondsLeft = 240;
let isPaused = false;
let currentQuiz = 0;
let score = 0;

let existingSaves =
    localStorage.getItem('HighScores')?.length > 0 ?
    JSON.parse(localStorage.getItem('HighScores')) : 
    [];

timerbutEL.addEventListener("click",function(event){
    event.preventDefault();
    setTime();
    timerbutEL.style.display= 'none';
    quizbox.style.display= 'block';


})
function setTime()
{
    var timeInterval = setInterval(function () 
    {
        if (!isPaused) {
            // As long as the `timeLeft` is greater than 1
            if (secondsLeft > 0) {
                // Set the `textContent` of `timerEl` to show the remaining seconds
                timeEl.textContent = secondsLeft + ' seconds remaining';
                // Decrement `timeLeft` by 1
                secondsLeft--;
            } else {
                // Once `timeLeft` gets to 0, set `timerEl` to an empty string
                timeEl.textContent = '';
                // Use `clearInterval()` to stop the timer
                clearInterval(timeInterval);
                sendMessage("Times run out");    
            }
        }
    }, 1000);
}

function sendMessage(){
    alert("Bummer! Your out of time");
}  

startQuiz()

function startQuiz() {
    this.clearAnswersSetQuestion(myQuestions[currentQuiz]);
}

function setQuestion(currentQuizData) {
    if (currentQuizData.question) {
        questionEl.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
    }
    quiz.classList.remove('paused');
    isPaused = false;
}

function clearAnswersSetQuestion(currentQuizData) {
    this.setQuestion(currentQuizData);
}

function answerSelected(selectedAnswer) {
    if (!isPaused) {
        quiz.classList.add('paused');
        const correctAnswer = myQuestions[currentQuiz].correct === selectedAnswer;
        if(correctAnswer) {
            score += 1;
        } else {
            secondsLeft= secondsLeft - 10;
        }
        currentQuiz += 1;
        this.displayAnswer(correctAnswer, selectedAnswer);
    }
}
function displayAnswer(correctAnswer, selectedAnswer) {
    // Set color of button to red or green for a certain amount of time
    const classValid = correctAnswer ? 'button-valid' : 'button-invalid';
    const elId = `btn${selectedAnswer.toString().toUpperCase()}`
    const selElement = document.getElementById(elId);
    selElement.classList.add(classValid);

    isPaused = true;
    setTimeout(() => {        
        const continueQuiz = currentQuiz <= myQuestions.length-1;
        if(!continueQuiz) {
            // this.loadHighScoreEntries(true);
            this.toggleHighScoreHome(true);
        } else {
            selElement.classList.remove(classValid);
            setTimeout(() => {
                this.clearAnswersSetQuestion(myQuestions[currentQuiz]);
            }, 500);            
        }
    }, 1500);
}
function scoreScreen() {
    timerbutEL.style.display = 'none';
    quiz.classList.add('isHidden');
    score = (score / (myQuestions.length))*100;
    document.getElementById('scoreVal').innerText = score;
    highScore.classList.remove('isHidden');
    if (score > 0) {
        document.getElementById('highScoreComponent').classList.remove('isHidden');
    }
}
   
function submitHighScore() {
    document.getElementById('highScoreComponent').classList.add('isHidden');
    const newSave = { 
        name: document.getElementById('scoreName').value,
        finScore: score        
    };
    existingSaves.push(newSave);

    this.sortSaves();  

    localStorage.setItem('HighScores', JSON.stringify(existingSaves));
    alert('high score submited!');
    this.loadHighScoreEntries(false);
}

function sortSaves() {
    if(existingSaves.length > 1) {
        existingSaves.sort((a,b) => b.finScore - a.finScore);
    }
}

function toggleHighScoreHome(showScreen) {
    const highScoreButton = document.getElementById('highscores');
    const isHome = highScoreButton.innerText === 'View Highscores' ? true : false;
    if (isHome) {
        this.sortSaves();
        highScoreButton.innerText = 'Go Home';
        this.loadHighScoreEntries(showScreen);
    } else {
        highScoreButton.innerText = 'View Highscores';
        window.location.reload();
    }
}

function loadHighScoreEntries(showScreen) {
    let highScoreSheet = document.getElementById('highScoreSheet');
    highScoreSheet.innerHTML = '';
    let scoreSheetHml = '';
    if (existingSaves.length > 0) {
        existingSaves.forEach((saveEntry) => {
            scoreSheetHml += '<li><span>' + saveEntry.name + '</span><span>' +  '&nbsp;'+ '&nbsp;'+ '&nbsp;'+ '&nbsp;'+ '&nbsp;'+ '&nbsp;' + saveEntry.finScore + '</span></li>';
        });
        if (scoreSheetHml.length > 0) {
            highScoreSheet.innerHTML = scoreSheetHml;
        }
    } else {
        // 
        // hide UL item?
        // 
    }
    if (showScreen) {
        this.scoreScreen();
    }
}

           
        
