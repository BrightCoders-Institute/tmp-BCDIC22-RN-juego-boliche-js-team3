function ballRolled() {
  const knockDown = Math.floor(Math.random() * 11);
  return knockDown;
}

function secondballRolled(firstBallRolled) {
  const secondKnockDown = Math.floor(Math.random() * (11 - firstBallRolled));
  return secondKnockDown;
}
const score = ballRolled();

if (score === 10) {
  console.log("Strike");
} else if (score < 10) {
  const secondScore = secondballRolled(score);
  console.log(score, "score");
  console.log(secondScore, "secondScore");
  if (score + secondScore === 10) {
    console.log("spare");
  }
}

let totalScore;
let gameTurns = [];

for (let i = 0; i < 10; i++) {
  if (score === 10) {
    totalScore = 10;
  } else if (score < 10) {
    const secondScore = secondballRolled(score);
    console.log(score, "score");
    console.log(secondScore, "secondScore");
    if (score + secondScore === 10) {
      console.log("spare");
    }
  }
}
