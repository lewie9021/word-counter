import $ from "react-shallow-query";
import { renderComponent } from "../helpers";

describe("components/StatsBucket", () => {
    var Module, sandbox;
    
    beforeEach(() => {
        Module = require("../../components/StatsBucket");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("structure", () => {
        
        describe("panel", () => {
            var $panel;
            
            beforeEach(() => {
                $panel = renderComponent(Module, {
                    title: "Hello World",
                    stats: []
                }).output;
            });
            
            it("should pass props.title to the header attribute", () => {
                expect($panel.props).to.have.property("header", "Hello World");
            });

            it("should use Bootstrap's 'info' styling class", () => {
                expect($panel.props).to.have.property("bsStyle", "info");
            });
            
        });

        describe("list-group", () => {

            it("should make use of the 'fill' attribute", () => {
                var {output} = renderComponent(Module, {
                    title: "Hello World",
                    stats: []
                });
                var $listGroup = $(output, "> ListGroup")[0];

                expect($listGroup.props).to.have.property("fill", true);
            });

            it("should have a props.children length that matches this.props.stats length", () => {
                var {output} = renderComponent(Module, {
                    title: "Hello World",
                    stats: [1, 2, 3].map((key) => ({key}))
                });
                var $listGroup = $(output, "> ListGroup")[0];

                expect($listGroup.props.children.length).to.eq(3);
            });
            
        });

        describe("list-group-item", () => {

            it("should pass the value of stat.key to the 'key' attribute", () => {
                var {output} = renderComponent(Module, {
                    title: "Hello World",
                    stats: [1, 2, 3].map((key) => ({key}))
                });

                $(output, "> ListGroup > ListGroupItem").forEach(($item, index) => {
                    expect($item).to.have.property("key", (index + 1).toString());
                });
                
            });

            it("should render stat.name in a span", () => {
                var {output} = renderComponent(Module, {
                    title: "Hello World",
                    stats: [1, 2, 3].map((key) => ({key, name: "stat" + key}))
                });
                
                $(output, "> ListGroup > ListGroupItem").forEach(($item, index) => {
                    var $span = $($item, "> span")[0];

                    expect($span.props).to.have.property("children", "stat" + (index + 1));
                });
            });
            
            it("should render stat.value in a Badge with a 'pullRight' attribute", () => {
                var {output} = renderComponent(Module, {
                    title: "Hello World",
                    stats: [1, 2, 3].map((key) => ({key, value: key}))
                });
                
                $(output, "> ListGroup > ListGroupItem").forEach(($item, index) => {
                    var $badge = $($item, "> Badge")[0];

                    expect($badge.props).to.have.property("pullRight", true);
                    expect($badge.props).to.have.property("children", (index + 1));
                });
            });
            
        });

    });

    describe("methods", () => {
        var instance;
        
        beforeEach(() => {
            instance = new Module();
        });
        
        describe("_renderStats", () => {
            var method;
            
            beforeEach(() => {
                method = instance._renderStats.bind(instance);
            });

            it("should throw if no 'stats' are given", () => {
                var err = "You must provide an array of stats";
                
                expect(() => {
                    method();
                }).to.throw(err);
            });

            it("should throw if 'stats' isn't an array", () => {
                var err = "You must provide an array of stats";
                
                [undefined, null, {}, "Hello", 5, true].forEach((invalidValue) => {
                    expect(() => {
                        method(invalidValue);
                    }).to.throw(err);
                });
            });
            
            it("should return an array of React elements", () => {
                var props = [1, 2, 3].map((key) => ({key}));
                var result = method(props);
                
                expect(result.length).to.eq(props.length);

                result.forEach((element) => {
                    expect(element).to.have.property("_isReactElement", true);
                });
            });
            
        });
        
    });
    
});
