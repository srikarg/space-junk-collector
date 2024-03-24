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
    this.#gameOverText = this.add.text(
      512,
      384,
      `Game Over! Your final score was ${this.#finalScore}`,
      {
        color: '#ffffff',
        align: 'center',
      },
    )
    this.#gameOverText.setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu')
    })
  }
}
