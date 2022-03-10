class PrizeButton {

    constructor(context, button) {
        this.context = context;
        this.button = button;
        this.isEnabled = true;
        this.isPressed = false;
        this.button.setInteractive();
        this.button.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => this.up());
        this.button.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.down());
        this.button.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.out());
    }

    up() {
        if (!this.isEnabled || !this.isPressed) {
            return;
        }
        this.isPressed = false;
        this.button.setScale(1);
        this.context.scene.start('Score');
    }

    down() {
        if (!this.isEnabled) {
            return;
        }
        this.isPressed = true;
        this.button.setScale(1.1);
    }

    out() {
        if (!this.isEnabled) {
            return;
        }
        this.isPressed = false;
        this.button.setScale(1);
    }
}

export default PrizeButton;