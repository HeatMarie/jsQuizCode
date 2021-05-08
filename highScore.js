const highScoresContainer = document.getElementById('highScores');



function getHighScores() {
    const storage = window.localStorage;
    const scoreHistory = JSON.parse(storage.getItem('score')) || []; 
    console.log('scoreHistory', scoreHistory);

    scoreHistory.forEach( (scoreDataSet) => {
    console.log("score", scoreDataSet);   
    createScoreListItem(scoreDataSet)
    })
}

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