import {EventEmitter} from "events";

class Blacklist extends EventEmitter {

    constructor(blacklist) {
        super();
        
        this._blacklist = {};

        this._blacklist = this.load();
    }

    load() {
        var words = localStorage.getItem("blacklist");
        var blacklist = {};

        if (!words)
            return blacklist;
        
        words = JSON.parse(words);

        // Convert the array of words into an map.
        return words.reduce((blacklist, word) => {
            // Ensure the word is valid.
            if (this.validate(null, word))
                blacklist[word] = null;
            
            return blacklist;
        }, {});
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

    validate(oldInput, input) {
        // Used when editing inline.
        var identical = (oldInput && input == oldInput);
        // Doesn't already exist in the blacklist.
        var duplicate = (!identical && input in this.get());
        // Ensure the string only contains letters.
        var match = input.match(/[A-Z]+/i);

        // Not an empty string, doesn't already exist, and only contains letters.
        if (input.length && !duplicate && (match && match[0] == input))
            return "success";
        
        return "error";
    }
    
    get() {
        return this._blacklist;
    }
    
}

function sanitizeInput(input) {
    return input.toLowerCase();
}

export default Blacklist;
