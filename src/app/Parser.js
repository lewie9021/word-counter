import Stats from "./Stats";

class Parser {

    constructor() {
        this.details = new Stats();
        this.wordDensity = new Stats();

        this.details
            .add("words", "Words")
            .add("characters", "Characters")
            .add("characters-no-spaces", "Characters (no spaces)");
            // .add("sentences", "Sentences")
            // .add("words-average-sentence", "Average Words (sentence)")
            // .add("characters-average-sentence", "Average Characters (sentence)")
            // .add("paragraphs", "Paragraphs");
    }

    process(input) {
        var match;
        var spacesAndWords = /(\s+)|(\w+)/g;
        var counts = {
            sentences: 0,
            spaces: 0,
            words: 0
        };

        while (match = spacesAndWords.exec(input)) {
            let space = (match[1] || "");
            let word = (match[2] || "");

            counts.spaces += space.length;

            if (word.length)
                counts.words += 1;
        }

        this.clearStats();
        
        this.details
            .set("words", counts.words)
            .set("characters", input.length)
            .set("characters-no-spaces", input.length - counts.spaces);
    }

    clearStats() {
        this.details.clear();
        this.wordDensity.clear();
    }
    
    get() {
        return {
            details: this.details.get(),
            wordDensity: this.wordDensity.get()
        };
    }
    
}

export default Parser;
