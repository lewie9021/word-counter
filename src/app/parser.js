function parser(input) {
    var paragraphs = getParagraphs(input);
    var wordDensity = {};
    var counts = {
        sentences: 0,
        words: 0,
        spaces: 0
    };
    
    paragraphs.forEach(paragraph => {
        var sentences = getSentences(paragraph);

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
            counts.spaces += spaces;
        });
    });

    return {
        details: {
            words: counts.words,
            characters: input.length,
            charactersNoSpaces: (input.length - counts.spaces),
            sentences: counts.sentences,
            paragraphs: paragraphs.length
        },
        wordDensity: Object.keys(wordDensity).map((word) => {
            return {
                name: word,
                value: wordDensity[word]
            };
        })
    };
}

function getParagraphs(input) {
    // Get an array of paragraphs (strings).
    var paragraphs = (input.length ? input.split(/\n+/) : []);

    // Remove any empty paragraphs.
    return paragraphs.filter((paragraph) => {
        return paragraph.length;
    });
}

function getSentences(paragraph) {
    return (paragraph.match(/(.+?)([\?|\!|\.]\s|$)/g) || []);
}

function getWords(sentence) {
    return (sentence.match(/('?[\w-]+'?)+/g) || []);
}

function getSpaces(sentence) {
    return (sentence.split(" ").length - 1);
}

// TODO: Move this into the component that wishes to sort the word density array.
// TODO: Fix a bug with the sort order. It respects the count, but not the word itself.
function sortWordDensity(a, b) {
    if ((a && a.value) < (b && b.value))
        return 1;
    
    if ((a && a.value) > (b && b.value))
        return -1;

    return 0;
}

export default parser;
