import { PropTypes } from "react";
import $ from "react-shallow-query";
import { renderComponent, getMockBlacklist, arrayToObject } from "../../helpers";

// Little helper that returns a valid props object.
function getModuleProps(props) {
    var str = "";
    var func = () => {};
    
    return {
        blacklist: getMockBlacklist(),
        onEdit: func,
        onCancel: func,
        word: str,
        mode: "view",
        ...props
    };
}

describe("components/Blacklist/Word", () => {
    var Module, sandbox;
    
    beforeEach(() => {
        Module = require("../../../components/Blacklist/Word");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("instantiation", () => {

        it("should have a displayName of 'BlacklistWord'", () => {
            expect(Module.displayName).to.eq("BlacklistWord");
        });

        it("should define propTypes with five keys", () => {
            var {propTypes} = Module;
            
            expect(propTypes).to.exist;
            expect(Object.keys(propTypes).length).to.eq(5);
        });

        it("should require a prop 'blacklist' that must be an object", () => {
            expect(Module.propTypes.blacklist).to.eq(PropTypes.object.isRequired);
        });

        it("should require a prop 'onEdit' that must be a function", () => {
            expect(Module.propTypes.onEdit).to.eq(PropTypes.func.isRequired);
        });

        it("should require a prop 'onCancel' that must be a function", () => {
            expect(Module.propTypes.onCancel).to.eq(PropTypes.func.isRequired);
        });

        it("should require a prop 'word' that must be a string", () => {
            expect(Module.propTypes.word).to.eq(PropTypes.string.isRequired);
        });

        it("should require a prop 'mode' that must be a string", () => {
            expect(Module.propTypes.mode).to.eq(PropTypes.string.isRequired);
        });

        it("should set this.state.word to props.word", () => {
            var moduleProps = getModuleProps({word: "Hello"});
            var {state} = new Module(moduleProps);
            
            expect(state.word).to.eq("Hello");
        });
        
    });
    
    xdescribe("structure", () => {
        var moduleProps;
        
        beforeEach(() => {
            moduleProps = getModuleProps();
        });
        
        describe("list-group-item", () => {
            var $listItem;

            beforeEach(() => {
                $listItem = renderComponent(Module, moduleProps).output;
            });

            it("should work", () => {
                
            });

        });

        describe("controls", () => {
            var $controls;

            beforeEach(() => {
                var $listItem = renderComponent(Module, moduleProps).output;

                $controls = $($listItem, "> .controls");
            });

            it("should work", () => {
                
            });

        });

        describe("content", () => {
            var $content;

            beforeEach(() => {
                var $listItem = renderComponent(Module, moduleProps).output;

                $content = $($listItem, "> .content");
            });

            it("should work", () => {
                
            });

        });

    });

    xdescribe("methods", () => {
        var instance, moduleProps;
        
        beforeEach(() => {
            moduleProps = getModuleProps();
            instance = new Module(moduleProps);
        });

        describe("componentWillReceiveProps", () => {
            var method;
            
            beforeEach(() => {
                method = instance.componentWillReceiveProps.bind(instance);
            });

            it("should work", () => {

            });
            
        });

        describe("_focusInput", () => {
            var method;
            
            beforeEach(() => {
                method = instance._focusInput.bind(instance);
            });

            it("should work", () => {

            });
            
        });

        describe("_onInputChange", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onInputChange.bind(instance);
            });

            it("should work", () => {

            });
            
        });

        describe("_onEditClick", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onEditClick.bind(instance);
            });

            it("should work", () => {

            });
            
        });

        describe("_onRemoveClick", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onRemoveClick.bind(instance);
            });

            it("should work", () => {

            });
            
        });

        describe("_onSaveClick", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onSaveClick.bind(instance);
            });

            it("should work", () => {

            });
            
        });

    });

});
