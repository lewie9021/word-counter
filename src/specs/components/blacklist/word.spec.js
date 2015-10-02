import { PropTypes } from "react";
import $ from "react-shallow-query";
import { renderComponent, getMockBlacklist, getNestedElements } from "../../helpers";

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
                renderRoot = getNestedElements(Module, getModuleProps());
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
                renderControls = getNestedElements(Module, getModuleProps(), (component) => {
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
                renderContent = getNestedElements(Module, getModuleProps(), (component) => {
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

    describe("methods", () => {
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

            it("should call this.setState with values props.mode and props.word", () => {
                var spy = sandbox.spy();

                sandbox.stub(instance, "setState", spy);

                moduleProps.mode = "view";
                moduleProps.word = "Hello";
                
                method(moduleProps);
                
                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args).to.eql([{
                    mode: moduleProps.mode,
                    word: moduleProps.word
                }]);

                moduleProps.mode = "edit";
                moduleProps.word = "World";
                
                method(moduleProps);
                
                expect(spy.callCount).to.eq(2);
                expect(spy.secondCall.args).to.eql([{
                    mode: moduleProps.mode,
                    word: moduleProps.word
                }]);
            });
            
        });

        describe("_focusInput", () => {
            var method;
            
            beforeEach(() => {
                method = instance._focusInput.bind(instance);
            });

            it("should call React.findDOMNode with the value of this.refs.input", () => {
                var spy = sandbox.spy();
                
                instance.refs = {
                    input: "WordInput"
                };
                
                // Rewire React.findDOMNode
                Module.__Rewire__("React", {
                    findDOMNode: (...args) => {
                        spy(...args);

                        return {
                            childNodes: [{
                                focus: () => {}
                            }]
                        };
                    }
                });

                method();

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args).to.eql([instance.refs.input]);
                
                Module.__ResetDependency__("React");
            });

            it("should call focus on the DOM element referenced at this.refs.input", () => {
                var spy = sandbox.spy();
                
                instance.refs = {
                    input: "WordInput"
                };
                
                // Rewire React.findDOMNode
                Module.__Rewire__("React", {
                    findDOMNode: (...args) => {
                        return {
                            childNodes: [{
                                focus: spy
                            }]
                        };
                    }
                });

                method();

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args.length).to.eql(0);
                
                Module.__ResetDependency__("React");
            });
            
        });

        describe("_onInputChange", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onInputChange.bind(instance);
            });

            it("should call this.setState of 'word' with the value of e.target.value", () => {
                var spy = sandbox.spy();
                var event = {
                    target: {
                        value: "Hello"
                    }
                };
                
                sandbox.stub(instance, "setState", spy);

                method(event);

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args).to.eql([{
                    word: event.target.value
                }]);
            });
            
        });

        describe("_onEditClick", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onEditClick.bind(instance);
            });

            it("should call props.onEdit with a callback", () => {
                var spy = sandbox.spy();
                
                sandbox.stub(instance.props, "onEdit", spy);

                method();

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args.length).to.eql(1);
                expect(spy.firstCall.args[0]).to.be.a("function");
            });

            it("should call this._focusInput in the callback of props.onEdit", () => {
                var spy = sandbox.spy();

                sandbox.stub(instance, "_focusInput", spy);
                sandbox.stub(instance.props, "onEdit", (callback) => {
                    callback();
                });

                method();

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args.length).to.eql(0);
            });
            
        });

        describe("_onRemoveClick", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onRemoveClick.bind(instance);
            });

            it("should call props.blacklist.del with the value of props.word", () => {
                var spy = sandbox.spy();
                var {props} = instance;

                props.blacklist.del = spy;
                props.word = "Hello";

                method();
                
                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args).to.eql([props.word]);

                props.word = "World";

                method();
                
                expect(spy.callCount).to.eq(2);
                expect(spy.secondCall.args).to.eql([props.word]);
            });
            
        });

        describe("_onSaveClick", () => {
            var method;
            
            beforeEach(() => {
                method = instance._onSaveClick.bind(instance);
            });

            it("should call blacklist.validate to ensure the newly inputted word is valid", () => {
                var spy = sandbox.spy();
                var {props, state} = instance;
                
                props.blacklist.update = () => {};
                props.word = "Hello";
                state.word = "World";
                
                sandbox.stub(props.blacklist, "validate", (...args) => {
                    spy(...args);
                    
                    return "success";
                });

                method();

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args).to.eql([props.word, state.word]);
            });

            it("should call blacklist.update if the new word is valid", () => {
                var spy = sandbox.spy();
                var {props, state} = instance;
                
                props.blacklist.update = spy;
                props.word = "Hello";
                state.word = "World";

                sandbox.stub(props.blacklist, "validate").returns("success");

                method();
                
                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args).to.eql([props.word, state.word]);
            });

            it("should call this._focusInput if the new word is invalid", () => {
                var spy = sandbox.spy();
                var {blacklist} = instance.props;

                sandbox.stub(instance, "_focusInput", spy);
                sandbox.stub(blacklist, "validate").returns("error");

                method();

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.args.length).to.eq(0);
            });
            
        });

    });

});
