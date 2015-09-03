import React, { PropTypes, Component } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "react-bootstrap";
import BlacklistItem from "./Item";

class BlacklistItems extends Component {

    onAddWordClick() {
        var input = React.findDOMNode(this.refs.newWord).childNodes[0];

        this.props.blacklist.add(input.value);
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
                    <Input ref="newWord" type="text" />
                </div>
            </ListGroupItem>
        );
    }
    
    render() {
        var {blacklist} = this.props;
        var words = Object.keys(blacklist.get());
        var items = words.map((word) => {
            // TODO: these should be ordered alphabetically.
            // TODO: Use a value for the 'key' attribute. Unbelievable!
            return <BlacklistItem key={word} word={word} blacklist={blacklist} />;
        });
        
        return (
            <ListGroup className="blacklist">
                {items}
                {this.renderAddItem()}
            </ListGroup>
        );
    }
    
}     

export default BlacklistItems;
