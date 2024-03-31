import { Scene, GameObjects } from 'phaser'
import { GameControls } from '../entities/GameControls'

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

    // Play music
    if (!this.sound.get('bg')) {
      this.sound.add('bg', { loop: true }).play()
    }

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 4, 'SPACE JUNK COLLECTOR', {
        align: 'center',
        fontSize: '34px',
        fontFamily: 'Silkscreen',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, 'CLICK TO START', {
        align: 'center',
        fontSize: '24px',
        fontFamily: 'Silkscreen',
      })
      .setOrigin(0.5)

    this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 + 100,
        '1. Collect blue and pink hearts to gain energy\n\n2. Crashing into enemies and bullets loses energy\n\n3. Shoot enemies to add to your score',
        {
          align: 'center',
          fontSize: '18px',
          fontFamily: 'Silkscreen',
          wordWrap: {
            width: this.game.config.width,
            useAdvancedWrap: true,
          },
        },
      )
      .setOrigin(0.5)

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 50, 'Press "m" to toggle music.', {
        align: 'center',
        fontSize: '16px',
        fontFamily: 'Silkscreen',
      })
      .setOrigin(0.5)

    this.add.existing(new GameControls(this))

    this.input.once('pointerdown', () => {
      this.scene.start('Game')
    })
  }

  update() {
    this.#background.tilePositionY -= 0.4
  }
}
