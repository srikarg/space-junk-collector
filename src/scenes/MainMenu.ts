import { Scene, GameObjects } from 'phaser'

export class MainMenu extends Scene {
  #background: GameObjects.TileSprite
  #title: GameObjects.Text

  constructor() {
    super('MainMenu')
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

    this.#title = this.add
      .text(GAME_WIDTH / 2, 40, 'Space Junk Collector', {
        align: 'center',
        fontSize: '30px',
      })
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('Game')
    })
  }

  update() {
    this.#background.tilePositionY -= 0.4
  }
}
