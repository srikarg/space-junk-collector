import { Scene } from 'phaser'
import { Enemy } from '../entities/Enemy'
import { Player } from '../entities/Player'

export class Game extends Scene {
  #background: Phaser.GameObjects.TileSprite
  #food: Phaser.Physics.Arcade.Group
  #enemies: Phaser.Physics.Arcade.Group
  #bullets: Phaser.Physics.Arcade.Group
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

    this.#enemies = this.add.group()
    this.#bullets = this.physics.add.group({
      defaultKey: 'bullet-heavy',
      velocityY: 500,
    })
    this.#food = this.physics.add.group()

    for (let i = 0; i < 4; i++) {
      const enemy = new Enemy(this)
      this.#enemies.add(enemy)
    }

    this.time.addEvent({
      delay: 1000, // Adjust the delay as needed
      loop: true,
      callback: this.enemyFireBullet,
      callbackScope: this,
    })

    this.#scoreText = this.add
      .text(
        GAME_WIDTH / 2,
        40,
        `Score: ${this.#score}\nEnergy: ${this.#player.energy}`,
        {
          fontSize: '20px',
          align: 'center',
        },
      )
      .setOrigin(0.5)

    this.physics.add.overlap(this.#player, this.#enemies, (_player, enemy) => {
      this.#player.energy -= 2
      enemy.die()
      this.#scoreText.setText(
        `Score: ${this.#score}\nEnergy: ${this.#player.energy}`,
      )
    })

    this.physics.add.overlap(this.#player, this.#bullets, (_player, bullet) => {
      this.#player.energy -= 1
      bullet.destroy()
      this.#scoreText.setText(
        `Score: ${this.#score}\nEnergy: ${this.#player.energy}`,
      )
    })
  }

  update() {
    this.#background.tilePositionY -= 0.4
    this.#player.update(this)
    this.#enemies.getChildren().forEach(enemy => enemy.update(this))
    if (this.#player.energy <= 0) {
      this.scene.start('GameOver', { score: this.#score })
    }
  }

  // Function to handle enemy bullet firing
  enemyFireBullet() {
    this.#enemies.getChildren().forEach(enemy => {
      if (enemy.active) {
        this.#bullets.create(enemy.x, enemy.y + 20).setScale(4)
      }
    })
  }
}
