import React from "react/addons";
import $ from "react-shallow-query";

describe("components/App", () => {
    var Module, sandbox;
    
    beforeEach(() => {
        Module = require("../../components/App");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    describe("structure", () => {
        var shallowRenderer, result, instance;

        beforeEach(() => {
            // TODO: Put this in a helper function?
            // e.g. renderComponent(props);
            var { TestUtils } = React.addons;

            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Module />);
            
            result = shallowRenderer.getRenderOutput();

            // TODO: Not overly happy about this.
            instance = shallowRenderer._instance._instance;
        });

        describe("navbar", () => {
            var $navbar;

            beforeEach(() => {
                var results = $(result, "> Navbar");

                expect(results.length).to.eq(1);
                
                $navbar = results[0];
            });
            
            it("should contain a Navbar directly under the returned div", () => {
                expect($navbar._isReactElement).to.eq(true);
            });

            it("should contain a brand element", () => {
                var $brand = $navbar.props.brand;

                expect($brand._isReactElement).to.eq(true);
                expect($brand.props).to.have.property("href", "#/");
                expect($brand.props).to.have.property("children", "Word Counter");
            });

            it("should have an inverse property", () => {
                expect($navbar.props).to.have.property("inverse", true);
            });

            it("should contain a button that calls this._onShowBlacklist", () => {
                var $btn = $($navbar, "> Button")[0];
                
                expect($btn._isReactElement).to.eq(true);
                expect($btn.props).to.have.property("bsStyle", "info");
                expect($btn.props).to.have.property("className", "pull-right");
                expect($btn.props).to.have.property("onClick", instance._onShowBlacklist);
            });
            
        });

        describe("grid", () => {
            var $grid;

            beforeEach(() => {
                var results = $(result, "> Grid");

                expect(results.length).to.eq(1);
                
                $grid = results[0];
            });
            
            it("should contain a Grid directly under the returned div", () => {
                expect($grid._isReactElement).to.eq(true);
            });

            it("should contain two Col elements wrapped by a Row element", () => {
                var $cols = $($grid, "> Row > Col");
                
                expect($cols.length).to.eq(2);
            });

            it("should provide props: {xs: 12, md: 8} to the first Col element", () => {
                var $col = $($grid, "> Row > Col")[0];

                expect($col.props).to.have.property("xs", 12);
                expect($col.props).to.have.property("md", 8);
            });

            it("should provide props: {xs: 12, md: 4} to the second Col element", () => {
                var $col = $($grid, "> Row > Col")[1];

                expect($col.props).to.have.property("xs", 12);
                expect($col.props).to.have.property("md", 4);
            });
            
            it("should contain a textarea in the first Col element", () => {
                // var $textarea = $($grid, "> Row > Col:nth-child(0) textarea")[0];
                var $col = $($grid, "> Row > Col")[0];
                var $textarea = $($col, "textarea")[0];

                expect($textarea.props).to.have.property("className", "form-control");
                expect($textarea.props).to.have.property("rows", 10);
                expect($textarea.props).to.have.property("placeholder", "Enter text here...");
                expect($textarea.props).to.have.property("onChange", instance._onTextAreaChange);
            });

            it("should contain a StatsBucket element titled 'Details' in the second Col element", () => {
                // var $statsBucket = $($grid, "> Row > Col:nth-child(1) StatsBucket")[0];
                var $col = $($grid, "> Row > Col")[1];
                var $statsBucket = $($col, "StatsBucket")[0];

                expect($statsBucket.props).to.have.property("title", "Details");
            });

            it("should not intially contain a second StatsBucket element titled 'Word Density'", () => {
                // var $col = $($grid, "> Row > Col")[1];
                var $col = $($grid, "> Row > Col")[1];

                expect($col.props.children[1]).to.be.null;
            });
            
        });

        describe("blacklist-modal", () => {
            var $modal;

            beforeEach(() => {
                var results = $(result, "> BlacklistModal");

                expect(results.length).to.eq(1);
                
                $modal = results[0];
            });
            
            it("should contain a BlacklistModal directly under the returned div", () => {
                expect($modal._isReactElement).to.eq(true);
                expect($modal.props).to.have.property("showModal", instance.state.showModal);
                expect($modal.props).to.have.property("onHide", instance._onHideBlacklist);
            });

            it("should be passed an instance of Blacklist to enable functionality", () => {
                expect($modal.props).to.have.property("blacklist", instance.blacklist);
            });

        });
        
    });

});
