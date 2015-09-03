import React, { PropTypes, Component } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "react-bootstrap";
import Item from "./Item";
import NewItem from "./NewItem";

class BlacklistItems extends Component {

    // TODO: Define PropTypes.

    validate(input) {
        var blacklist = this.props.blacklist.get();

        if (!input.length || input in blacklist)
            return "error";
        
        return "success"
    }
    
    render() {
        var {blacklist} = this.props;
        var words = Object.keys(blacklist.get());
        var items = words.map((word) => {
            // TODO: these should be ordered alphabetically.
            // TODO: Use a value for the 'key' attribute. Unbelievable!
            return <Item key={word} word={word} blacklist={blacklist} />;
        });
        
        return (
            <ListGroup className="blacklist">
                {items}
                <NewItem blacklist={blacklist} validate={this.validate.bind(this)} />
            </ListGroup>
        );
    }
    
}     

export default BlacklistItems;
