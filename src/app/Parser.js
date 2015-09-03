import Stats from "./Stats";

class Parser {

    constructor() {
        this.details = new Stats();
        this.wordDensity = [];

        this.details
            .add("words", "Words")
            .add("characters", "Characters")
            .add("characters-no-spaces", "Characters (no spaces)")
            .add("sentences", "Sentences")
            // .add("words-average-sentence", "Average Words (sentence)")
            // .add("characters-average-sentence", "Average Characters (sentence)")
            .add("paragraphs", "Paragraphs");
    }
    
    process(input) {
        var paragraphs = getParagraphs(input);
        var wordDensity = {};
        var counts = {
            sentences: 0,
            words: 0,
            spaces: 0
        };
        
        paragraphs.forEach(paragraph => {
            var sentences = getSetences(paragraph);

            counts.sentences += sentences.length;

            sentences.forEach(sentence => {
                var words = getWords(sentence);
                var spaces = getSpaces(sentence);

                words.forEach(word => {
                    var key = word.toLowerCase();
                    var count = (wordDensity[key] || 0);

                    wordDensity[key] = count + 1;
                });

                counts.words += words.length;
                counts.spaces += spaces.length;
            });
        });

        this.clearStats();
        
        this.details
            .set("words", counts.words)
            .set("characters", input.length)
            .set("characters-no-spaces", input.length - counts.spaces)
            .set("sentences", counts.sentences)
            .set("paragraphs", paragraphs.length);

        this.wordDensity = Object.keys(wordDensity).map(word => {
            return {
                name: word,
                value: wordDensity[word]
            };
        });
    }

    clearStats() {
        this.details.clear();
        this.wordDensity = [];
    }
    
    get() {
        return {
            details: this.details.get(),
            wordDensity: this.wordDensity.sort(sortWordDensity)
        };
    }
    
}

function getParagraphs(input) {
    // Get an array of paragraphs (strings).
    var paragraphs = (input.length ? input.split(/\n+/) : []);

    // Remove any empty paragraphs.
    return paragraphs.filter(paragraph => {
        return paragraph.length;
    });
}

function getSetences(paragraph) {
    return (paragraph.match(/(.+?)([\?|\!|\.]\s|$)/g) || []);
}

function getWords(sentence) {
    return (sentence.match(/('?\w+'?)+/g) || []);
}

function getSpaces(sentence) {
    return (sentence.match(/\s/g) || []);
}

function sortWordDensity(a, b) {
    if ((a && a.value) < (b && b.value))
        return 1;
    
    if ((a && a.value) > (b && b.value))
        return -1;

    return 0;
}

export default Parser;
