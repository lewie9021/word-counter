import React from "react";
import { Navbar, Grid, Row, Col, Panel, ListGroup, ListGroupItem, Badge } from "react-bootstrap";

class App extends React.Component {

    renderTextarea() {
        return (
            <Col xs={12} md={8} mdOffset={2}>
                <textarea className="form-control" rows="10" placeholder="Enter text here..."></textarea>
            </Col>
        );
    }
    
    renderBuckets() {
        var buckets = [];
        
        for (let i = 1; i <= 3; i ++) {
            buckets.push(
                <Col xs={12} md={4}>
                    <Panel header={"Bucket " + i} bsStyle='info'>
                        <ListGroup fill>
                            <ListGroupItem>
                                <span>Item 1</span>
                                <Badge pullRight={true}>12</Badge>
                            </ListGroupItem>
                            <ListGroupItem>
                                <span>Item 2</span>
                                <Badge pullRight={true}>4</Badge>
                            </ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Col>
            );
        }
        
        return buckets;
    };
    
    render() {
        var brandLink = <a href="#/">Word Counter</a>;
        var textarea = this.renderTextarea();
        var buckets = this.renderBuckets();
        
        return (
            <div>
                <Navbar brand={brandLink} inverse />
                <Grid>
                    <Row>{textarea}</Row>
                    <Row>{buckets}</Row>
                </Grid>
            </div>
        );
    }
    
}     

export default App;
