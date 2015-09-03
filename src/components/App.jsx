import React, { Component } from "react";
import { Navbar, Nav, NavItem, Grid, Row, Col } from "react-bootstrap";
import Parser from "../app/Parser";
import BlacklistModal from "./Blacklist/Modal"
import StatsBucket from "./StatsBucket";
import TextArea from "./TextArea";

class App extends Component {

    constructor(props) {
        super(props);
        
        this.parser = new Parser();
        this.state = this.parser.get();
    }
        
    onTextAreaChange() {
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
        var brand = <a href="#/">Word Counter</a>;
        var {details, wordDensity} = this.state;
        
        return (
            <div>
                <Navbar brand={brand} inverse>
                    <Nav right>
                        <NavItem onClick={this.onShowBlacklist.bind(this)}>Blacklisted Words</NavItem>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row>
                        <Col xs={12} md={8}>
                            <TextArea parser={this.parser} onChange={this.onTextAreaChange.bind(this)} />
                        </Col>
                        <Col xs={12} md={4}>
                            <StatsBucket title="Details" stats={details} />
                            {wordDensity.length ? <StatsBucket title="Word Density" stats={wordDensity} /> : null}
                        </Col>
                    </Row>
                </Grid>
                <BlacklistModal showModal={this.state.showModal} onHide={this.onHideBlacklist.bind(this)} />
            </div>
        );
    }
    
}     

export default App;
