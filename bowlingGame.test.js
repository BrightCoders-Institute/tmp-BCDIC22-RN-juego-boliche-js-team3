const Juego = require('./bowlingGame');
const mygame = new Juego()
mygame.firstScore()
mygame.scoreUpdated()

test('total of turns by game',()=>{
    expect(mygame.gameTurns.length).toBe(10);
})
