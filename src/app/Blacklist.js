import {EventEmitter} from "events";

class Blacklist extends EventEmitter {

    constructor(blacklist) {
        super();
        
        this._blacklist = {
            ...this.load(),
            blacklist
        };
    }

    load() {
        // TODO: Retrieve the list from local storage (as an array) and convert it to a map.
        // Note: We'll need defaults for on first visit.
        return {
            "it": null,
            "the": null,
            "that": null
        };
    }
    
    add(word) {
        this._blacklist[word] = null;
        this.emit("change");
    }

    del(word) {
        delete this._blacklist[word];
        this.emit("change");
    }
    
    update(oldWord, newWord) {
        console.log(oldWord, newWord);
        
        delete this._blacklist[oldWord];
        this._blacklist[newWord] = null;

        console.log(this._blacklist);
        this.emit("change");
    }

    get() {
        return this._blacklist;
    }
    
}

export default Blacklist;
