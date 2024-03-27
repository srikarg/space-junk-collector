import { Scene } from 'phaser'
import { Player } from '../entities/Player'

export class Game extends Scene {
  #background: Phaser.GameObjects.TileSprite
  #food: Phaser.Physics.Arcade.Group
  #enemies: Phaser.Physics.Arcade.Group
  #player: Player
  #score: number
  #scoreText: Phaser.GameObjects.Text

  constructor() {
    super('Game')
  }

  init() {
    this.#score = 0
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

    this.input.setDefaultCursor('none')

    this.anims.create({
      key: 'rocket-thrust',
      frames: this.anims.generateFrameNames('rocket-thrust'),
      frameRate: 20,
      repeat: -1,
    })

    this.#player = new Player(this)

    this.#enemies = this.physics.add.group()
    this.#food = this.physics.add.group()

    for (let i = 0; i < 20; i++) {
      const enemy = this.add.circle(
        Phaser.Math.Between(0, GAME_WIDTH),
        0,
        5,
        Phaser.Display.Color.HexStringToColor('#da2442').color,
        1,
      )
      this.#enemies.add(enemy)
      enemy.body.setCollideWorldBounds(true, 1, 1, true)

      const food = this.add.circle(
        Phaser.Math.Between(0, GAME_WIDTH),
        0,
        Phaser.Math.Between(10, 15),
        Phaser.Display.Color.HexStringToColor('#047857').color,
        1,
      )
      this.#food.add(food)
      food.body.setCollideWorldBounds(true, 1, 1, true)
    }

    this.#scoreText = this.add.text(
      GAME_WIDTH - 120,
      10,
      `Score: ${this.#score}`,
      {
        color: '#000000',
        fontSize: '20px',
      },
    )


    this.physics.add.overlap(this.#player, this.#food, (player, food) => {
      if (food.visible) {
        this.#score += 1
        this.#scoreText.setText(`Score: ${this.#score}`)
      }
      food.setVisible(false)
    })

    this.physics.add.overlap(this.#player, this.#enemies, () => {
      this.scene.start('GameOver', { score: this.#score })
    })

    this.physics.world.on(
      'worldbounds',
      (body: Phaser.Physics.Arcade.Body, up, down, left, right) => {
        if (body.gameObject instanceof Phaser.GameObjects.Arc && down) {
          body.gameObject.setPosition(Phaser.Math.Between(0, GAME_WIDTH), 0)
          body.gameObject.setVisible(true)
          body.gameObject.body.setVelocity(0, this.physics.world.gravity.y)
        }
      },
    )
  }

  update() {
    this.#background.tilePositionY -= 0.4
    this.#player.update(this)
  }
}
