describe("app/parser", function() {
    var Module, sandbox;

    beforeEach(() => {
        Module = require("../../app/Parser");
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    describe("public functions", () => {

        describe("parser", () => {

            xdescribe("integration", () => {
                
                it("should call getParagraphs with 'input'", () => {
                    expect("completed").to.be(true);
                });

                it("should call getSentences for each paragraph returned by getParagraphs", () => {
                    expect("completed").to.be(true);
                });

                it("should call getWords and getSpaces for each sentence returned by getSentences", () => {
                    expect("completed").to.be(true);
                });
                
            });

            xdescribe("returned value", () => {

                it("should contain the keys 'details' and 'wordDensity'", () => {
                    expect("completed").to.be(true);
                });

                describe("details", () => {

                    it("should be an object", () => {
                        expect("completed").to.be(true);
                    });
                    
                    it("should contain the keys defined in constants/ParserDetails", () => {
                        expect("completed").to.be(true);
                    });

                    it("should count the number of words in 'input'", () => {
                        expect("completed").to.be(true);
                    });

                    it("should count the number of characters in 'input'", () => {
                        expect("completed").to.be(true);
                    });

                    it("should count the number of characters (no spaces) in 'input'", () => {
                        expect("completed").to.be(true);
                    });

                    it("should count the number of sentences in 'input'", () => {
                        expect("completed").to.be(true);
                    });

                    it("should count the number of paragraphs in 'input'", () => {
                        expect("completed").to.be(true);
                    });
                    
                });

                describe("wordDensity", () => {

                    it("should be an array", () => {
                        
                    });

                    it("should contain the keys 'name', 'value'", () => {
                        
                    });
                    
                    it("should count the number of occurences each word has in 'input'", () => {
                        
                    });
                    
                });

            });
            
            
        });

    });

    describe("private functions", () => {
        
        describe("getParagraphs", () => {
            var method;

            beforeEach(() => {
                method = Module.__get__("getParagraphs");
            });
            
            it("should return an empty array if 'input' is an empty string", () => {
                var input = "";
                var result = method(input);

                expect(result.length).to.eq(0);
                expect(result).to.eql([]);
            });

            it("should return a single item array if 'input' contains no newlines", () => {
                var input = "Hello world.";
                var result = method(input);

                expect(result.length).to.eq(1);
                expect(result).to.eql(["Hello world."]);
            });

            it("should return a two item array if 'input' contains a newline", () => {
                var input = "Hello.\nWorld.";
                var result = method(input);

                expect(result.length).to.eq(2);
                expect(result).to.eql(["Hello.", "World."]);
            });

            it("should filter out out empty paragraphs", () => {
                var input = "Hello.\n\nWorld.";
                var result = method(input);

                expect(result.length).to.eq(2);
                expect(result).to.eql(["Hello.", "World."]);
            });

        });

        describe("getSentences", () => {
            var method;

            beforeEach(() => {
                method = Module.__get__("getSentences");
            });
            
            it("should return an empty array if 'paragraph' is an empty string", () => {
                var paragraph = "";
                var result = method(paragraph);

                expect(result.length).to.eq(0);
                expect(result).to.eql([]);
            });

            it("should return a single item array if 'paragraph' contains a single sentence", () => {
                var paragraph = "The quick brown fox jumps over the lazy dog.";
                var result = method(paragraph);
                
                expect(result.length).to.eq(1);
                expect(result).to.eql([paragraph]);
            });

            it("should not require a trailing terminal punctuation mark to validate a sentence", () => {
                var paragraph = "The quick brown fox jumps over the lazy dog";
                var result = method(paragraph);
                
                expect(result.length).to.eq(1);
                expect(result).to.eql([paragraph]);
            });

            it("should not confuse a decimal point with a period (full stop)", () => {
                var paragraph = "Rounded to 11 decimal places, Pi is equal to 3.14159265359.";
                var result = method(paragraph);

                expect(result.length).to.eq(1);
                expect(result).to.eql([paragraph]);
            });

            it("should not confuse an ellipsis (...) as empty additional empty sentences", () => {
                var paragraph = "So...what happened?";
                var result = method(paragraph);

                expect(result.length).to.eql(1);
                expect(result).to.eql([paragraph]);
            });

            it("should acknowledge all three terminal punctuation marks ('.', '!', '?')", () => {
                var paragraph = "Hello there! My name is Lewis. What's yours?";
                var result = method(paragraph);

                expect(result.length).to.eq(3);
                expect(result).to.eql(["Hello there! ", "My name is Lewis. ", "What's yours?"]);
            });
            
        });

        describe("getWords", () => {
            var method;

            beforeEach(() => {
                method = Module.__get__("getWords");
            });
            
            it("should return an empty array if 'sentence' is an empty string", () => {
                var sentence = "";
                var result = method(sentence);

                expect(result.length).to.eq(0);
                expect(result).to.eql([]);
            });

            it("should return a single item array if 'sentence' contains a single word", () => {
                var sentence = "Hello";
                var result = method(sentence);
                
                expect(result.length).to.eq(1);
                expect(result).to.eql([sentence]);
            });

            it("should return an array of words that don't contain spaces", () => {
                var sentence = " Hello world!";
                var result = method(sentence);

                expect(result.length).to.eq(2);
                expect(result).to.eql(["Hello", "world"]);
            });

            it("should make the exeception for words that contain an apostrophe", () => {
                var contractions = ["doesn't", "wouldn't", "it's", "can't", "you've"];
                var sentence = "Some examples include: Lewis', " + contractions.join(", ");
                var result = method(sentence);

                expect(result.length).to.eq(9);
                expect(result).to.eql(["Some", "examples", "include", "Lewis'"].concat(contractions));
            });
            
        });

        describe("getSpaces", () => {
            var method;

            beforeEach(() => {
                method = Module.__get__("getSpaces");
            });
            
            it("should return an empty array if 'sentence' is an empty string", () => {
                var sentence = "";
                var result = method(sentence);

                expect(result.length).to.eq(0);
                expect(result).to.eql([]);
            });

            it("should return a single item array if 'sentence' contains a single space", () => {
                var sentence = " ";
                var result = method(sentence);
                
                expect(result.length).to.eq(1);
                expect(result).to.eql([sentence]);
            });

            it("should return an array with a length that matches the amount of spaces in 'sentence'", () => {
                var sentence = "    ";
                var result = method(sentence);
                
                expect(result.length).to.eq(4);
                expect(result).to.eql([" ", " ", " ", " "]);
            });
            
        });
        
    });
    
});
