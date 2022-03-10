import * as Constants from './constants.js';
import SlotService from './slot-service.js';
import Slot from './slot.js';
import ItemPrizes from './item-prizes.js';
import Panel from './panel.js';
import StoreData from './store-data.js'

const READY = 0;
const RUN = 1;
const SHOW_PRIZE = 2;
const SHOW_PANEL = 3;
const FINISH = 4;

class SlotMachine {

    constructor(slotsImages, itemImages, panelImage, itemPanelImages, playButton, prizeButton) {
        this.playButton = playButton;
        this.prizeButton = prizeButton;
        this.state = READY;
        this.selectedItems = [];
        this.slots = [];
        this.itemPrizes = new ItemPrizes(itemImages);
        this.panel = new Panel(panelImage, itemPanelImages);
        this.slotService = new SlotService();
        this.storeData = new StoreData();
        let slotNumber = 0;
        let numberItems = Constants.ITEMS[0].length;
        slotsImages.forEach(slot => {
            this.slots.push(new Slot(
                slotNumber === 0
                    ? null
                    : this.slots[slotNumber - 1],
                slot, Constants.ITEMS[slotNumber], Constants.ITEMS[0][slotNumber % numberItems]));
            slotNumber++;
        });
    }

    update(delta) {
        switch (this.state) {
            case READY:
                break;
            case RUN:
                if (this.isSlotsReady()) {
                    let dataPrize = this.getDataPrize();
                    if (dataPrize === null) {
                        this.state = FINISH;
                        return;
                    }
                    this.storeData.save(this.getFormatDate(), dataPrize);
                    this.itemPrizes.start(dataPrize, this);
                    this.state = SHOW_PRIZE;
                    return;
                }
                this.slots.forEach(slot => slot.update(delta));
                break;
            case SHOW_PRIZE:
                this.itemPrizes.update(delta);
                break;
            case SHOW_PANEL:
                this.panel.update(delta);
                break;
            case FINISH:
                this.setButtonsState(1, 1, true);
                this.state = READY;
                break;
        }
    }

    play() {
        if (this.state != READY) {
            return;
        }
        this.state = RUN;
        this.setButtonsState(1, 0.4, false);
        let itemSelected = 0;
        this.selectedItems = this.slotService.getSelectedsItems(Constants.ITEMS.length, Constants.ITEMS[0].length);
        this.slots.forEach(slot => {
            slot.play(this.selectedItems[itemSelected++]);
        });
    }

    isSlotsReady() {
        return this.slots.every(slot => slot.isReady());
    }

    getDataPrize() {
        let lastItem = 0;
        let prizeItem = 0;
        let prizeAcum = 0;
        let startSlotItem = 0;

        for (let i = 0; i < this.slots.length; i++) {
            if (i === 0) {
                prizeItem = this.slots[0].selectedItem;
            } else {
                if (this.slots[i].selectedItem === lastItem) {
                    if (prizeAcum === 1) {
                        prizeItem = this.slots[i - 1].selectedItem;
                        startSlotItem = i - 1;
                    }
                } else {
                    if (prizeAcum >= Constants.NUMBER_ITEMS_PRIZE) {
                        break;
                    }
                    prizeAcum = 0;
                }
            }
            prizeAcum++;
            lastItem = this.slots[i].selectedItem;
        }

        if (prizeAcum >= Constants.NUMBER_ITEMS_PRIZE) {
            return {
                'startSlotIndex': startSlotItem,
                'endSlotIndex': (startSlotItem + (prizeAcum - 1)),
                'item': prizeItem
            };
        }
        return null;
    }

    showPanel(slotPrizes) {
        this.panel.start(slotPrizes, this);
        this.state = SHOW_PANEL;
    }

    finish() {
        this.state = FINISH;
    }

    setButtonsState(scale, alpha, isEnabled) {
        this.playButton.button.setScale(scale);
        this.playButton.button.setAlpha(alpha);
        this.playButton.isEnabled = isEnabled;
        this.prizeButton.button.setScale(scale);
        this.prizeButton.button.setAlpha(alpha);
        this.prizeButton.isEnabled = isEnabled;
    }

    getFormatDate() {
        let date = new Date();
        return (
            date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +
            date.getHours() + ":" + date.getMinutes()+ ":" + date.getSeconds());
    }
}

export default SlotMachine;