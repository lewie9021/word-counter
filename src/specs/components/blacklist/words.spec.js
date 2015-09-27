import { EventEmitter } from "events";
import { PropTypes } from "react";
import $ from "react-shallow-query";
import { renderComponent } from "../../helpers";

function getMockBlacklist() {
    var blacklist = new EventEmitter();
    var store = {};

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
    
    xdescribe("structure", () => {

        describe("list-group", () => {
            var $listGroup;

            beforeEach(() => {
                $listGroup = renderComponent(Module, {
                    blacklist: getMockBlacklist()
                }).output;
            });

            it("should set the className attribute to 'words'", () => {
                
            });

            it("should have a props.children length that matches the number of blacklisted words", () => {
                
            });

            it("should only have child elements are of type 'Word'", () => {
                
            });

        });

    });

    xdescribe("methods", () => {

        describe("componentWillMount", () => {

            it("should attach an event listener on the blacklist object for the 'change' event", () => {
                
            });
            
        });

        describe("componentWillUnmount", () => {

            it("should detach an event listener from the blacklist object for the 'change' event", () => {
                
            });
            
        });

        describe("_onEdit", () => {

            it("should call this.setState, setting 'editing' to the passed 'word' variable", () => {
                
            });

            it("should pass a callback to the second parameter of this.setState", () => {
                
            });
            
        });

        describe("_onCancel", () => {

            it("should call this.setState, setting 'editing' to null", () => {
                
            });
            
        });

        describe("_renderWords", () => {

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
