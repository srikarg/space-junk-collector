import { Scene } from 'phaser'

export class Game extends Scene {
  #food: Phaser.Physics.Arcade.Group
  #enemies: Phaser.Physics.Arcade.Group
  #player: Phaser.GameObjects.Arc
  #score: number
  #scoreText: Phaser.GameObjects.Text

  constructor() {
    super('Game')
  }

  init() {
    this.#score = 0
  }

  create() {
    const WORLD_WIDTH = this.sys.game.canvas.width
    const WORLD_HEIGHT = this.sys.game.canvas.height

    this.input.setDefaultCursor('none')
    this.physics.world.setBoundsCollision()

    this.#player = this.add.circle(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT / 2,
      5,
      Phaser.Display.Color.HexStringToColor('#FF00FF').color,
    )
    this.physics.add.existing(this.#player, false)
    this.#player.body.setAllowGravity(false)
    this.#player.body.setCollideWorldBounds(true)

    this.#enemies = this.physics.add.group()
    this.#food = this.physics.add.group()

    for (let i = 0; i < 20; i++) {
      const enemy = this.add.circle(
        Phaser.Math.Between(0, WORLD_WIDTH),
        0,
        5,
        Phaser.Display.Color.HexStringToColor('#da2442').color,
        1,
      )
      this.#enemies.add(enemy)
      enemy.body.setCollideWorldBounds(true, 1, 1, true)

      const food = this.add.circle(
        Phaser.Math.Between(0, WORLD_WIDTH),
        0,
        Phaser.Math.Between(10, 15),
        Phaser.Display.Color.HexStringToColor('#047857').color,
        1,
      )
      this.#food.add(food)
      food.body.setCollideWorldBounds(true, 1, 1, true)
    }

    this.#scoreText = this.add.text(
      WORLD_WIDTH - 120,
      10,
      `Score: ${this.#score}`,
      {
        color: '#000000',
        fontSize: '20px',
      },
    )

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.#player.x = pointer.x
      this.#player.y = pointer.y
    })

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
          body.gameObject.setPosition(Phaser.Math.Between(0, WORLD_WIDTH), 0)
          body.gameObject.setVisible(true)
          body.gameObject.body.setVelocity(0, this.physics.world.gravity.y)
        }
      },
    )
  }
}
