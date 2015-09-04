import React, { PropTypes, Component } from "react";
import { ListGroup } from "react-bootstrap";
import Item from "./Item";

class Items extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        validate: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.props.blacklist.on("change", this.onCancel.bind(this));
        
        this.state = {
            // Word / key that's being edited.
            editing: null
        }
    }

    onEdit(word) {
        this.setState({
            editing: word
        });
    }

    onCancel() {
        this.setState({
            editing: null
        });
    }
    
    render() {
        var {blacklist, validate} = this.props;
        var words = Object.keys(blacklist.get());
        var items = words.map((word) => {
            var mode = ((word == this.state.editing) ? "edit" : "view");
            // TODO: These should be ordered alphabetically.
            // TODO: Use a better value for the 'key' attribute. Unbelievable!
            return (
                <Item
                  key={word}
                  word={word}
                  mode={mode}
                  blacklist={blacklist}
                  validate={validate}
                  onEdit={this.onEdit.bind(this, word)}
                  onCancel={this.onCancel.bind(this)}
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
