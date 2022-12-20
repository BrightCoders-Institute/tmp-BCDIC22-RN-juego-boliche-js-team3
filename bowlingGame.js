// eslint-disable-next-line no-unused-expressions
module.exports

// eslint-disable-next-line no-unused-vars
class Juego {
  constructor () {
    this.gameTurns = []
  }

  ballRolled () {
    const knockDown = Math.floor(Math.random() * 11)
    return knockDown
  }

  secondballRolled (firstBallRolled) {
    const secondKnockDown = Math.floor(Math.random() * (11 - firstBallRolled))
    return secondKnockDown
  }

  // Primer score
  firstScore () {
    for (let i = 0; i <= 9; i++) {
      // eslint-disable-next-line no-undef
      const score = this.ballRolled()
      //   strike
      if (score === 10) {
        this.gameTurns.push({ type: 'strike', total: 10 })
      }
      //   spare
      if (score < 10) {
        // eslint-disable-next-line no-undef
        const secondScore = this.secondballRolled(score)
        if (score + secondScore === 10) {
          this.gameTurns.push({
            type: 'spare',
            first: score,
            second: secondScore,
            total: score + secondScore
          })
        } else if (score + secondScore !== 10) {
          this.gameTurns.push({
            type: 'normal',
            first: score,
            second: secondScore,
            total: score + secondScore
          })
        }
      }
    }
  }

  // Actualización del puntaje
  scoreUpdated () {
    this.gameTurns.forEach((turn, index) => {
    //  strike
      if (turn.type === 'strike' && index === 0) {
        const next = this.gameTurns[index + 1].total
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: next + current }
      } else if (turn.type === 'strike' && index === 9) {
        const previous = this.gameTurns[index - 1].total
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: previous + current }
        // eslint-disable-next-line no-undef
        const extra = this.ballRolled()
        this.gameTurns.third = extra
        this.gameTurns[index] = { ...turn, total: previous + current + extra }
      } else if (turn.type === 'strike') {
        const previous = this.gameTurns[index - 1].total
        const next = this.gameTurns[index + 1].total
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: previous + next + current }
      }
      // spare
      if (turn.type === 'spare' && index === 0) {
        const next = this.gameTurns[index + 1].first
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: next + current }
      } else if (turn.type === 'spare' && index === 9) {
        const previous = this.gameTurns[index - 1].total
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: previous + current }
        // eslint-disable-next-line no-undef
        const extra = this.ballRolled()
        this.gameTurns.third = extra
        this.gameTurns[index] = { ...turn, total: previous + current + extra }
      } else if (turn.type === 'spare') {
        const previous = this.gameTurns[index - 1].total
        const next = this.gameTurns[index + 1].first
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: previous + next + current }
      }

      // normal
      if (turn.type === 'normal' && index === 0) {
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: current }
      } else if (turn.type === 'normal' && index === 9) {
        const previous = this.gameTurns[index - 1].total
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: previous + current }
      } else if (turn.type === 'normal') {
        const previous = this.gameTurns[index - 1].total
        const current = this.gameTurns[index].total
        this.gameTurns[index] = { ...turn, total: previous + current }
      }
    })
  }
}

// eslint-disable-next-line no-unused-vars
const juego = new Juego()

juego.firstScore()
juego.scoreUpdated()
console.log(juego)
