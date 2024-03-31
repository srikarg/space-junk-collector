export class GameControls extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)

    const audioButton = scene.add
      .image(
        scene.game.config.width - 12 - 20,
        scene.game.config.height - 13 - 20,
        'audio-buttons',
        1,
      )
      .setScale(2.5)

    const toggleAudio = () => {
      scene.sound.setMute(scene.sound.mute ? false : true)
      audioButton.setFrame(scene.sound.mute ? 0 : 1)
    }

    scene.input.keyboard.on('keydown-M', toggleAudio, this)

    this.add(audioButton)
  }
}
