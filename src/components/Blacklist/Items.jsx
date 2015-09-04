import React, { PropTypes, Component } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "react-bootstrap";
import Item from "./Item";

// TODO: Move this logic into Modal?

class BlacklistItems extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        validate: PropTypes.func.isRequired
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
            <ListGroup className="words">
                {items}
            </ListGroup>
        );
    }
    
}     

export default BlacklistItems;
