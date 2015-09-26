import React, { PropTypes, Component } from "react";
import { ListGroup } from "react-bootstrap";
import Word from "./Word";

class Words extends Component {

    static displayName = "BlacklistWords"

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            // Contains the word that's being edited.
            editing: null
        }
    }

    componentWillMount = () => {
        this.props.blacklist.on("change", this._onCancel);
    }

    componentWillUnmount = () => {
        this.props.blacklist.off("change", this._onCancel);
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

    _renderWords = (blacklist, editing) => {
        var words = Object.keys(blacklist.get()).sort();

        return words.map((word, index) => {
            var mode = ((word == editing) ? "edit" : "view");
            
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
        var {blacklist} = this.props;
        var {editing} = this.state;
        
        return (
            <ListGroup className="words">
                {this._renderWords(blacklist, editing)}
            </ListGroup>
        );
    }
    
}
export default Words;
