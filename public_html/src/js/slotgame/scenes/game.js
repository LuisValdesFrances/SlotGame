import * as Constants from '../constants.js';
import SlotMachine from '../slot-machine.js';
import PlayButton from '../play-button.js';
import PrizeButton from '../prize-button.js';

class Game extends Phaser.Scene {

    constructor() {
        super('Game');
        this.slotMachine = null;
    }

    init() { }

    preload() {
        this.load.image('backgroud', 'src/assets/images/background.png');
        this.load.image('slot1', 'src/assets/images/slot1.png');
        this.load.image('slot2', 'src/assets/images/slot2.png');
        this.load.image('bar', 'src/assets/images/bar.png');
        this.load.image('play', 'src/assets/images/play.png');
        this.load.image('yellow', 'src/assets/images/yellow.png');
        this.load.image('blue', 'src/assets/images/blue.png');
        this.load.image('red', 'src/assets/images/red.png');
        this.load.image('panel', 'src/assets/images/panel.png');
        this.load.image('3x', 'src/assets/images/3x.png');
        this.load.image('4x', 'src/assets/images/4x.png');
        this.load.image('5x', 'src/assets/images/5x.png');
        this.load.image('prize', 'src/assets/images/prize.png');
        this.load.image('back', 'src/assets/images/back.png');
    }

    create(data) {
        this.add.image(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT / 2, 'backgroud');
        let totalSlotsWidth = Constants.ITEMS.length * Constants.SLOT_WIDTH + Constants.SLOT_SEPARATION * (Constants.ITEMS.length - 1);
        let startPosision = Constants.SCREEN_WIDTH / 2 - totalSlotsWidth / 2 + Constants.SLOT_WIDTH / 2;
        let increment = Constants.SLOT_SEPARATION + Constants.SLOT_WIDTH;

        let slotImages = [];
        for (let i = 0; i < Constants.ITEMS.length; i++) {
            let x = startPosision + increment * i;
            let numberItems = Constants.ITEMS[0].length;
            let slot = (i % (numberItems - 1)) + 1;
            slotImages[i] = [
                this.add.image(x, Constants.SCREEN_HEIGHT / 2, 'slot' + slot),
                this.add.image(x, Constants.SCREEN_HEIGHT / 2, 'slot' + slot),
                this.add.image(x, Constants.SCREEN_HEIGHT / 2, 'slot' + slot),
            ];
        }
        this.add.image(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT - Constants.BAR_HEIGHT / 2, 'bar');
        let topBar = this.add.image(Constants.SCREEN_WIDTH / 2, Constants.BAR_HEIGHT / 2, 'bar');
        topBar.rotation = Math.PI;

        let panelImage = this.add.image(Constants.SCREEN_WIDTH / 2, -Constants.PANEL_HEIGHT / 2, 'panel');

        let numbers = [
            this.add.image(Constants.SCREEN_WIDTH / 2, -Constants.PANEL_HEIGHT / 2, '3x'),
            this.add.image(Constants.SCREEN_WIDTH / 2, -Constants.PANEL_HEIGHT / 2, '4x'),
            this.add.image(Constants.SCREEN_WIDTH / 2, -Constants.PANEL_HEIGHT / 2, '5x'),
        ]

        let slotItemImages = [];
        for (let i = 0; i < Constants.ITEMS.length; i++) {
            let itemImages = [];
            for (let j = 0; j < Constants.ITEMS[i].length; j++) {
                itemImages[j] = this.add.image(0, 0, Constants.ITEMS_NAME[j]);
            }
            slotItemImages[i] = itemImages;
        }
        let playButton = new PlayButton(this.add.image(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT - Constants.BAR_HEIGHT * 0.35, "play"), this.slotMachine);
        let prizeButton = new PrizeButton(
            this, this.add.image(
                Constants.SCREEN_WIDTH - Constants.BUTTON_SIZE / 2 - Constants.BUTTON_MARGIN,
                Constants.BUTTON_SIZE / 2 + Constants.BUTTON_MARGIN, "prize"));
        this.slotMachine = new SlotMachine(slotImages, slotItemImages, panelImage, numbers, playButton, prizeButton);
        playButton.slotMachine = this.slotMachine;
    }

    update(time, delta) {
        this.slotMachine.update(delta * 0.001);
    }
}

export default Game;