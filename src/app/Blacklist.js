import { EventEmitter } from "events";

class Blacklist extends EventEmitter {

    constructor() {
        super();

        // Load existing blacklisted words from local storage.
        this._blacklist = this.load();

        // When changes are made (add, update, del), save it to local storage.
        this.on("change", this.save);
    }

    load() {
        var words = localStorage.getItem("blacklist");
        var blacklist = {};

        if (!words)
            return blacklist;

        try {
            words = JSON.parse(words);
        } catch (e) {
            if (confirm("An error occured loading the blacklist (it could be corrupt). Would you like it to be cleared?"))
                localStorage.removeItem("blacklist");
            
            return blacklist;
        }

        if (!(words instanceof Array))
            return blacklist;
        
        // Convert the array of words into a map.
        // e.g. ["hello", "world"] -> {hello: null, world: null}
        return words.reduce((blacklist, word) => {
            // Ensure the word is valid.
            if (this.validate(null, word))
                blacklist[word] = null;
            
            return blacklist;
        }, {});
    }

    save() {
        var words = Object.keys(this._blacklist);

        // Save the blacklist as an array.
        // e.g. {hello: null, world: null} -> ["hello", "world"]
        localStorage.setItem("blacklist", JSON.stringify(words));
    }

    add(input, silent) {
        var word = sanitizeInput(input);

        // Check if the word is already in the blacklist.
        if (this._blacklist.hasOwnProperty(word))
            return;
        
        this._blacklist[word] = null;

        if (!silent)
            this.emitChange();
    }

    del(input, silent) {
        var word = sanitizeInput(input);

        // Check if the word is in the blacklist to be deleted.
        if (!this._blacklist.hasOwnProperty(word))
            return;
        
        delete this._blacklist[word];

        if (!silent)
            this.emitChange();
    }
    
    update(oldInput, newInput) {
        // Check if the word is in the blacklist to be updated.
        if (!this._blacklist.hasOwnProperty(oldInput))
            return;

        // No need to update if they are the same.
        if (oldInput === newInput)
            return;

        // We pass a second parameter to prevent the 'change' event from spamming.
        this.del(oldInput, true);
        this.add(newInput, true);
        
        this.emitChange();
    }

    validate(oldInput, input) {
        // Used when editing inline.
        var identical = (oldInput && input == oldInput);
        // Doesn't already exist in the blacklist.
        var duplicate = (!identical && input in this.get());
        // Ensure the string has a valid format.
        var match = input.match(/('?[\w-]+'?)+/);

        // Not an empty string, doesn't already exist, and only contains letters.
        if (input.length && !duplicate && (match && match[0] == input))
            return "success";
        
        return "error";
    }

    emitChange() {
        this.emit("change");
    }
    
    get() {
        // Provide public access to the 'private' blacklist map.
        return (this._blacklist || {});
    }
    
}

function sanitizeInput(input) {
    return input.toLowerCase();
}

export default Blacklist;
