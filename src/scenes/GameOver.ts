import { Scene } from 'phaser'

export class GameOver extends Scene {
  #gameOverText: Phaser.GameObjects.Text
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

    this.#gameOverText = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      `Game Over!\nYour final score was ${this.#finalScore}.`,
      {
        align: 'center',
      },
    )
    this.#gameOverText.setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu')
    })
  }
}
