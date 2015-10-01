import { PropTypes } from "react";
import $ from "react-shallow-query";
import { renderComponent, getMockBlacklist, arrayToObject } from "../../helpers";

// Little helper that returns a valid props object.
function getModuleProps(props = {}) {
    var func = () => {};
    
    return {
        blacklist: getMockBlacklist(),
        onEdit: func,
        onCancel: func,
        word: "",
        mode: "view",
        ...props
    };
}

function getNestedElements(Module, func) {
    return function(props) {
        var moduleProps = getModuleProps(props);
        var component = renderComponent(Module, moduleProps);

        if (!func)
            return component;

        return func(component);
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
    
    describe("structure", () => {
        
        describe("root", () => {
            var renderRoot;

            beforeEach(() => {
                renderRoot = getNestedElements(Module);
            });

            it("should be of type 'ListGroupItem'", () => {
                var ListGroupItem = require("react-bootstrap/lib/ListGroupItem");
                var $root = renderRoot().output;
                
                expect($root.type).to.eq(ListGroupItem);
            });

            it("should have the classes 'word', 'clearfix', and this,props.mode", () => {
                var $root, classes;

                $root = renderRoot({mode: "view"}).output;
                classes = $root.props.className.split(" ");

                expect(classes).to.eql(["word", "clearfix", "view"]);
                
                $root = renderRoot({mode: "edit"}).output;
                classes = $root.props.className.split(" ");

                expect(classes).to.eql(["word", "clearfix", "edit"]);
            });

            it("should contain a direct child of type 'div' with a class 'controls'", () => {
                var $root = renderRoot().output;
                var $controls = $($root, "> .controls")[0];
                
                expect($controls).to.exist;
                expect($controls.type).to.eq("div");
            });

            it("should contain a direct child of type 'div' with a class 'content'", () => {
                var $root = renderRoot().output;
                var $content = $($root, "> .content")[0];
                
                expect($content).to.exist;
                expect($content.type).to.eq("div");
            });

        });

        describe("controls", () => {
            var renderControls;

            beforeEach(() => {
                renderControls = getNestedElements(Module, (component) => {
                    var {output, instance} = component;
                    
                    return {
                        output: $(output, "> .controls")[0],
                        instance
                    };
                });
            });

            it("should contain two direct children of type 'Button'", () => {
                var Button = require("react-bootstrap/lib/Button");
                var $controls = renderControls().output;
                var {children} = $controls.props;

                expect(children.length).to.eq(2);
                
                children.forEach(($element, idx) => {
                    var {className} = $element.props;
                    
                    expect($element.type).to.eq(Button);
                    expect($element.key).to.eq(idx.toString());
                    expect(className).to.eq("pull-right");
                });
            });

            it("should render a direct child of type 'Glyphicon' for each Button", () => {
                var Glyphicon = require("react-bootstrap/lib/Glyphicon");
                var $controls = renderControls().output;
                var {children} = $controls.props;

                children.forEach(($element, idx) => {
                    var {children} = $element.props;
                    
                    expect(children).to.exist;
                    expect(children.type).to.eq(Glyphicon);
                });
            });

            it("should render a delete and edit Button given the mode 'view'", () => {
                var result = renderControls({mode: "view"});
                var {instance} = result;
                var $controls = result.output;
                var [$delete, $edit] = $controls.props.children;

                expect($delete.props.bsStyle).to.eq("danger");
                expect($delete.props.onClick).to.eq(instance._onRemoveClick);
                expect($delete.props.children.props.glyph).to.eq("trash");

                expect($edit.props.bsStyle).to.eq("info");
                expect($edit.props.onClick).to.eq(instance._onEditClick);
                expect($edit.props.children.props.glyph).to.eq("pencil");
            });

            it("should render a cancel and ok Button given the mode 'edit'", () => {
                var result = renderControls({mode: "edit"});
                var {instance} = result;
                var $controls = result.output;
                var [$cancel, $ok] = $controls.props.children;

                expect($cancel.props.bsStyle).to.eq("danger");
                expect($cancel.props.onClick).to.eq(instance.props.onCancel);
                expect($cancel.props.children.props.glyph).to.eq("remove");

                expect($ok.props.bsStyle).to.eq("success");
                expect($ok.props.onClick).to.eq(instance._onSaveClick);
                expect($ok.props.children.props.glyph).to.eq("ok");
            });

        });

        describe("content", () => {
            var renderContent;

            beforeEach(() => {
                renderContent = getNestedElements(Module, (component) => {
                    var {output, instance} = component;
                    
                    return {
                        output: $(output, "> .content")[0],
                        instance
                    };
                });
            });

            it("should render a 'strong' element containing this.props.word given the mode 'view'", () => {
                var $content = renderContent({mode: "view", word: "HelloWorld"}).output;
                var $strong = $content.props.children;
                
                expect($strong.type).to.eq("strong");
                expect($strong.props.children).to.eq("HelloWorld");
            });

            it("should render a 'WordInput' given the mode 'edit'", () => {
                var WordInput = require("../../../components/Blacklist/WordInput");
                var $content = renderContent({mode: "edit"}).output;
                var $wordInput = $content.props.children;

                expect($wordInput.type).to.eq(WordInput);
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
