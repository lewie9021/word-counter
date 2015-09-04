import React, { PropTypes, Component } from "react";
import { ListGroup } from "react-bootstrap";
import Item from "./Item";

// TODO: Enforce only one item to be edited at once.
// Hint: make use of the mode property to control this. 

class Items extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        validate: PropTypes.func.isRequired
    }

    render() {
        var {blacklist, validate} = this.props;
        var words = Object.keys(blacklist.get());
        var items = words.map((word) => {
            // TODO: these should be ordered alphabetically.
            // TODO: Use a better value for the 'key' attribute. Unbelievable!
            return (
                <Item
                  key={word}
                  word={word}
                  blacklist={blacklist}
                  validate={validate}
                />);
        });
        
        return (
            <ListGroup className="words">
                {items}
            </ListGroup>
        );
    }
    
}     

export default Items;
