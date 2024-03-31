import { Scene } from 'phaser'
import { Enemy } from '../entities/Enemy'
import { Player } from '../entities/Player'
import { Energy } from '../entities/Energy'
import { GameControls } from '../entities/GameControls'

export class Game extends Scene {
  #background: Phaser.GameObjects.TileSprite
  #energies: Phaser.Physics.Arcade.Group
  score: number
  #scoreText: Phaser.GameObjects.Text

  enemies: Phaser.Physics.Arcade.Group
  player: Player

  constructor() {
    super('Game')
  }

  init() {
    this.score = 0
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

    this.input.setDefaultCursor('none')

    this.enemies = this.add.group()
    this.player = new Player(this)

    this.#energies = this.add.group()

    for (let i = 0; i < 8; i++) {
      this.enemies.add(new Enemy(this))
    }

    this.input.on('pointerdown', this.playerFireBullet, this)

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.enemyFireBullet,
      callbackScope: this,
    })

    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: this.spawnEnergy,
      callbackScope: this,
    })

    this.#scoreText = this.add
      .text(GAME_WIDTH / 2, 40, '', {
        fontSize: '20px',
        align: 'center',
      })
      .setOrigin(0.5)

    this.updateScore()

    this.physics.add.overlap(
      this.player,
      this.enemies,
      (player: Player, enemy: Enemy) => {
        if (enemy.visible) {
          this.spawnExplosion(player.x, player.y)

          player.energy -= 2

          enemy.die()

          this.updateScore()
        }
      },
    )

    this.physics.add.overlap(
      this.player,
      this.#energies,
      (player: Player, energy: Energy) => {
        if (energy.visible) {
          player.energy += 1

          energy.collect()

          this.updateScore()
        }
      },
    )
  }

  update() {
    this.#background.tilePositionY -= 0.4

    this.player.update(this)
    this.enemies.getChildren().forEach(enemy => enemy.update(this))
    this.#energies.getChildren().forEach(energy => energy.update(this))

    if (this.player.energy <= 0) {
      this.scene.start('GameOver', { score: this.score })
    }
  }

  spawnEnergy() {
    this.#energies.add(new Energy(this))
  }

  playerFireBullet() {
    this.player.fire()
  }

  enemyFireBullet() {
    this.enemies.getChildren().forEach(enemy => {
      if (enemy.active && enemy.visible) {
        enemy.fire()
      }
    })
  }

  updateScore() {
    this.#scoreText.setText(
      `Score: ${this.score}\nEnergy: ${this.player.energy}`,
    )
  }

  spawnExplosion(x: number, y: number, scale = 5) {
    const explosion = this.physics.add
      .sprite(x, y, 'explosion', 0)
      .setScale(scale)

    explosion.play('explosion').on('animationcomplete', () => {
      explosion.destroy()
    })
  }
}
