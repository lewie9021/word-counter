import React, { PropTypes, Component } from "react";
import { ListGroup } from "react-bootstrap";
import Word from "./Word";

class Words extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        props.blacklist.on("change", this._onCancel);
        
        this.state = {
            // Contains the word that's being edited.
            editing: null
        }
    }

    _onEdit = (word, callback) => {
        this.setState({
            editing: word
        }, callback);
    }

    _onCancel = () => {
        this.setState({
            editing: null
        });
    }

    _renderWords = () => {
        var {blacklist} = this.props;
        var words = Object.keys(blacklist.get()).sort();

        return words.map((word, index) => {
            var mode = ((word == this.state.editing) ? "edit" : "view");
            
            return (
                <Word
                  key={index}
                  word={word}
                  mode={mode}
                  blacklist={blacklist}
                  onEdit={this._onEdit.bind(this, word)}
                  onCancel={this._onCancel}
                />
            );
        });
    }
    
    render() {
        return (
            <ListGroup className="words">
                {this._renderWords()}
            </ListGroup>
        );
    }
    
}
export default Words;
