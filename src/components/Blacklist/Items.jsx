import React, { PropTypes, Component } from "react";
import { ListGroup } from "react-bootstrap";
import Item from "./Item";

class Items extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        props.blacklist.on("change", this.onCancel.bind(this));
        
        this.state = {
            // Contains the word that's being edited.
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

    renderItems() {
        var {blacklist} = this.props;
        var words = Object.keys(blacklist.get()).sort();

        return words.map((word, index) => {
            var mode = ((word == this.state.editing) ? "edit" : "view");
            
            return (
                <Item
                  key={index}
                  word={word}
                  mode={mode}
                  blacklist={blacklist}
                  onEdit={this.onEdit.bind(this, word)}
                  onCancel={this.onCancel.bind(this)}
                />
            );
        });
    }
    
    render() {
        return (
            <ListGroup className="words">
                {this.renderItems()}
            </ListGroup>
        );
    }
    
}
export default Items;
