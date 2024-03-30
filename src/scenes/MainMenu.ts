import { Scene, GameObjects } from 'phaser'

export class MainMenu extends Scene {
  #background: GameObjects.TileSprite

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

    this.add
      .text(GAME_WIDTH / 2, 40, 'SPACE JUNK COLLECTOR', {
        align: 'center',
        fontSize: '30px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 'CLICK TO START', {
        align: 'center',
        fontSize: '24px',
      })
      .setOrigin(0.5)

    this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 + 50,
        '1. Collect blue and pink hearts to gain energy\n\n2. Crashing into enemies and bullets loses energy\n\n3. Shoot enemies to add to your score',
        {
          align: 'center',
          fontSize: '16px',
        },
      )
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('Game')
    })
  }

  update() {
    this.#background.tilePositionY -= 0.4
  }
}
