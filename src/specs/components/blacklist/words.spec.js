import { PropTypes } from "react";
import $ from "react-shallow-query";
import { renderComponent, getMockBlacklist, arrayToObject } from "../../helpers";

describe("components/Blacklist/Words", () => {
    var Module, sandbox;
    
    beforeEach(() => {
        Module = require("../../../components/Blacklist/Words");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("instantiation", () => {

        it("should have a displayName of 'BlacklistWords'", () => {
            expect(Module.displayName).to.eq("BlacklistWords");
            
        });

        it("should require a prop 'blacklist' that must be an object", () => {
            var {propTypes} = Module;
            
            expect(propTypes).to.exist;
            expect(Object.keys(propTypes).length).to.eq(1);
            expect(propTypes.blacklist).to.eq(PropTypes.object.isRequired);
        });

        it("should set this.state.editing to null", () => {
            var {state} = new Module({blacklist: {}});
            
            expect(state).to.eql({
                editing: null
            });
        });
        
    });
    
    describe("structure", () => {

        describe("list-group", () => {
            
            it("should set the className attribute to 'words'", () => {
                var blacklist = getMockBlacklist();
                var $listGroup = renderComponent(Module, {blacklist}).output;

                expect($listGroup.props.className).to.eq("words");
            });

            it("should have a props.children length that matches the number of blacklisted words", () => {
                var blacklist = getMockBlacklist({
                    hello: null,
                    world: null
                });
                var $listGroup = renderComponent(Module, {blacklist}).output;
                
                expect($listGroup.props.children.length).to.eq(2);
            });

            it("should only have child elements are of type 'BlacklistWord'", () => {
                var blacklist = getMockBlacklist({
                    hello: null,
                    world: null
                });
                var $listGroup = renderComponent(Module, {blacklist}).output;
                var $listItems = $($listGroup, "> BlacklistWord");
                
                expect($listItems.length).to.eq(2);
            });

        });

    });

    describe("methods", () => {
        var instance;
        
        beforeEach(() => {
            var blacklist = getMockBlacklist();
            
            instance = new Module({blacklist});
        });
        
        describe("componentWillMount", () => {
            var method;
            
            beforeEach(() => {
                method = instance.componentWillMount.bind(instance);
            });
            
            it("should attach an event listener on the blacklist object for the 'change' event", () => {
                var {blacklist} = instance.props;
                var spy = sandbox.spy();
                
                sandbox.stub(blacklist, "addListener", spy);

                method();

                expect(spy.calledOnce).to.eq(true);
                expect(spy.firstCall.args).to.eql(["change", instance._onCancel]);
            });
            
        });

        describe("componentWillUnmount", () => {
            var method;
            
            beforeEach(() => {
                method = instance.componentWillUnmount.bind(instance);
            });
            
            it("should detach an event listener from the blacklist object for the 'change' event", () => {
                var {blacklist} = instance.props;
                var spy = sandbox.spy();
                
                sandbox.stub(blacklist, "removeListener", spy);

                method();

                expect(spy.calledOnce).to.eq(true);
                expect(spy.firstCall.args).to.eql(["change", instance._onCancel]);
            });
            
        });

        describe("_onEdit", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onEdit.bind(instance);
            });
            
            it("should call this.setState, setting 'editing' to the passed 'word' variable", () => {
                var spy = sandbox.spy();
                
                sandbox.stub(instance, "setState", spy);

                method("hello");

                expect(spy.calledOnce).to.eq(true);
                expect(spy.firstCall.args[0]).to.eql({
                    editing: "hello"
                });
            });

            it("should pass a callback to the second parameter of this.setState", () => {
                var spy = sandbox.spy();
                var callback = () => {};
                
                sandbox.stub(instance, "setState", spy);

                method("hello", callback);

                expect(spy.calledOnce).to.eq(true);
                expect(spy.firstCall.args[1]).to.eq(callback);
            });
            
        });

        describe("_onCancel", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onCancel.bind(instance);
            });
            
            it("should call this.setState, setting 'editing' to null", () => {
                var spy = sandbox.spy();
                
                sandbox.stub(instance, "setState", spy);

                method();

                expect(spy.calledOnce).to.eq(true);
                expect(spy.firstCall.args[0]).to.eql({
                    editing: null
                });
            });
            
        });

        describe("_renderWords", () => {
            var method, words, wordsMap, blacklist;
            
            beforeEach(() => {
                method = instance._renderWords.bind(instance);
                
                words = ["world", "hello", "test"];
                wordsMap = arrayToObject(words);
                blacklist = getMockBlacklist(wordsMap);
            });
            
            it("should call blacklist.get", () => {
                var spy = sandbox.spy(blacklist, "get");

                method(blacklist, null);
                
                expect(spy.calledOnce).to.eq(true);
            });

            it("should sort the blacklisted words in ascending order", () => {
                var sortedWords = words.sort();
                var spy = sandbox.spy();

                // Spy on the map method to inspect the sorted words array.
                sandbox.stub(Array.prototype, "map", spy);

                method(blacklist, null);

                expect(spy.calledOnce).to.eq(true);
                expect(spy.thisValues[0]).to.eql(sortedWords);
            });

            it("should return an array of 'BlacklistWord' React elements", () => {
                var wordElements = method(blacklist, null);

                expect(wordElements.length).to.eq(words.length);

                wordElements.forEach((wordElement) => {
                    expect(wordElement).to.have.property("_isReactElement", true);
                    expect(wordElement.type.displayName).to.eq("BlacklistWord");
                });
            });

            it("should pass a value for the 'key' attribute that corresponds the loop index", () => {
                var wordElements = method(blacklist, null);

                wordElements.forEach((wordElement, index) => {
                    expect(wordElement.key).to.eq(index.toString());
                });
            });

            it("should set the 'word' attribute to the value of words[i]", () => {
                var wordElements = method(blacklist, null);
                var sortedWords = words.sort();

                wordElements.forEach((wordElement, index) => {
                    expect(wordElement.props.word).to.eq(sortedWords[index]);
                });
            });

            it("should calculate the 'mode' attribute based on if the parameter 'editing' === words[i]", () => {
                var [hello, test, world] = method(blacklist, "test");

                expect(hello.props.mode).to.eq("view");
                expect(test.props.mode).to.eq("edit");
                expect(world.props.mode).to.eq("view");
            });

            it("should pass a reference to the blacklist object for the 'blacklist' attribute", () => {
                var wordElements = method(blacklist, null);

                wordElements.forEach((wordElement) => {
                    expect(wordElement.props.blacklist).to.eq(blacklist);
                });
            });

            it("should set the 'onEdit' attribute to this._onEdit with the 'word' parameter pre-populated", () => {
                var sortedWords = words.sort();
                var spy = sandbox.spy();
                var wordElements;
                
                // Spy on the map method to inspect the sorted words array.
                sandbox.stub(Function.prototype, "bind", spy);

                wordElements = method(blacklist, null);

                expect(spy.callCount).to.eq(3);

                wordElements.forEach((wordElement, index) => {
                    expect(spy.thisValues[index]).to.eq(instance._onEdit);
                    expect(spy.getCall(index).args[1]).to.eq(words[index]);
                });
            });

            it("should map the 'onCancel' attribute to this._onCancel", () => {
                var wordElements = method(blacklist, null);
                
                wordElements.forEach((wordElement) => {
                    expect(wordElement.props.onCancel).to.eq(instance._onCancel);
                });
            });
            
        });
        
    });

});
