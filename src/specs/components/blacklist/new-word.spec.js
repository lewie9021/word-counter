import { PropTypes } from "react";
import $ from "react-shallow-query";
import { renderComponent, getMockBlacklist, arrayToObject } from "../../helpers";

describe("components/Blacklist/NewWord", () => {
    var Module, sandbox;
    
    beforeEach(() => {
        Module = require("../../../components/Blacklist/NewWord");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("instantiation", () => {

        it("should have a displayName of 'BlacklistNewWord'", () => {
            expect(Module.displayName).to.eq("BlacklistNewWord");
            
        });

        it("should require a prop 'blacklist' that must be an object", () => {
            var {propTypes} = Module;
            
            expect(propTypes).to.exist;
            expect(Object.keys(propTypes).length).to.eq(1);
            expect(propTypes.blacklist).to.eq(PropTypes.object.isRequired);
        });

        it("should set this.state.word to an empty string", () => {
            var {state} = new Module({blacklist: {}});
            
            expect(state.word).to.eq("");
        });

        it("should set this.state.inputStyle to null", () => {
            var {state} = new Module({blacklist: {}});
            
            expect(state.inputStyle).to.eq(null);
        });
        
    });
    
    describe("structure", () => {
        var blacklist = getMockBlacklist();
        
        describe("root", () => {
            var $root;

            beforeEach(() => {
                $root = renderComponent(Module, {blacklist}).output;
            });
            
            it("should have the classes 'word', 'clearfix', and 'create'", () => {
                var classNames = $root.props.className.split(" ");
                
                expect(classNames).to.eql(["word", "clearfix", "create"]);
            });

            it("should contain a .controls div element", () => {
                var $controls = $($root, "> .controls");

                expect($controls.length).to.eq(1);
                expect($controls[0]).to.have.property("_isReactElement", true);
            });

            it("should contain a .content div element", () => {
                var $content = $($root, "> .content");

                expect($content.length).to.eq(1);
                expect($content[0]).to.have.property("_isReactElement", true);
            });

        });

        describe("controls", () => {
            var $controls, instance;

            beforeEach(() => {
                var component = renderComponent(Module, {blacklist});

                $controls = $(component.output, "> .controls");
                instance = component.instance;
            });

            it("should contain a button element with the text 'Add Word'", () => {
                var $button = $($controls, "> Button");

                expect($button.length).to.eq(1);
                expect($button[0]).to.have.property("_isReactElement", true);
                expect($button[0].props).to.have.property("children", "Add Word");
            });
            
            it("should apply a class of 'pull-right' to the button", () => {
                var $button = $($controls, "> Button")[0];

                expect($button.props).to.have.property("className", "pull-right");
            });

            it("should assign 'success' to the bsStyle attribute of the button", () => {
                var $button = $($controls, "> Button")[0];

                expect($button.props).to.have.property("bsStyle", "success");
            });

            it("should attach an onClick handler (this._onAddClick) to the button", () => {
                var $button = $($controls, "> Button")[0];

                expect($button.props).to.have.property("onClick", instance._onAddClick);
            });

        });

        describe("content", () => {
            var $content, instance;

            before(() => {
                var component = renderComponent(Module, {blacklist});

                $content = $(component.output, "> .content");
                instance = component.instance;
            });
            
            it("should contain an element of type 'BlacklistWordInput'", () => {
                var $wordInput = $($content, "> BlacklistWordInput");

                expect($wordInput.length).to.eq(1);
                expect($wordInput[0]).to.have.property("_isReactElement", true);
            });

            it("should add a ref attribute of 'input' to the WordInput element", () => {
                var $wordInput = $($content, "> BlacklistWordInput")[0];

                expect($wordInput).to.have.property("ref", "input");
            });

            it("should pass a value attribute referencing this.state.word to the WordInput element", () => {
                var $wordInput = $($content, "> BlacklistWordInput")[0];

                expect($wordInput.props).to.have.property("value", instance.state.word);
            });

            it("should pass the blacklist.validate method as 'validate' to the WordInput element", () => {
                var spy = sandbox.spy();
                var $root, $wordInput;

                sandbox.stub(Function.prototype, "bind", function(...args) {
                    spy.apply(this, args);
                    
                    return "blacklist.validate";
                });
                
                $root = renderComponent(Module, {blacklist}).output;
                $wordInput = $($root, "> .content > BlacklistWordInput")[0];
                
                expect(spy.called).to.eq(true);
                expect(spy.firstCall.args).to.eql([blacklist, null]);
                expect(spy.firstCall.thisValue).to.eq(blacklist.validate);
                expect($wordInput.props).to.have.property("validate", "blacklist.validate");
            });

            it("should attach an onChange handler (this._onInputChange) to the WordInput element", () => {
                var $wordInput = $($content, "> BlacklistWordInput")[0];

                expect($wordInput.props).to.have.property("onChange", instance._onInputChange);
            });

            it("should attach an onEnter handler (this._onAddClick) to the WordInput element", () => {
                var $wordInput = $($content, "> BlacklistWordInput")[0];

                expect($wordInput.props).to.have.property("onEnter", instance._onAddClick);
            });
            
        });

    });

    describe("methods", () => {
        var instance;
        
        beforeEach(() => {
            var blacklist = getMockBlacklist();
            
            instance = new Module({blacklist});
        });
        
        describe("_onAddClick", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onAddClick.bind(instance);
            });
            
            it("should call blacklist.validate with this.state.word as the second argument", () => {
                
            });

            it("should call React.findDOMNode with a reference to WordInput if the entry is invalid", () => {
                
            });

            it("should call focus on the element retrieved from React.findDOMNode", () => {
                
            });

            it("should only call setState and blacklist.add when the entry is valid", () => {
                
            });
            
            it("should set this.state.word to an empty string", () => {
                
            });

            it("should pass this.state.word to blacklist.add", () => {
                
            });
            
        });

        describe("_onInputChange", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onInputChange.bind(instance);
            });

            it("should set this.state.word to the value of the changed input element", () => {
                
            });
            
        });

    });

});
