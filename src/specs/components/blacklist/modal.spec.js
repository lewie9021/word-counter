import $ from "react-shallow-query";
import { renderComponent } from "specs/helpers";

describe("components/Blacklist/Modal", () => {
    var Module, sandbox;

    beforeEach(() => {
        Module = require("components/Blacklist/Modal");
        
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("structure", () => {

        describe("modal", () => {
            var $modal, onHide;

            beforeEach(() => {
                onHide = () => {};
                $modal = renderComponent(Module, {
                    showModal: false,
                    blacklist: {},
                    onHide
                }).output;
            });

            it("should set the className attribute to 'blacklist'", () => {
                expect($modal.props).to.have.property("className", "blacklist");
            });
            
            it("should pass props.showModal to the 'show' attribute", () => {
                expect($modal.props).to.have.property("show", false);
            });

            it("should pass props.onHide to the 'onHide' attribute", () => {
                expect($modal.props).to.have.property("onHide", onHide);
            });

            it("should contain 3 child elements", () => {
                expect($modal.props.children.length).to.eq(3);
            });
            
        });

        describe("header", () => {
            var $header, onHide;
            
            beforeEach(() => {
                onHide = () => {};
                var {output} = renderComponent(Module, {
                    showModal: false,
                    blacklist: {},
                    onHide
                });

                $header = $(output, "> ModalHeader")[0];
            });

            it("should have a className attribute of 'clearfix'", () => {
                expect($header.props).to.have.property("className", "clearfix");
            });

            it("should contain a close button and title", () => {
                var $button = $($header, "> Button")[0];
                var $title = $($header, "> ModalTitle")[0];

                expect($button).to.have.property("_isReactElement", true);
                expect($button.props).to.have.property("className", "pull-right");
                expect($button.props).to.have.property("bsSize", "small");
                expect($button.props).to.have.property("onClick", onHide);
                expect($button.props.children).to.eq("Close");
                
                expect($title).to.have.property("_isReactElement", true);
                expect($title.props.children).to.eq("Blacklist Words");
            });
            
        });

        describe("body", () => {
            var $body, blacklist;
            
            beforeEach(() => {
                blacklist = {};
                var {output} = renderComponent(Module, {
                    showModal: false,
                    blacklist,
                    onHide: () => {}
                });

                $body = $(output, "> ModalBody")[0];
            });
            
            it("should contain a custom 'Words' element", () => {
                var Words = require("components/Blacklist/Words");
                var $words = $($body, "> BlacklistWords")[0];

                expect($words).to.have.property("_isReactElement", true);
                expect($words.type).to.eql(Words);
            });

            it("should pass 'this.props.blacklist' to the 'blacklist' attribute", () => {
                var $words = $($body, "> BlacklistWords")[0];

                expect($words.props).to.have.property("blacklist", blacklist);
            });
            
        });

        describe("footer", () => {
            var $footer, blacklist;
            
            beforeEach(() => {
                blacklist = {};
                var {output} = renderComponent(Module, {
                    showModal: false,
                    blacklist,
                    onHide: () => {}
                });

                $footer = $(output, "> ModalFooter")[0];
            });
            
            it("should contain a custom 'NewWord' element", () => {
                var NewWord = require("components/Blacklist/NewWord");
                var $newWord = $($footer, "> BlacklistNewWord")[0];

                expect($newWord).to.have.property("_isReactElement", true);
                expect($newWord.type).to.eql(NewWord);
            });

            it("should pass 'this.props.blacklist' to the 'blacklist' attribute", () => {
                var $newWord = $($footer, "> BlacklistNewWord")[0];

                expect($newWord.props).to.have.property("blacklist", blacklist);
            });
            
        });
        
    });
    
});
