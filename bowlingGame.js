function ballRolled () {
  const knockDown = Math.floor(Math.random() * 11)
  return knockDown
}

function secondballRolled (firstBallRolled) {
  const secondKnockDown = Math.floor(Math.random() * (11 - firstBallRolled))
  return secondKnockDown
}

// eslint-disable-next-line no-unused-vars
let totalScore
const gameTurns = []

for (let i = 0; i <= 9; i++) {
  const score = ballRolled()
  //   strike
  if (score === 10) {
    gameTurns.push({ type: 'strike', total: 10 })
  }
  //   spare
  if (score < 10) {
    const secondScore = secondballRolled(score)
    if (score + secondScore === 10) {
      gameTurns.push({
        type: 'spare',
        first: score,
        second: secondScore,
        total: score + secondScore
      })
    } else if (score + secondScore !== 10) {
      gameTurns.push({
        type: 'normal',
        first: score,
        second: secondScore,
        total: score + secondScore
      })
    }
  }
}

gameTurns.forEach((turn, index) => {
  //  strike
  if (turn.type === 'strike' && index === 0) {
    const next = gameTurns[index + 1].total
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: next + current }
  } else if (turn.type === 'strike' && index === 9) {
    const previous = gameTurns[index - 1].total
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: previous + current }
    const extra = ballRolled()
    gameTurns.third = extra
    gameTurns[index] = { ...turn, total: previous + current + extra }
  } else if (turn.type === 'strike') {
    const previous = gameTurns[index - 1].total
    const next = gameTurns[index + 1].total
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: previous + next + current }
  }
  // spare
  if (turn.type === 'spare' && index === 0) {
    const next = gameTurns[index + 1].first
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: next + current }
  } else if (turn.type === 'spare' && index === 9) {
    const previous = gameTurns[index - 1].total
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: previous + current }
    const extra = ballRolled()
    gameTurns.third = extra
    gameTurns[index] = { ...turn, total: previous + current + extra }
  } else if (turn.type === 'spare') {
    const previous = gameTurns[index - 1].total
    const next = gameTurns[index + 1].first
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: previous + next + current }
  }

  // normal
  if (turn.type === 'normal' && index === 0) {
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: current }
  } else if (turn.type === 'normal' && index === 9) {
    const previous = gameTurns[index - 1].total
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: previous + current }
  } else if (turn.type === 'normal') {
    const previous = gameTurns[index - 1].total
    const current = gameTurns[index].total
    gameTurns[index] = { ...turn, total: previous + current }
  }
})

console.log(gameTurns)
