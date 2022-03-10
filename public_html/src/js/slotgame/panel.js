import * as Constants from './constants.js';

const READY = 0;
const DOWN = 1;
const SHOW = 2;
const UP = 3;

class Panel {

    constructor(panelImage, numbersImage) {
        this.panelImage = panelImage;
        this.numbersImages = numbersImage;
        this.slotPrizes = null;
        this.slotMachine = null;
        this.state = READY;
        this.slotMachine = null;
    }

    start(slotPrizes, slotMachine) {
        this.slotPrizes = slotPrizes;
        this.slotMachine = slotMachine;
        this.state = DOWN;
    }

    update(delta) {
        let currentDistance = Constants.PANEL_HEIGHT/2 - this.panelImage.y;
        switch (this.state) {
            case DOWN:
                this.panelImage.y += ((currentDistance * 8 * delta) + 0.1);
                this.numbersImages[this.getNumberIndex()].y = this.panelImage.y
                if (this.panelImage.y >= Constants.PANEL_HEIGHT / 2) {
                    this.panelImage.y = Constants.PANEL_HEIGHT / 2;
                    this.state = SHOW;
                }
                break;
            case SHOW:
                setTimeout(() => {
                    this.state = UP;
                }, Constants.PANEL_SHOW_DURATION);
                break;
            case UP:
                currentDistance = (Constants.PANEL_HEIGHT-currentDistance);
                this.panelImage.y -= ((currentDistance * 8 * delta) + 0.1);
                this.numbersImages[this.getNumberIndex()].y = this.panelImage.y
                if (this.panelImage.y <= -Constants.PANEL_HEIGHT / 2) {
                    this.panelImage.y = -Constants.PANEL_HEIGHT / 2;
                    this.state = READY;
                    this.slotMachine.finish();
                }
                break;
        }
    }

    getNumberIndex(){
        return (this.slotPrizes.endSlotIndex - this.slotPrizes.startSlotIndex) - (Constants.NUMBER_ITEMS_PRIZE-1);
    }

}

export default Panel;