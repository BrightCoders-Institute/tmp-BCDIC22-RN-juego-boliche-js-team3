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

for (let i = 0; i <= 9; i++) {
  let score = ballRolled();
  //   strike
  if (score === 10) {
    gameTurns.push({ type: "strike", total: 10 });
  }
  //   spare
  if (score < 10) {
    let secondScore = secondballRolled(score);
    if (score + secondScore === 10) {
      gameTurns.push({
        type: "spare",
        first: score,
        second: secondScore,
        total: score + secondScore,
      });
    } else if (score + secondScore !== 10) {
      gameTurns.push({
        type: "normal",
        first: score,
        second: secondScore,
        total: score + secondScore,
      });
    }
  }
}

gameTurns.forEach((turn, index) => {
  //  strike
  if (turn.type === "strike" && index === 0) {
    let next = gameTurns[index + 1].total;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: next + current };
  } else if (turn.type === "strike" && index === 9) {
    let previous = gameTurns[index - 1].total;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: previous + current };
    const extra = ballRolled();
    gameTurns["third"] = extra;
    gameTurns[index] = { ...turn, total: previous + current + extra };
  } else if (turn.type === "strike") {
    let previous = gameTurns[index - 1].total;
    let next = gameTurns[index + 1].total;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: previous + next + current };
  }
  // spare
  if (turn.type === "spare" && index === 0) {
    let next = gameTurns[index + 1].first;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: next + current };
  } else if (turn.type === "spare" && index === 9) {
    let previous = gameTurns[index - 1].total;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: previous + current };
    const extra = ballRolled();
    gameTurns["third"] = extra;
    gameTurns[index] = { ...turn, total: previous + current + extra };
  } else if (turn.type === "spare") {
    let previous = gameTurns[index - 1].total;
    let next = gameTurns[index + 1].first;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: previous + next + current };
  }

  // normal
  if (turn.type === "normal" && index === 0) {
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: current };
  } else if (turn.type === "normal" && index === 9) {
    let previous = gameTurns[index - 1].total;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: previous + current };
  } else if (turn.type === "normal") {
    let previous = gameTurns[index - 1].total;
    let current = gameTurns[index].total;
    gameTurns[index] = { ...turn, total: previous + current };
  }
});

console.log(gameTurns);
