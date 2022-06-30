const myQuestions = [                                                                                                             //array of objects
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

const quiz = document.getElementById('quiz');                                                                                     //grabs element by name of quiz
const highScore = document.getElementById('highScore');                                                                           //grabs element by name of highScore
const questionEl = document.getElementById('question');                                                                           //grabs element by name of question
const a_text = document.getElementById('a_text');                                                                                 //grabs element by name of a_text
const b_text = document.getElementById('b_text');                                                                                 //grabs element by name of b_text
const c_text = document.getElementById('c_text');                                                                                 //grabs element by name of c_text
const d_text = document.getElementById('d_text');                                                                                 //grabs element by name of d_text


var timeEl = document.querySelector(".time");                                                                                     //grabs time class
var timerbutEL= document.querySelector("#startquiz");                                                                             //grabs id by nmae of startquiz
var quizbox = document.querySelector(".quiz-container");                                                                          //grabs quiz-container class

var secondsLeft = 120;                                                                                                            //sets variables for timer to 120 seconds                                                 
let isPaused = false;                                                                                                             //setting pause variable to off
let currentQuiz = 0;                                                                                                              //setting the index for the question array
let score = 0;                                                                                                                    //setting the user score to 0

let existingSaves =                                                                                                               //stores the user score for high score page
    localStorage.getItem('HighScores')?.length > 0 ?
    JSON.parse(localStorage.getItem('HighScores')) :                                                                              //parses out the combined array of strings
    [];

timerbutEL.addEventListener("click",function(event){                                                                              //generates the function on click of start button
    event.preventDefault();                                                                                                       //prevents the spoiling of any other events
    setTime();                                                                                                                    //starts the timer function
    timerbutEL.style.display= 'none';                                                                                             //hides the start button
    quizbox.style.display= 'block';                                                                                               //displays the quiz container block


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
                sendMessage("Times run out");                                                                                     //tells you have timed out in popout
                window.location.reload();                                                                                         //reloads back to home page
            }
        }
    }, 1000);                                                                                                                     //decreases time by 1000 milliseconds(1 second)
}

function sendMessage(){
    alert("Bummer! Your out of time");                                                                                            //sends out of time message
}  

startQuiz()                                                                                                                       //begins the quiz

function startQuiz() {
    this.clearAnswersSetQuestion(myQuestions[currentQuiz]);                                                                       //calls the function that clears any answers selected, and sets questions
}

function setQuestion(currentQuizData) {
    if (currentQuizData.question) {
        questionEl.innerText = currentQuizData.question;                                                                          //sets the question depending on array position
        a_text.innerText = currentQuizData.a;                                                                                     //sets answer choice based on object, and position in objects array
        b_text.innerText = currentQuizData.b;                                                                                     //sets answer choice based on object, and position in objects array
        c_text.innerText = currentQuizData.c;                                                                                     //sets answer choice based on object, and position in objects array   
        d_text.innerText = currentQuizData.d;                                                                                     //sets answer choice based on object, and position in objects array
    }
    quiz.classList.remove('paused');                                                                                              //takes off any class from paused status
    isPaused = false;                                                                                                             //ensures that the freeze from wrong/correct answer is off
}

function clearAnswersSetQuestion(currentQuizData) {
    this.setQuestion(currentQuizData);
}

function answerSelected(selectedAnswer) {
    if (!isPaused) {                                                                                                              //as long as the game isn't paused
        quiz.classList.add('paused');                                                                                             //pause game to show color for correct selection
        const correctAnswer = myQuestions[currentQuiz].correct === selectedAnswer;                                                //comparing selected choice to correct answer
        if(correctAnswer) {
            score += 1;                                                                                                           //as long as correct, add points to your score
        } else {
            secondsLeft= secondsLeft - 10;                                                                                        //if not correct, take 10 seconds away from time left
        }
        currentQuiz += 1;                                                                                                         //move on to next question regardless of correct or incorrect
        this.displayAnswer(correctAnswer, selectedAnswer);
    }
}
function displayAnswer(correctAnswer, selectedAnswer) {
                                                                                                                                   // Set color of button to red or green for a certain amount of time
    const classValid = correctAnswer ? 'button-valid' : 'button-invalid';                                                         //if selection is correct highlight green, if wrong highlight red
    const elId = `btn${selectedAnswer.toString().toUpperCase()}`                                                                  //elId set to the button selections
    const selElement = document.getElementById(elId);                                                                             //SelElement set to the elID
    selElement.classList.add(classValid);                                                                                         //adding the classvalid to selElement

    isPaused = true;                                                                                                              //pause the quiz
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
    timerbutEL.style.display = 'none';                                                                                            //hides the start button
    quiz.classList.add('isHidden');                                                                                               //adds ishidden to quiz classList
    score = (score / (myQuestions.length))*100;                                                                                   //turns your score into a percentage
    document.getElementById('scoreVal').innerText = score;                                                                        //sets the text of scoreVal in html to your score
    highScore.classList.remove('isHidden');                                                                                       //removes any effects from the isHidden class
    if (score > 0) {
        document.getElementById('highScoreComponent').classList.remove('isHidden');                                               //display the high score page
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

           
        
