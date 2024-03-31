import { Scene } from 'phaser'

export class GameOver extends Scene {
  #finalScore: number

  constructor() {
    super('GameOver')
  }

  init({ score }: { score: number }) {
    this.#finalScore = score
  }

  create() {
    const GAME_WIDTH = this.game.config.width
    const GAME_HEIGHT = this.game.config.height

    this.add
      .text(GAME_WIDTH / 2, 40, 'GAME OVER!', {
        align: 'center',
        fontSize: '30px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        `YOUR FINAL SCORE WAS ${this.#finalScore}.\n\nCLICK ANYWHERE TO START A NEW GAME!`,
        {
          align: 'center',
          fontSize: '24px',
        },
      )
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu')
    })
  }
}
