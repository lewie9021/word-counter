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

            describe("integration", () => {
                
                it("should call getParagraphs with 'input'", () => {
                    var spy = sandbox.spy(Module.__get__("getParagraphs"));
                    var input = "Hello World!";

                    // Rewire the private function to spy on it.
                    Module.__Rewire__("getParagraphs", spy);
                    
                    // expect("completed").to.be(true);
                    Module(input);

                    expect(spy).calledOnce;
                    expect(spy.firstCall.args).to.eql([input]);

                    // Revert the change.
                    Module.__ResetDependency__("getParagraphs");
                });

                it("should call getSentences for each paragraph returned by getParagraphs", () => {
                    var spy = sandbox.spy(Module.__get__("getSentences"));
                    var input = "Line 1.\nLine 2.";

                    // Rewire the private function to spy on it.
                    Module.__Rewire__("getSentences", spy);

                    Module(input);

                    expect(spy).calledTwice;
                    expect(spy.firstCall.args).to.eql(["Line 1."]);
                    expect(spy.secondCall.args).to.eql(["Line 2."]);
                    
                    // Revert the change.
                    Module.__ResetDependency__("getSentences");
                });

                it("should call getWords and getSpaces for each sentence returned by getSentences", () => {
                    var input = "Hello World. Here is line 1.\nHello World. Here is line 2.";
                    
                    ["getWords", "getSpaces"].forEach((functionName) => {
                        var spy = sandbox.spy(Module.__get__(functionName));
                        
                        // Rewire the private function to spy on it.
                        Module.__Rewire__(functionName, spy);

                        Module(input);
                        
                        expect(spy.callCount).to.eq(4);
                        expect(spy.getCall(0).args).to.eql(["Hello World. "]);
                        expect(spy.getCall(1).args).to.eql(["Here is line 1."]);
                        expect(spy.getCall(2).args).to.eql(["Hello World. "]);
                        expect(spy.getCall(3).args).to.eql(["Here is line 2."]);

                        // Revert the change.
                        Module.__ResetDependency__(functionName);
                    });
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
            
            it("should return 0 if 'sentence' is an empty string", () => {
                var sentence = "";
                var result = method(sentence);

                expect(result).to.eq(0);
            });

            it("should return 1 if 'sentence' contains a single space", () => {
                var sentence = " ";
                var result = method(sentence);
                
                expect(result).to.eq(1);
            });

            it("should return a value that matches the number of spaces in 'sentence'", () => {
                var sentence = "    ";
                var result = method(sentence);
                
                expect(result).to.eq(4);
            });
            
        });
        
    });
    
});
