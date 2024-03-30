export class Energy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      0,
      Phaser.Math.RND.pick(['blue-energy', 'pink-energy']),
    )

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(2)
    this.setVelocityY(Phaser.Math.Between(200, 600))
  }

  update(scene: Phaser.Scene) {
    if (this.y > scene.game.config.height) {
      this.destroy()
    }
  }

  collect() {
    this.destroy()
  }
}
