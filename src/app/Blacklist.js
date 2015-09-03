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
    
    add(input) {
        var word = sanitizeInput(input);
        
        this._blacklist[word] = null;
        this.emit("change");
    }

    del(input) {
        var word = sanitizeInput(input);
        
        delete this._blacklist[word];        
        this.emit("change");
    }
    
    update(oldInput, newInput) {
        var oldWord = sanitizeInput(oldInput);
        var newWord = sanitizeInput(newInput);
        
        delete this._blacklist[oldWord];
        this._blacklist[sanitizeInput(newWord)] = null;
        this.emit("change");
    }

    get() {
        return this._blacklist;
    }
    
}

function sanitizeInput(input) {
    return input.toLowerCase();
}

export default Blacklist;
