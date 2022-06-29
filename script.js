
function highScores() {

}

var timeEl = document.querySelector(".time");
var timerbutEL= document.querySelector("#startquiz");

var secondsLeft = 120;

timerbutEL.addEventListener("click",function(event){
    event.preventDefault()
    setTime();

})
function setTime()
{
    var timeInterval = setInterval(function () 
    {
        // As long as the `timeLeft` is greater than 1
        if (secondsLeft > 0) 
        {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timeEl.textContent = secondsLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        secondsLeft--;
        } else
        {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timeEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        sendMessage("Times run out");
     
        }
    }, 1000);
}

function sendMessage(){
    alert("Bummer");
}  

// function setTime() 
// {
//     // Sets interval in variable
//     var timerInterval = setInterval(function() {
//       secondsLeft--;
//       timeEl.textContent= secondsLeft
  
//       if(secondsLeft === 0) {
//         // Stops execution of action at set interval
//         clearInterval(timerInterval);
        
//       }
  
//    }, 100);
//}

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

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitButton = document.getElementById('submit')

let currentQuiz = 0
let score = 0

startQuiz()

function startQuiz() {
    deselectAnswers()

    const currentQuizData = myQuestions[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() 
{
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function selected() 
{
    let answer
    answerEls.forEach(answerEl => 
        {
            if (answerEl.checked) 
            {
            answer = answerEl.id
            }
        })
        return answer
}

    



submitButton.addEventListener('click', () =>
{
    const answer = selected()
    if (answer) 
    {
        if (answer === myQuestions[currentQuiz].correct) 
        {
             score++
        }

        currentQuiz++
        console.log(currentQuiz)

        if (currentQuiz < myQuestions.length) 
        {
            startQuiz()
        } else 
        {
            quiz.innerHTML = `
                        <h2> You answered ${score}/${myQuestions.length}questions correctly</h2>
                               
                        <button onclick="location.reload()">Reload</button>
                        `
        }
    }
           
        
})
//create a box for quiz to appear in -done

//create a sub box for the question to appear ind -done

//create another sub box for the selections to appear in -done

//when select the correct answer move onto next question

//when enter inproper answer take time from timer and reanswer

//display correct or incorrect below the boxes

//at quiz finish, display your score

//enter in your name to go along with your score to be stored in a High Score sheet

//create a timer to be going on during the quiz, starts at 0, begins once you start quiz