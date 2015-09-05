import React, { Component } from "react";
import { Navbar, Nav, NavItem, Grid, Row, Col } from "react-bootstrap";
import Parser from "../app/Parser";
import Blacklist from "../app/Blacklist";
import BlacklistModal from "./Blacklist/Modal"
import StatsBucket from "./StatsBucket";

class App extends Component {

    constructor(props) {
        super(props);

        // Instantiate a Blacklist to maintain words we don't want to see in the word density bucket.
        this.blacklist = new Blacklist();
        
        // Create an instance of Parser to deal with input changes from the TextArea component.
        this.parser = new Parser();

        // When words are added, modified, or removed, we must re-render.
        this.blacklist.on("change", () => {
            this.forceUpdate();
        });
        
        this.state = {
            // Provides the properties 'details' and 'wordDensity'.
            ...this.parser.get(),
            showModal: false
        };
    }

    onTextAreaChange(e) {
        this.parser.process(e.target.value);

        // Update state to trigger a re-render.
        this.setState(this.parser.get());
    }

    onShowBlacklist(e) {
        this.setState({
            showModal: true
        });
    }

    onHideBlacklist() {
        this.setState({
            showModal: false
        });
    }

    render() {
        var {details} = this.state;
        var brand = <a href="#/">Word Counter</a>;
        var blacklist = this.blacklist.get();
        // Filter out words that have been blacklisted.
        var wordDensity = this.state.wordDensity.filter((word) => {
            return !(word.name in blacklist);
        });

        return (
            <div>
                <Navbar brand={brand} inverse>
                    <Nav right>
                        <NavItem onClick={this.onShowBlacklist.bind(this)}>
                            Blacklisted Words
                        </NavItem>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row>
                        <Col xs={12} md={8}>
                            <textarea
                              className="form-control"
                              rows="10"
                              placeholder="Enter text here..."
                              onChange={this.onTextAreaChange.bind(this)} />
                        </Col>
                        <Col xs={12} md={4}>
                            <StatsBucket title="Details" stats={details} />
                            {/* Only show the word density bucket when there are words to show. */}
                            {wordDensity.length ? <StatsBucket title="Word Density" stats={wordDensity} /> : null}
                        </Col>
                    </Row>
                </Grid>
                <BlacklistModal
                  showModal={this.state.showModal}
                  onHide={this.onHideBlacklist.bind(this)}
                  blacklist={this.blacklist}
                />
            </div>
        );
    }
    
}     

export default App;
