import { Bullets } from './Bullets'

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  #rocketThrustDistanceFromShip = 20
  #rocketThrust: Phaser.GameObjects.Sprite
  #bullets: Bullets
  #velocityY = 0

  constructor(gameScene: Phaser.Scene) {
    super(
      gameScene,
      Phaser.Math.Between(0, gameScene.game.config.width),
      0,
      Phaser.Math.RND.pick([
        'ship-green',
        'ship-orange',
        'ship-purple',
        'ship-red',
      ]),
      1,
    )

    gameScene.add.existing(this)
    gameScene.physics.add.existing(this)

    this.setScale(4)

    this.#bullets = new Bullets(gameScene, 5, 'bullet-heavy')

    this.resetVelocityY()

    gameScene.physics.add.overlap(
      gameScene.player,
      this.#bullets,
      (player, enemyBullet) => {
        if (enemyBullet.visible) {
          player.energy -= 1
          gameScene.updateScore()
          gameScene.spawnExplosion(player.x, player.y)
          enemyBullet.setActive(false)
          enemyBullet.setVisible(false)
        }
      },
    )

    this.#rocketThrust = gameScene.add
      .sprite(
        this.x,
        this.y - this.#rocketThrustDistanceFromShip,
        'rocket-thrust',
      )
      .setFlipY(true)
      .setScale(4)
      .play('rocket-thrust')
  }

  update(scene: Phaser.Scene) {
    if (this.y > scene.game.config.height) {
      this.resetVelocityY()
      this.x = Phaser.Math.Between(0, scene.game.config.width)
      this.y = 0
      this.setVisible(true)
      this.#rocketThrust.setVisible(true)
    }

    this.#rocketThrust.setPosition(
      this.x,
      this.y - this.#rocketThrustDistanceFromShip,
    )
  }

  resetVelocityY() {
    this.#velocityY = Phaser.Math.Between(200, 600)
    this.setVelocityY(this.#velocityY)
    this.#bullets.setVelocityY(this.#velocityY * 1.2)
  }

  fire() {
    return this.#bullets.fire(this.x, this.y + 20)
  }

  die() {
    this.#rocketThrust.setVisible(false)
    this.setVisible(false)
  }
}
