describe("app/Blacklist", function() {
    var Module, sandbox;
    
    beforeEach(() => {
        Module = require("app/Blacklist");
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    describe("instantiation", () => {
        
        it("should extend EventEmitter", () => {
            var {EventEmitter} = require("events");
            var blacklist = new Module();
            
            expect(blacklist).to.be.an.instanceof(EventEmitter);
        });
        
        it("should call this.load", function() {
            var spy = sandbox.spy();
            var stub = sandbox.stub(Module.prototype, "load", spy);

            new Module();

            expect(spy).calledOnce;
        });

        it("should create assign a '_blacklist' property", () => {
            var blacklist;

            // Stub the load method so it doesn't try to access local storage.
            sandbox.stub(Module.prototype, "load").returns({});

            expect(Module.prototype._blacklist).to.be.undefined;
            
            blacklist = new Module();
            
            expect(blacklist._blacklist).to.exist;
            expect(blacklist._blacklist).to.be.an("object");
        });

        it("should call this.save when the the 'change' event is triggered", () => {
            var spy = sandbox.spy();
            var stub = sandbox.stub(Module.prototype, "on", spy);
            var blacklist;

            // Stub the load method so it doesn't try to access local storage.
            sandbox.stub(Module.prototype, "load").returns({});
            
            blacklist = new Module();
            
            expect(spy).calledOnce;
            expect(spy.firstCall.args).eql(["change", blacklist.save]);
        });
        
    });

    describe("methods", () => {
        var blacklist;
        
        beforeEach(() => {
            blacklist = new Module();
        });

        describe("load", () => {

            it("should look for a 'blacklist' item in local storage", () => {
                var spy = sandbox.spy();
                var words;

                // Mimic the behaviour that would occur if the 'blacklist' item wasn't in local storage.
                sandbox.stub(window.localStorage, "getItem", (...args) => {
                    spy(...args);
                    
                    return null;
                });

                words = blacklist.load();
                
                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql(["blacklist"]);
            });
            
            it("should return an empty object if a 'blacklist' item isn't in local storage", () => {
                var words;
                
                sandbox.stub(window.localStorage, "getItem")
                       .returns(null);

                words = blacklist.load();
                
                expect(words).to.be.an("object");
                expect(words).to.be.empty;
            });

            it("should call JSON.parse on the value stored in local storage", () => {
                var spy = sandbox.spy();
                var words = ["hello", "world"];

                sandbox.stub(window.localStorage, "getItem")
                       .returns(JSON.stringify(words));

                sandbox.stub(JSON, "parse", (...args) => {
                    spy(...args);

                    return words;
                });
                
                blacklist.load();

                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql([JSON.stringify(words)]);
            });

            it("should call window.confirm if the 'blacklist' item in local storage can't be parsed", () => {
                var message = "An error occured loading the blacklist (it could be corrupt). Would you like it to be cleared?";
                var spy = sandbox.spy();
                
                sandbox.stub(window.localStorage, "getItem")
                       .returns("invalid value");

                sandbox.stub(window, "confirm", spy);
                
                blacklist.load();

                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql([message]);
            });

            it("should call localStorage.removeItem if the user accepts the confirm alert", () => {
                var spy = sandbox.spy();
                
                sandbox.stub(window.localStorage, "getItem")
                       .returns("invalid value");

                sandbox.stub(window, "confirm").returns(true);

                sandbox.stub(window.localStorage, "removeItem", spy);
                
                blacklist.load();

                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql(["blacklist"]);
            });

            it("should return an empty object if the parsed 'blacklist' item isn't an array of strings", () => {
                var invalidEntry = {a: 1, b: 2, c: 3};
                var words;

                sandbox.stub(window.localStorage, "getItem")
                       .returns(JSON.stringify(invalidEntry));

                words = blacklist.load();

                expect(words).to.eql({});
            });

            it("should call this.validate for each word in local storage", () => {
                var spy = sandbox.spy();
                var words = ["hello", "world"];

                sandbox.stub(window.localStorage, "getItem")
                       .returns(JSON.stringify(words));

                sandbox.stub(blacklist, "validate", spy);

                blacklist.load();

                expect(spy.callCount).to.eq(words.length);
                words.forEach((word, index) => {
                    expect(spy.getCall(index).args).to.eql([null, word]);
                });
            });

            it("should ignore invalid words via this.validate", () => {
                var blacklistWords = ["valid", "invalid"];
                var words;

                sandbox.stub(window.localStorage, "getItem")
                       .returns(JSON.stringify(blacklistWords));

                // Stub the validate method to return true only when the word is 'valid'.
                sandbox.stub(blacklist, "validate", (oldInput, input) => {
                    return (input == "valid");
                });

                words = blacklist.load();

                expect(Object.keys(words)).to.eql(["valid"]);
            });
            
            it("should return an object converted from the array of words in local storage", () => {
                var blacklistWords = ["hello", "world"];
                var words;

                sandbox.stub(window.localStorage, "getItem")
                       .returns(JSON.stringify(blacklistWords));

                words = blacklist.load();

                expect(words).to.eql({
                    hello: null,
                    world: null
                });
            });
            
        });

        describe("save", () => {

            it("should call localStorage.setItem using the key 'blacklist'", () => {
                var spy = sandbox.spy();
                
                sandbox.stub(window.localStorage, "setItem", spy);

                blacklist.save();
                
                expect(spy).calledOnce;
                expect(spy.firstCall.args[0]).to.eq("blacklist");
            });

            it("should pass this._blacklist (converted to an array) to localStorage.setItem", () => {
                var _blacklist = {hello: null, world: null};
                var words = Object.keys(_blacklist);
                var spy = sandbox.spy();
                
                sandbox.stub(window.localStorage, "setItem", spy);

                blacklist._blacklist = _blacklist;
                blacklist.save();
                
                expect(spy.firstCall.args[1]).to.eq(JSON.stringify(words));
            });
            
        });

        describe("add", () => {

            beforeEach(() => {
                // Ensure the internal blacklist map is empty.
                blacklist._blacklist = {};
            });
            
            it("should pass the input to sanitizeInput", () => {
                var spy = sandbox.spy();

                // Rewire the private function to spy on it.
                Module.__Rewire__("sanitizeInput", spy);

                blacklist.add("hello");

                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql(["hello"]);

                // Revert the change.
                Module.__ResetDependency__("sanitizeInput");
            });

            it("should add the new word to this._blacklist", () => {
                blacklist.add("hello");
                
                expect(blacklist._blacklist).to.eql({hello: null});
            });
            
            it("should call this.emitChange to trigger a re-render", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "emitChange", spy);

                blacklist.add("hello");
                
                expect(spy).calledOnce;
            });

            it("should not call this.emitChange if the word already exists", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "emitChange", spy);

                blacklist._blacklist = {hello: null};
                blacklist.add("hello");
                
                expect(spy.callCount).to.eq(0);
            });

            it("should not call this.emitChange given a truthy 'silent' parameter", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "emitChange", spy);

                blacklist.add("hello", true);
                
                expect(spy.callCount).to.eq(0);
            });
            
        });

        describe("del", () => {

            beforeEach(() => {
                // Ensure the internal blacklist map is empty
                blacklist._blacklist = {};
            });
            
            it("should pass the input to sanitizeInput", () => {
                var spy = sandbox.spy();

                // Rewire the private function to spy on it.
                Module.__Rewire__("sanitizeInput", spy);

                blacklist.del("hello");

                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql(["hello"]);

                // Revert the change.
                Module.__ResetDependency__("sanitizeInput");
            });

            it("should remove the word from this._blacklist", () => {
                blacklist._blacklist = {hello: null};
                blacklist.del("hello");
                
                expect(blacklist._blacklist).to.eql({});
            });
            
            it("should call this.emitChange to trigger a re-render", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "emitChange", spy);

                blacklist._blacklist = {hello: null};
                blacklist.del("hello");
                
                expect(spy).calledOnce;
            });

            it("should not call this.emitChange if the word doesn't exist", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "emitChange", spy);

                blacklist.del("hello");
                
                expect(spy.callCount).to.eq(0);
            });

            it("should not call this.emitChange given a truthy 'silent' parameter", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "emitChange", spy);

                blacklist._blacklist = {hello: null};
                blacklist.del("hello", true);
                
                expect(spy.callCount).to.eq(0);
            });
            
        });

        describe("update", () => {

            beforeEach(() => {
                // Ensure the internal blacklist map has consistent value.
                blacklist._blacklist = {hello: null};
            });
            
            it("should pass the parameters ['oldInput', true] to this.del", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "del", spy);

                blacklist.update("hello", "world");

                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql(["hello", true]);
            });

            it("should pass the parameters ['newInput', true] to this.add", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "add", spy);

                blacklist.update("hello", "world");

                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql(["world", true]);
            });

            it("should short-circuit if 'oldInput' doesn't exist", () => {
                var methods = ["del", "add", "emitChange"];
                var spy = sandbox.spy();

                // Spy on the relevent blacklist methods.
                methods.forEach((method) => sandbox.stub(blacklist, method, spy));

                // Empty the internal blacklist map to ensure 'hello' doesn't exist.
                blacklist._blacklist = {};
                blacklist.update("hello", "world");
                
                expect(spy.callCount).to.eq(0);
            });
                        
            it("should short-circuit if 'oldInput' is the same as 'newInput'", () => {
                var methods = ["del", "add", "emitChange"];
                var spy = sandbox.spy();

                // Spy on the relevent blacklist methods.
                methods.forEach((method) => sandbox.stub(blacklist, method, spy));

                blacklist.update("hello", "hello");

                expect(spy.callCount).to.eq(0);
            });
            
        });

        describe("validate", () => {

            beforeEach(() => {
                // Ensure the internal blacklist map is empty
                blacklist._blacklist = {};
            });
            
            it("should call match on 'input' using /('?[\\w-]+'?)+/ to mirror the parser's 'getWords' function", () => {
                var spy = sandbox.spy();
                var input = "hello";

                // Stub the match method for strings.
                sandbox.stub(String.prototype, "match", spy);
                
                blacklist.validate(null, input);
                
                expect(spy).calledOnce;

                var {thisValue, args} = spy.firstCall;
                
                // Ensure it's not just any string.
                expect(thisValue).to.eql(input);

                // Ensure the method has been passed the correct regex pattern.
                expect(args[0].toString()).to.eql("/('?[\\w-]+'?)+/");
            });

            it("should be invalid if 'input' is empty", () => {
                var result = blacklist.validate(null, "");
                
                expect(result).to.be.eq("error");
            });

            it("should be invalid if 'input' already exists in this._blacklist", () => {
                var result;

                blacklist._blacklist = {hello: null};
                result = blacklist.validate(null, "hello");

                expect(result).to.be.eq("error");
            });

            it("should be invalid if 'input' doesn't match against /('?[\\w-]+'?)+/", () => {
                var invalid = ["", "a;", "b*", "c#", "~d", "%e", ":s"];

                invalid.forEach((input) => {
                    var match = input.match(/('?[\w-]+'?)+/);
                    var result = blacklist.validate(null, input);

                    // Ensure it's invalid.
                    expect(match && match[0]).to.not.eq(input);
                    expect(result).to.be.eq("error");
                });
            });

            it("should be valid if 'oldInput' is identical and 'input' is already in this._blacklist", () => {
                var result;

                blacklist._blacklist = {hello: null};
                result = blacklist.validate("hello", "hello");

                expect(result).to.be.eq("success");
            });

            it("should be valid if 'input' matches against /('?[\\w-]+'?)+/", () => {
                var valid = ["a", "abc", "1", "a2", "abc123", "hello-world", "don't"];

                valid.forEach((input) => {
                    var match = input.match(/('?[\w-]+'?)+/);
                    var result = blacklist.validate(null, input);

                    // Ensure it's valid.
                    expect(match && match[0]).to.eq(input);
                    expect(result).to.be.eq("success");
                });
            });

        });

        describe("emitChange", () => {

            it("should call this.emit with the value 'change'", () => {
                var spy = sandbox.spy();

                sandbox.stub(blacklist, "emit", spy);

                blacklist.emitChange();
                
                expect(spy).calledOnce;
                expect(spy.firstCall.args).to.eql(["change"]);
            });

        });

        describe("get", () => {

            it("should return this._blacklist", () => {
                var _blacklist = blacklist._blacklist;
                var result = blacklist.get();

                expect(result).to.eq(_blacklist);
            });

            it("should fallback to an empty object if this._blacklist doesn't exist", () => {
                var result, _blacklist;
                
                blacklist._blacklist = null;
                
                result = blacklist.get();
                _blacklist = blacklist._blacklist;
                
                expect(result).to.eql({});
                expect(result).to.not.eq(_blacklist);
            });

        });
        
    });

    describe("private functions", () => {
        var blacklist;
        
        beforeEach(() => {
            blacklist = new Module();
        });
        
        describe("sanitizeInput", () => {
            var sanitizeInput;
            
            beforeEach(() => {
                sanitizeInput = Module.__get__("sanitizeInput");
            });
            
            it("should call toLowerCase on 'input' and return the sanitized value", () => {
                var spy = sandbox.spy(String.prototype, "toLowerCase");
                var input = "Hello";
                
                expect(sanitizeInput(input)).to.eq("hello");
                expect(spy).calledOnce;

                // Ensure it's not just any string.
                expect(spy.firstCall.thisValue).to.eql(input);
            });
            
        });
        
    });
    
});
