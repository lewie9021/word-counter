import React, { Component } from "react";
import { Navbar, Nav, Button, Grid, Row, Col } from "react-bootstrap";
import Parser from "app/parser";
import Blacklist from "app/Blacklist";
import BlacklistModal from "./Blacklist/Modal"
import StatsBucket from "./StatsBucket";
import PARSER_DETAILS from "constants/ParserDetails";

class App extends Component {

    static displayName = "App"
    
    constructor(props) {
        super(props);

        // Instantiate a Blacklist to maintain words we don't want to see in the word density bucket.
        this.blacklist = new Blacklist();
        
        // When words are added, modified, or removed, we must re-render.
        this.blacklist.on("change", () => {
            this.forceUpdate();
        });
        
        this.state = {
            ...Parser(props.input || ""),
            showModal: false
        };
    }

    _onTextAreaChange = (e) => {
        var stats = Parser(e.target.value);
        
        // Update state to trigger a re-render.
        this.setState(stats);
    }

    _onShowBlacklist = () => {
        this.setState({
            showModal: true
        });
    }

    _onHideBlacklist = () => {
        this.setState({
            showModal: false
        });
    }

    _mapStats = (stats, source = stats) => {
        var keys = Object.keys(stats);

        return keys.reduce((array, key, index) => {
            array.push({
                key: index,
                name: source[key],
                value: stats[key]
            });

            return array;
        }, []);
    }

    render() {
        var brand = <a href="#/">Word Counter</a>;
        var blacklist = this.blacklist.get();
        var details = this._mapStats(this.state.details, PARSER_DETAILS);
        var wordDensity = this.state.wordDensity.map((word, index) => {
            return {key: index, ...word};
        });

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
                              rows={12}
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
