import { Game } from '../scenes/Game'
import { Bullets } from './Bullets'

export class Player extends Phaser.Physics.Arcade.Sprite {
  #rocketThrustDistanceFromShip = 20
  #rocketThrust: Phaser.GameObjects.Sprite
  #bullets: Bullets

  energy = 10

  constructor(gameScene: Game) {
    super(
      gameScene,
      gameScene.input.activePointer.x,
      gameScene.input.activePointer.y,
      'ship-white',
    )

    gameScene.add.existing(this)
    gameScene.physics.add.existing(this)

    gameScene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.setPosition(pointer.x, pointer.y)
      this.#rocketThrust.setPosition(
        this.x,
        this.y + this.#rocketThrustDistanceFromShip,
      )
    })

    this.setScale(3)
    this.setCollideWorldBounds(true)

    this.#bullets = new Bullets(gameScene, 5, 'bullet-medium', -500)

    gameScene.physics.add.overlap(
      gameScene.enemies,
      this.#bullets,
      (enemy, playerBullet) => {
        if (playerBullet.active && enemy.visible) {
          gameScene.score += 1
          const explosion = gameScene.physics.add
            .sprite(enemy.x, enemy.y, 'explosion', 0)
            .setScale(5)

          explosion.play('explosion').on('animationcomplete', () => {
            explosion.destroy()
          })

          enemy.die()
          playerBullet.setActive(false)
          playerBullet.setVisible(false)
          gameScene.updateScore()
        }
      },
    )

    this.#rocketThrust = gameScene.add
      .sprite(
        this.x,
        this.y + this.#rocketThrustDistanceFromShip,
        'rocket-thrust',
      )
      .setScale(4)
      .play('rocket-thrust')
  }

  update(scene: Phaser.Scene) {
    const pointerVelocityX = scene.input.activePointer.velocity.x

    this.setFrame(pointerVelocityX < 0 ? 0 : pointerVelocityX === 0 ? 1 : 2)
  }

  fire() {
    this.#bullets.fire(this.x, this.y)
  }
}
