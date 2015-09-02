import React, { Component } from "react";
import { Navbar, Grid, Row, Col } from "react-bootstrap";
import StatsBucket from "./StatsBucket";
import TextArea from "./TextArea";
import Parser from "../app/Parser";

class App extends Component {

    constructor(props) {
        super(props);
        
        this.parser = new Parser();
        this.state = this.parser.get();
    }
        
    onTextAreaChange() {
        this.setState(this.parser.get());
    }

    render() {
        var brand = <a href="#/">Word Counter</a>;
        var {details, wordDensity} = this.state;
        
        return (
            <div>
                <Navbar brand={brand} inverse />
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
            </div>
        );
    }
    
}     

export default App;
