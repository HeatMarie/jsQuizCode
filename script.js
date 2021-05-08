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
let userInitials = '';
const answerResponse = document.getElementById("answerResult")



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


function resultCorrect() {
        const correctResult = document.getElementById("answerResult")
        correctResult.textContent = "That is correct!";
        correctResult.style.display = "block";
        correctResult.style.color = "Green"
}

function incorrectResult() {
        const incorrectResult = document.getElementById("answerResult")
        incorrectResult.textContent = "That is incorrect! Try again!";
        incorrectResult.style.display = "block"; 
        incorrectResult.style.color = "red";
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





function quizFailed() {
       const failed = document.getElementById("failed");
       failedText = document.createElement('p')
       failedText.innerHTML = "You failed! Start Quiz to try again!"
        failedText.style.color = "red";
        quizContainer.appendChild(failedText);
        startQuizButton.style.display = "block";
};



const quizForm = document.getElementById("scoreForm")

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
        window.location.href="highScore.html"
    })
   
    form.appendChild(initials);
    form.appendChild(sub)
    quizContainer.appendChild(form)
}

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



