describe("app/parser", function() {
    var Module, sandbox;

    beforeEach(() => {
        Module = require("../../app/Parser");
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    xdescribe("public functions", () => {

        describe("parser", () => {
        
            it("should work as expected", () => {
                expect("completed").to.be(true);
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

        xdescribe("getSetences", () => {
        
            it("should work as expected", () => {
                expect("completed").to.be(true);
            });

        });

        xdescribe("getWords", () => {
        
            it("should work as expected", () => {
                expect("completed").to.be(true);
            });

        });
        
    });
    
});
