import * as Constants from './constants.js';

class SlotService {

    constuctor() { }

    getSelectedsItems(numberSlots, numberItems) {
        //return [1, 1, 1, 1, 2]; test 
        let items = [];
        for (let i = 0; i < numberSlots; i++) {
            let item = Constants.ITEMS[i][this.getRandom(0, numberItems)];
            items.push(item);
        }
        return items;
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default SlotService;