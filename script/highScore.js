const highScoresContainer = document.getElementById('highScores');
let highScore = []
// let highScoreIndex = 0;
console.log(highScore)

// This method creates a function that gets the stuff from storage and sorts it by the score in descending order

function getHighScores() {
    const storage = window.localStorage;
    const scoreHistory = JSON.parse(storage.getItem('score')) || []; 
    scoreHistory.sort((a, b ) =>{
        return b.score - a.score;
})
    console.log('scoreHistory', scoreHistory);

    scoreHistory.forEach( (scoreDataSet) => {
    console.log("score", scoreDataSet);   
    createScoreListItem(scoreDataSet)
    })
  
    highScore.push(scoreHistory);
    
}

// This function creates listitems and paragraphs and appends them to the child

function createScoreListItem(scoreData) {
    const listItem = document.createElement('li'); 
    const initials = document.createElement('p');
    initials.innerHTML =  scoreData.userInitials;
    // text.setAttribute("class", "option"); // TODO: add CSS styling 
    const scoreActual = document.createElement('p');
    scoreActual.innerHTML = scoreData.score;
    const timeStamp = document.createElement('p');
    timeStamp.innerHTML = scoreData.timeStamp;

    listItem.appendChild(timeStamp);
    listItem.appendChild(initials);
    listItem.appendChild(scoreActual);
    highScoresContainer.appendChild(listItem);

} 

getHighScores();




