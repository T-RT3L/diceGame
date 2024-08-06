let gameValues = {
  score: [0, 0], // [playerScore, computerScore]
  current: [0, 0], // [playerCurrent, computerCurrent]
};
const gameLocationValues = {
  dice: document.querySelector("#diceImg"),
  score: [document.querySelector("#player1Score"), document.querySelector("#player2Score")],
  current: [document.querySelector("#playerCurrent"), document.querySelector("#computerCurrent")],
  action: [document.querySelector(".rolldice"), document.querySelector(".hold")],
  winner: document.querySelector(".winnerPop_up"),
  text: [document.querySelector(".turnPlayer"), document.querySelector(".turnPlayer2")],
  background: [document.querySelector('.side_player'), document.querySelector('.side_computer')]
};
let aturn = 0; //player turn: 0, computer turn: 1

let timer = 30;
function resetGame() {
  
  gameValues = {
    score: [0, 0], // [playerScore, computerScore]
    current: [0, 0], // [playerCurrent, computerCurrent]
  };
  timer = 30;
  aturn = Math.round(Math.random());
  gameLocationValues["score"][0].textContent = gameValues["score"][0];
  gameLocationValues["score"][1].textContent = gameValues["score"][1];
  gameLocationValues["current"][0].lastElementChild.textContent = gameValues["current"][0];
  gameLocationValues["current"][1].lastElementChild.textContent = gameValues["current"][1];
  gameLocationValues["winner"].style.display = "none";
  
}
function turn(side) {
  gameLocationValues["text"][side].style = "font-size: 50px";
  gameLocationValues['background'][side].style = 'rgba(0, 119, 255, 0.207)'
  let dice = Math.round(Math.random() * 5 + 1);
  gameLocationValues["dice"].src = "assets/dice-" + String(dice) + ".png";
  if (dice != 1) {
    gameValues["current"][side] += dice;
    gameLocationValues["current"][side].lastElementChild.textContent = gameValues["current"][side];
  } else {
    gameValues["current"][side] = 0;
    gameLocationValues["current"][side].lastElementChild.textContent = gameValues["current"][side];
    side ^= 1;
  }

  gameLocationValues["text"][side].style = "font-size: 60px; font-weight:bold; text-decoration:underline";
  gameLocationValues['background'][side].style = 'rgba(0, 119, 255, 1)'
  return side;
}
function hold(side) {
  gameLocationValues["text"][side].style = "font-size: 50px";
  gameValues["score"][side] += gameValues["current"][side];
  gameLocationValues["score"][side].textContent = gameValues["score"][side];
  gameValues["current"][side] = 0;
  gameLocationValues["current"][side].lastElementChild.textContent = gameValues["current"][side];

  side ^= 1;
  gameLocationValues["text"][side].style = "font-size: 60px; font-weight:bold; text-decoration:underline";
  return side;
}
function winResults(){
  if(gameValues['score'][0] > gameValues['score'][1]){
    gameLocationValues['winner'].textContent = 'Player has Won!'
    gameLocationValues['winner'].style.display = 'block'
    
  }
  if(gameValues['score'][1] > gameValues['score'][0]){
    gameLocationValues['winner'].textContent = 'Computer has Won!'
    gameLocationValues['winner'].style.display = 'block'
  }
  if(gameValues['score'][1] == gameValues['score'][0]){
    gameLocationValues['winner'].textContent = "No one has won";
    gameLocationValues['winner'].style.display = 'block'
  }
  
}
function incrementTimer(){
  timer -=1
  if(timer < 0){
    console.log(gameValues['score'])
    winResults();
    setTimeout(resetGame, 3000)
  }
  document.querySelector(".timer").textContent = timer + " Seconds"
}

setInterval(incrementTimer, 1000);
document.querySelector(".newGame").addEventListener("click", () => {
  resetGame();
});
gameLocationValues["action"][0].addEventListener("click", () => {
  aturn = turn(aturn);
});
gameLocationValues["action"][1].addEventListener("click", () => {
  aturn = hold(aturn);
});

