import React, { Component } from "react";
import { Navbar, Nav, Button, Grid, Row, Col } from "react-bootstrap";
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

    _onTextAreaChange = (e) => {
        this.parser.process(e.target.value);

        // Update state to trigger a re-render.
        this.setState(this.parser.get());
    }

    _onShowBlacklist = (e) => {
        this.setState({
            showModal: true
        });
    }

    _onHideBlacklist = () => {
        this.setState({
            showModal: false
        });
    }

    render() {
        var {details, wordDensity} = this.state;
        var brand = <a href="#/">Word Counter</a>;
        var blacklist = this.blacklist.get();

        // Filter out words that have been blacklisted.
        wordDensity = wordDensity.filter((word) => {
            return !(word.name in blacklist);
        });

        return (
            <div>
                <Navbar brand={brand} inverse>
                    <Button
                      className="pull-right"
                      bsStyle="info"
                      onClick={this._onShowBlacklist}>
                        Blacklisted Words
                    </Button>
                </Navbar>
                <Grid>
                    <Row>
                        <Col xs={12} md={8}>
                            <textarea
                              className="form-control"
                              rows="10"
                              placeholder="Enter text here..."
                              onChange={this._onTextAreaChange} />
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
                  onHide={this._onHideBlacklist}
                  blacklist={this.blacklist}
                />
            </div>
        );
    }
    
}

export default App;
