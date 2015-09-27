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

        describe("root", () => {
            
            it("should have the classes 'word', 'clearfix', and 'create'", () => {
                
            });

            it("should contain a .controls div element", () => {
                
            });

            it("should contain a .content div element", () => {
                
            });

        });

        describe("controls", () => {

            it("should contain a button element with the text 'Add Word'", () => {
                
            });
            
            it("should apply a class of 'pull-right' to the button", () => {
                
            });

            it("should assign 'success' to the bsStyle attribute of the button", () => {
                
            });

            it("should attach an onClick handler (this._onAddClick) to the button", () => {
                
            });

        });

        describe("content", () => {
            
            it("should contain an element of type 'WordInput'", () => {
                
            });

            it("should add a ref attribute of 'input' to the WordInput element", () => {
                
            });

            it("should pass a value attribute referencing this.state.word to the WordInput element", () => {
                
            });

            it("should pass the blacklist.validate method as 'validate' to the WordInput element", () => {
                
            });

            it("should attach an onChange handler (this._onInputChange) to the WordInput element", () => {

            });

            it("should attach an onEnter handler (this._onAddClick) to the WordInput element", () => {

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
