
// The following is the array of questions

const questions = [
    {
        question: "What goes inside the HTML tag for Javascript?",       
            options: [
             "script",
             "scripted",
             "javascript",
             "js",
            ],     
            correctAnswer: 1
    },
    {
        question: "Which function of an Array object calls a function for each element in the array",        
        options: [
            "every()",
            "forEach()",
            "forEvery()",
            "each()",
           ],   
            correctAnswer: 2
    },

    {
        question: "How is a function called in JavaScript",      
        options: [
            "call Javascript()",
            "call(Javascript)",
            "JavaScript()",
            "function JavaScript()",
           ],       
            correctAnswer: 3
    },

    {
        question: "How do you write a multi-line comment in JavaScript",        
        options: [
            "<! This is a Comment !>",
            "// This is how",
            "/*This is multi line comment",
            "** This is a multi line comment",
           ],       
            correctAnswer: 4
    },

    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",        
        options: [
            "last()",
            "put()",
            "push()",
            "none of the above()gt",
           ],    
            correctAnswer: 3
    
    },
];


//The following is the variables for the quizCode 


const startQuizButton = document.getElementById('startQuiz');
const tryAgainButton = document.getElementById('tryAgainButton')
const quizContainer = document.getElementById('quiz');
let currentQuestionIndex = 0;
let currentQuestion = questions[currentQuestionIndex];
let timer = document.getElementById('timer');
let timeLeft = 60;
let quizTime = 0;
let score = 0;
let userInitials = '';
const answerResponse = document.getElementById("answerResult")


// The method below is counts down the time left

function countDown() {

    if(quizTime === 0) {
        quizTime = setInterval( () => {
            timeLeft--;
            timer.innerHTML = "Time: " + timeLeft;

            if(timeLeft <= 0){
                clearQuizContainer();
                clearInterval(quizTime);
                timer.innerHTML = "Time's up!"
                quizFailed() 
            }
        }, 1000)
    }
}

// This clears the quiz container 

function clearQuizContainer(){
    quizContainer.innerHTML = '';
}

// creates a header that stores the question 

function setQuestion(){
    const header = document.createElement("h2"); 
    header.setAttribute("id", "question")
    header.innerHTML = currentQuestion.question;
    quizContainer.appendChild(header);
    
    
}

// when the button is clicked the start button displays none, the countdown begins, and the question is updated
function startQuiz(){
    startQuizButton.style.display = "none";
    //start timer
    countDown();
    updateQuestion();
     
}  


// If the quiz fails this function restarts the timeLeft, sets the quizTime, resets the display timer, and resets the currectQuestionIndex

function tryAgain(){
    timeLeft = 60;
    quizTime = 0;
    timer.innerHTML = timeLeft;
    currentQuestionIndex = 0;
     tryAgainButton.style.display = "none";
    //start timer
    countDown();
    updateQuestion();    
}  

// The following method, clears the quiz container and makes a statement that if the index is less than length the currentQuestion = questions, currentQuestionIndex increases by one, it then displays the next question and the next set of options. Otherwise, the scoreFrom is loaded otherwise the timer is cleared the timer display changes to complete and timeLeft is given the value that is on the timer, the score than equals the timeLeft

function updateQuestion() {
    clearQuizContainer();
   if(currentQuestionIndex < questions.length) {
        currentQuestion = questions[currentQuestionIndex];
        currentQuestionIndex++
        setQuestion(); 
        setOptions();
        
    } else { 
        // TODO: run quiz complete method. 
        scoreForm();
        // stop timer

        if(currentQuestionIndex >= questions.length){
            clearInterval(quizTime);
            timer.innerHTML = "Quiz Complete";
            timeLeft = timeLeft;
            score = timeLeft;
        }
    }
}

function handleAnswerClicked(isCorrect) {    
    console.log("Answer is correct", isCorrect)
    if(isCorrect) {
        resultCorrect();
        updateQuestion(); 
       
    } else {
        //subtract time
        timeLeft = timeLeft - 10;
        timer.innerHTML = "Time: " + timeLeft; 
        incorrectResult();
    }
    
}

// The following method states that if the answer is correct to display a text that says "that is correct in green font"

function resultCorrect() {
    const correctResult = document.getElementById("answerResult")
    correctResult.textContent = "That is correct!";
    correctResult.style.display = "block";
    correctResult.style.color = "Green"
}

// The following method states that if the incorrect answer is clicked that the text content displays incorrect and red.

function incorrectResult() {
    const incorrectResult = document.getElementById("answerResult")
    incorrectResult.textContent = "That is incorrect! Try again!";
    incorrectResult.style.display = "block"; 
    incorrectResult.style.color = "red";
}

// the following method gives correctAnswer the currentQuestion.correctAnswer and then sets an operation that for each option, index, creates a button and sets a btn class, and on click determines if the correct answer is pressed it then creates the a text that is obtained from the options 

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

// this method states that if the time runs it, it displays failed, and shows the tryAgainButton

function quizFailed() {
       const failed = document.getElementById("failed");
       failedText = document.createElement('p')
       failedText.innerHTML = "You failed!!"
        failedText.style.color = "red";
        quizContainer.appendChild(failedText);
        tryAgainButton.style.display = "block";
};



const quizForm = document.getElementById("scoreForm")

// This method creates a form, with an input and submit button and appends all to the quizContainer

function scoreForm() {

    const form = document.createElement("FORM");
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.php");
    form.addEventListener("click", function(event){
        event.preventDefault();
    })

    let initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("name", "Initials");
    initials.setAttribute("placeholder", "Initials")
    initials.addEventListener("change", function(event){
        event.preventDefault();
        userInitials = event.target.value;
    });



    let sub = document.createElement("input");
    sub.setAttribute("type", "submit");
    sub.setAttribute("value", "Submit");
    sub.addEventListener("click", function(event){
        event.preventDefault();
        savingScore();
        clearQuizContainer();
        window.location.href="./highScore.html"
    })
   
    form.appendChild(initials);
    form.appendChild(sub)
    quizContainer.appendChild(form)
}

// This metehod saves the score to localStorage 

function savingScore() {
    const storage = window.localStorage;
    const scoreHistory = JSON.parse(storage.getItem('score')) || [];      
    const timeStamp = new Date().toUTCString() 
    const newScore = {score, userInitials, timeStamp}
    scoreHistory.push(newScore); 
    storage.setItem('score', JSON.stringify(scoreHistory));
    console.log("score, userInitials", score, userInitials);

}



/* ============ EventListeners ============= */


startQuizButton.addEventListener('click', startQuiz);
tryAgainButton.addEventListener('click', tryAgain);


