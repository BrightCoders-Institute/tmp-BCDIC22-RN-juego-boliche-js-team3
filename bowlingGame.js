function ballRolled() {
  const knockDown = Math.floor(Math.random() * 11);
  return knockDown;
}

function secondballRolled(firstBallRolled) {
  const secondKnockDown = Math.floor(Math.random() * (11 - firstBallRolled));
  return secondKnockDown;
}

let totalScore;
let gameTurns = [];

for (let i = 0; i <=9; i++) {
  let score = ballRolled();
  
  if (score === 10) {
   //llenado de vector
    gameTurns[i]= score;
    console.log("turno " + i,gameTurns[i]= score);
     
  } else if (score < 10) {
    let secondScore = secondballRolled(score);
   //llenado de vector
    gameTurns[i]= score + secondScore;
    console.log("turno " + i, gameTurns[i]= score + secondScore);
    console.log(score, "score");
    console.log(secondScore, "secondScore");
    if (score + secondScore === 10) {
      console.log("spare");
    }
  }
}
