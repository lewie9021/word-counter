import React from "react/addons";
import $ from "react-shallow-query";
import Parser from "app/parser";
import { renderComponent, getNestedElements } from "specs/helpers";

function generateInput() {
    // Generate an input of letters A-Z.
    return Array.from(Array(26).keys()).map((x, i) => {
        return String.fromCharCode(65 + i);
    });
}

describe("components/App", () => {
    var Module, sandbox;

    beforeEach(() => {
        Module = require("components/App");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("instantiation", () => {

        it("should have a displayName of 'App'", () => {
            expect(Module.displayName).to.eq("App");
        });
        
    });
    
    describe("structure", () => {

        describe("navbar", () => {
            var renderNavbar;

            beforeEach(() => {
                renderNavbar = getNestedElements(Module, {}, (component) => {
                    var {output, instance} = component;
                    
                    return {
                        output: $(output, "> Navbar")[0],
                        instance
                    };
                });
            });

            it("should contain a Navbar element directly under the returned div", () => {
                var $navbar = renderNavbar().output;
                
                expect($navbar).to.have.property("_isReactElement", true);
            });

            it("should contain a brand element", () => {
                var $navbar = renderNavbar().output;
                var $brand = $navbar.props.brand;

                expect($brand).to.have.property("_isReactElement", true);
                expect($brand.props).to.have.property("href", "#/");
                expect($brand.props).to.have.property("children", "Word Counter");
            });

            it("should have an inverse property", () => {
                var $navbar = renderNavbar().output;
                
                expect($navbar.props).to.have.property("inverse", true);
            });

            it("should contain a button that calls this._onShowBlacklist", () => {
                var result = renderNavbar();
                var {instance} = result;
                var $navbar = result.output;
                var $button = $($navbar, "> Button")[0];
                
                expect($button).to.have.property("_isReactElement", true);
                expect($button.props).to.have.property("bsStyle", "info");
                expect($button.props).to.have.property("className", "pull-right");
                expect($button.props).to.have.property("onClick", instance._onShowBlacklist);
            });
            
        });

        describe("grid", () => {
            var renderGrid;

            beforeEach(() => {
                renderGrid = getNestedElements(Module, {}, (component) => {
                    var {output, instance} = component;
                    
                    return {
                        output: $(output, "> Grid")[0],
                        instance
                    };
                });
            });
            
            it("should contain a Grid element directly under the returned div", () => {
                var $grid = renderGrid().output;
                
                expect($grid).to.have.property("_isReactElement", true);
            });

            it("should contain two Col elements wrapped by a Row element", () => {
                var $grid = renderGrid().output;
                var $cols = $($grid, "> Row > Col");
                
                expect($cols.length).to.eq(2);
            });

            it("should provide props: {xs: 12, md: 8} to the first Col element", () => {
                var $grid = renderGrid().output;
                var $col = $($grid, "> Row > Col")[0];

                expect($col.props).to.have.property("xs", 12);
                expect($col.props).to.have.property("md", 8);
            });

            it("should provide props: {xs: 12, md: 4} to the second Col element", () => {
                var $grid = renderGrid().output;
                var $col = $($grid, "> Row > Col")[1];

                expect($col.props).to.have.property("className", "stats-container");
                expect($col.props).to.have.property("xs", 12);
                expect($col.props).to.have.property("md", 4);
            });
            
            it("should contain a textarea in the first Col element", () => {
                var result = renderGrid();
                var {instance} = result;
                var $grid = result.output;
                // var $textarea = $($grid, "> Row > Col:nth-child(0) textarea")[0];
                var $col = $($grid, "> Row > Col")[0];
                var $textarea = $($col, "textarea")[0];

                expect($textarea.props).to.have.property("className", "form-control");
                expect($textarea.props).to.have.property("rows", 12);
                expect($textarea.props).to.have.property("placeholder", "Enter text here...");
                expect($textarea.props).to.have.property("onChange", instance._onTextAreaChange);
            });

            it("should contain a StatsBucket element titled 'Details' in the second Col element", () => {
                var $grid = renderGrid().output;
                // var $statsBucket = $($grid, "> Row > Col:nth-child(1) StatsBucket")[0];
                var $col = $($grid, "> Row > Col")[1];
                var $statsBucket = $($col, "StatsBucket")[0];

                expect($statsBucket.props).to.have.property("title", "Details");
            });

            it("should contain another StatsBucket element titled 'Word Density' when state.wordDensity > 0", () => {
                var $grid = renderGrid().output;
                var $col = $($grid, "> Row > Col")[1];
                var $statsBucket;

                expect($col.props.children[1]).to.be.null;

                $grid = renderGrid({input: "Hello World"}).output;
                $col = $($grid, "> Row > Col")[1];
                $statsBucket = $($col, "StatsBucket")[1];

                expect($statsBucket.props).to.have.property("title", "Word Density");
            });

            it("should sort state.wordDensity by value and then name alphabetically", () => {
                var input = generateInput().reverse();
                var expected = generateInput()
                        .filter((letter) => letter !== "C")
                        .map((letter) => letter.toLowerCase());

                // Add a duplicate letter to ensure value is respected over name.
                input.push("C");
                expected.unshift("c");

                var $grid = renderGrid({input: input.join(" ")}).output;
                var $col = $($grid, "> Row > Col")[1];
                var $statsBucket = $($col, "StatsBucket")[1];

                $statsBucket.props.stats.forEach((state, index) => {
                    expect(state.name).to.eq(expected[index]);
                });
            });

            it("should only pass the top 10 words to the 'Word Density' StatsBucket", () => {
                // Generate an input of letters A-Z.
                var input = generateInput().join(" ");

                var $grid = renderGrid({input}).output;
                var $col = $($grid, "> Row > Col")[1];
                var $statsBucket = $($col, "StatsBucket")[1];

                expect($statsBucket.props.stats.length).to.eq(10);
            });
            
        });

        describe("blacklist-modal", () => {
            var renderModal;

            beforeEach(() => {
                renderModal = getNestedElements(Module, {}, (component) => {
                    var {output, instance} = component;
                    
                    return {
                        output: $(output, "> BlacklistModal")[0],
                        instance
                    };
                });
            });
            
            it("should contain a BlacklistModal directly under the returned div", () => {
                var result = renderModal();
                var {instance} = result;
                var $modal = result.output;
                
                expect($modal).to.have.property("_isReactElement", true);
                expect($modal.props).to.have.property("showModal", instance.state.showModal);
                expect($modal.props).to.have.property("onHide", instance._onHideBlacklist);
            });

            it("should be passed an instance of Blacklist to enable functionality", () => {
                var Blacklist = require("app/Blacklist");
                var result = renderModal();
                var {instance} = result;
                var $modal = result.output;
                
                expect($modal.props).to.have.property("blacklist", instance.blacklist);
                expect($modal.props.blacklist).to.be.an.instanceof(Blacklist);
            });

        });
        
    });

    describe("methods", () => {
        var instance, setStateSpy;

        beforeEach(() => {
            instance = new Module({});
            
            // Stub this.setState with a spy.
            setStateSpy = sandbox.spy();
            sandbox.stub(instance, "setState", setStateSpy);
        });
        
        describe("_onTextAreaChange", () => {
            var method, event, stats;

            beforeEach(() => {
                method = instance._onTextAreaChange.bind(instance);
                event = {
                    target: {
                        value: "Hello world!"
                    }
                };
                stats = {
                    details: "details",
                    wordDensity: "wordDensity"
                };
            });
            
            it("should pass the value of the textarea to the Parser module", () => {
                var spy = sandbox.spy();
                
                // Rewire the Parser to spy on it.
                Module.__Rewire__("Parser", spy);
                
                method(event);

                expect(spy.firstCall.args).to.eql([event.target.value]);

                // Revert the change.
                Module.__ResetDependency__("Parser");
            });

            it("should pass the returned value of the Parser module to this.setState", () => {
                // Rewire the Parser to spy on it.
                Module.__Rewire__("Parser", () => stats);

                method(event);

                expect(setStateSpy.firstCall.args).to.eql([stats]);

                // Revert the change.
                Module.__ResetDependency__("Parser");
            });
            
        });

        describe("_onShowBlacklist", () => {
            var method;

            beforeEach(() => {
                method = instance._onShowBlacklist.bind(instance);
            });
            
            it("should set the component's state property 'showModal' to true", () => {
                method();
                
                expect(setStateSpy.firstCall.args).to.eql([{
                    showModal: true
                }]);
            });
            
        });

        describe("_onHideBlacklist", () => {
            var method;

            beforeEach(() => {
                method = instance._onHideBlacklist.bind(instance);
            });
            
            it("should set the component's state property 'showModal' to false", () => {
                method();
                
                expect(setStateSpy.firstCall.args[0]).to.eql({
                    showModal: false
                });
            });
            
        });

        describe("_mapStats", () => {
            var method;

            beforeEach(() => {
                method = instance._mapStats.bind(instance);
            });
            
            it("should iterate over each key in 'details'", () => {
                var spy = sandbox.spy();
                
                sandbox.stub(Array.prototype, "reduce", spy);

                method({a: 1, b: 2, c: 3});

                expect(spy.callCount).to.eq(1);
                expect(spy.firstCall.thisValue).to.eql(["a", "b", "c"]);
            });

            it("should return an array with a length identical to the number of properties in 'details'", () => {
                var stats = {
                    a: 1,
                    b: 2,
                    c: 3
                };
                var result = method(stats);

                expect(Array.isArray(result)).to.eq(true);
                expect(result.length).to.eq(Object.keys(stats).length);
            });
            
            it("should return an array of objects with the properties 'key', 'name', and 'value'", () => {
                var stats = {
                    a: 1,
                    b: 2,
                    c: 3
                };
                var result = method(stats);

                result.forEach((stat, index) => {
                    expect(stat).to.have.property("key", index);
                    expect(stat).to.have.property("name");
                    expect(stat).to.have.property("value");
                    expect(Object.keys(stat).length).to.eq(3);
                });
            });

            it("should assign source[key] for the returned 'name' properties", () => {
                var source = {
                    a: "A",
                    b: "B",
                    c: "C"
                };
                var stats = {
                    a: 1,
                    b: 2,
                    c: 3
                };
                var result = method(stats, source);
                var keys = Object.keys(stats);
                
                result.forEach((stat, index) => {
                    var statsKey = keys[index];
                    
                    expect(stat).to.have.property("name", source[statsKey]);
                });
            });

            it("should assign stats[key] for the returned 'value' properties", () => {
                var stats = {
                    a: 1,
                    b: 2,
                    c: 3
                };
                var result = method(stats);
                var keys = Object.keys(stats);
                
                result.forEach((stat, index) => {
                    var statsKey = keys[index];
                    
                    expect(stat).to.have.property("value", stats[statsKey]);
                });
            });

            it("should default 'source' to 'stats'", () => {
                var stats = {
                    a: 1,
                    b: 2,
                    c: 3
                };
                var result = method(stats);
                var keys = Object.keys(stats);
                
                result.forEach((stat, index) => {
                    var statsKey = keys[index];
                    
                    expect(stat).to.have.property("value", stats[statsKey]);
                });
            });
            
        });
        
    });
    
});
