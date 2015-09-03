import React, { PropTypes, Component } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "react-bootstrap";
import BlacklistItem from "./Item";

class BlacklistItems extends Component {

    onAddWordClick() {
        console.log("onAddWordClick");
    }
    
    renderAddItem() {
        return (
            <ListGroupItem className="clearfix create">
                <div className="controls">
                    <Button
                      className="pull-right"
                      bsStyle="success"
                      onClick={this.onAddWordClick.bind(this)}>
                        Add Word
                    </Button>
                </div>
                <div className="content">
                    <Input type="text" />
                </div>
            </ListGroupItem>
        );
    }
    
    render() {
        var items = this.props.words.map((word) => {
            return <BlacklistItem word={word} />;
        });
        
        return (
            <ListGroup className="blacklist">
                {items}
                <BlacklistItem mode="edit" word="that"/>
                {this.renderAddItem()}
            </ListGroup>
        );
    }
    
}     

export default BlacklistItems;
