import { Scene } from 'phaser'
import { GameControls } from '../entities/GameControls'

export class GameOver extends Scene {
  #background: Phaser.GameObjects.TileSprite
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

    this.#background = this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      'backgrounds',
      0,
    )

    this.add.existing(new GameControls(this))

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

  update() {
    this.#background.tilePositionY -= 0.4
  }
}
