const questions = [
    {
        question: "this is question one",       
            options: [
             "This is option A",
             "This is option B",
             "This is option C",
             "this is option D",
            ],     
            correctAnswer: 1
    },
    {
        question: "This is question two",        
        options: [
            "This is option A2",
            "This is option B2",
            "This is option C2",
            "this is option D2",
           ],   
            correctAnswer: 2
    },

    {
        question: "this is question three",      
        options: [
            "This is option A3",
            "This is option B3",
            "This is option C3",
            "this is option D3",
           ],       
            correctAnswer: 3
    },

    {
        question: "this is question four",        
        options: [
            "This is option A4",
            "This is option B4",
            "This is option C4",
            "this is option D4",
           ],       
            correctAnswer: 4
    },

    {
        question: "this is question five",        
        options: [
            "This is option A5",
            "This is option B5",
            "This is option C5",
            "this is option D5",
           ],    
            correctAnswer: 3
    
    },
];



const startQuizButton = document.getElementById('startQuiz');
const quizContainer = document.getElementById('quiz');
let currentQuestionIndex = 0;
let currentQuestion = questions[currentQuestionIndex];
let timer = document.getElementById('timer');
let timeLeft = 60;
let quizTime = 0;
let score = 0;




function countDown() {

    if(quizTime === 0) {
        quizTime = setInterval( () => {
            timeLeft--;
            timer.innerHTML = "Time: " + timeLeft;

            if(timeLeft <= 0){
                clearQuizContainer();
                clearInterval(quizTime);
                timer.innerHTML = "Time's up!"
            }
            // This is close, but no. It shows Quiz Complete before last question is Answered. 
            // if(currentQuestionIndex >= questions.length){
            //     timer.innerHTML = "Quiz Complete"
            
            // }
        }, 1000)
    }

}


function clearQuizContainer(){
    quizContainer.innerHTML = '';

}

function setQuestion(){
    const header = document.createElement("h2"); 
    header.setAttribute("id", "question")
    header.innerHTML = currentQuestion.question;
    quizContainer.appendChild(header);
}

function startQuiz(){
    startQuizButton.style.display = "none";
    //start timer
    countDown();
    updateQuestion();
     
}  

function updateQuestion() {
    clearQuizContainer();
   if(currentQuestionIndex < questions.length) {
        currentQuestion = questions[currentQuestionIndex];
        currentQuestionIndex++
        setQuestion(); 
        setOptions();
    } else { 
        // TODO: run quiz complete method. 
        // stop timer
        //Why does this work correctly but the one in the quiz time does not? 
        if(currentQuestionIndex >= questions.length){
            clearInterval(quizTime);
            timer.innerHTML = "Quiz Complete";
            timeLeft = timeLeft;
            score = timeLeft;
            
            
        }
      console.log("done?")
      console.log("timeLeft", timeLeft);
      console.log("score", score)
    }
    scoreForm();
}

function handleAnswerClicked(isCorrect) {
    console.log("Answer is correct", isCorrect)
    if(isCorrect) {
        updateQuestion(); 
    
    } else {
        //subtract time
        timeLeft = timeLeft - 10;
        timer.innerHTML = "Time: " + timeLeft;
    }
    
}

function setOptions() {
    const correctAnswer = currentQuestion.correctAnswer;
    currentQuestion.options.forEach((option, index)=>{
        const button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.addEventListener('click', () => { 
            handleAnswerClicked(correctAnswer === (index + 1))
        } );

        
        const text = document.createElement('p'); 
        text.setAttribute("class", "option");
        text.innerHTML = option;

        button.appendChild(text);
        quizContainer.appendChild(button);
    })
}

function quizComplete() {
    console.log("quiz Complete")
};

const quizForm = document.getElementById("scoreForm")

function scoreForm() {

    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.php");

    let initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("name", "Initials");
    initials.setAttribute("placeholder", "Initials")

    let sub = document.createElement("input");
    sub.setAttribute("type", "submit");
    sub.setAttribute("value", "Submit");

    form.appendChild(initials);
    form.appendChild(sub)
    quizForm.innerHTML = form;
    
}







/* ============ EventListeners ============= */


startQuizButton.addEventListener('click', startQuiz);












/* ========================= */



// let beginQuiz = document.querySelector("#startQuiz");
// let quiz = document.querySelector("#quiz");
// let seconds = 30;
// let questionsEl = document.querySelector('#quiz')
// quiz.style.display = 'none';






/* clicking start to begin quiz and timer*/
// beginQuiz.addEventListener('click', () => {
//     if(quiz.style.display === 'none'){
//         quiz.style.display = 'block';
//     }

//    let seconds = 30, $seconds = document.querySelector('.timer');
//         (function countdown() {
//         $seconds.textContent = seconds + ' second' + (seconds == 1 ? '' : 's')
//         if(seconds --> 0) setTimeout(countdown, 3000)
//         })();

// }); 

/*show first question*/

// for(let i = 0, len = questions.length; i < len; i++){
//     for(let q of questions){
//         console.log("Questions[i]", questions[i])
//         document.querySelector("#quiz").textContent = questions;
//     }
// }

/*If question is wrong, display wrong, && subtract 5 seconds from timer*/

/* else if question is correct display correct */

/* if question is correct && timer !== 0 && questions !== 0, display next question*/ 


/* if questions === 0 || timer === 0 end quiz 

    if(questions === 0 || timer === 0) {
        quiz.style.display = 'none';
        forum.style.display = 'block';
    }

*/

/* display quiz score (score === time) */

/* Have form for intials and allow user to save their score via localStorage */

// function saveQuiz() {
//     let saveScore = 

// }