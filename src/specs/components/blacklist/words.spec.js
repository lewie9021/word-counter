import { EventEmitter } from "events";
import { PropTypes } from "react";
import $ from "react-shallow-query";
import { renderComponent } from "../../helpers";

function getMockBlacklist(store = {}) {
    var blacklist = new EventEmitter();

    blacklist._blacklist = store;
    blacklist.get = () => {
        return store;
    };
    
    return blacklist;
}

describe("components/Blacklist/Words", () => {
    var Module, sandbox;
    
    beforeEach(() => {
        Module = require("../../../components/Blacklist/Words");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("instantation", () => {

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

            it("should only have child elements are of type 'Word'", () => {
                var blacklist = getMockBlacklist({
                    hello: null,
                    world: null
                });
                var $listGroup = renderComponent(Module, {blacklist}).output;
                var $listItems = $($listGroup, "> Word");
                
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

        xdescribe("_renderWords", () => {

            it("should call blacklist.get", () => {
                
            });

            it("should sort the blacklisted words in ascending order", () => {
                
            });

            it("should return an array of Word React elements", () => {
                
            });

            it("should pass a value for the 'key' attribute that corresponds the loop index", () => {
                
            });

            it("should set the 'word' attribute to the value of words[i]", () => {
                
            });

            it("should calculate the 'mode' attribute based on if this.state.editing === words[i]", () => {
                
            });

            it("should pass a reference to the blacklist object for the 'blacklist' attribute", () => {
                
            });

            it("should set the 'onEdit' attribute to this._onEdit with the 'word' parameter pre-populated", () => {
                
            });

            it("should map the 'onCancel' attribute to this._onCancel", () => {
                
            });
            
        });
        
    });

});
