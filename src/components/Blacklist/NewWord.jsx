import React, { PropTypes, Component } from "react";
import { Button } from "react-bootstrap";
import WordInput from "./WordInput";

// TODO: Fix tab indexing.

class NewWord extends Component {

    static displayName = "BlacklistNewWord"
    
    static propTypes = {
        blacklist: PropTypes.object.isRequired
    }
    
    constructor(props) {
        super(props);

        this.state = {
            word: "",
            inputStyle: null
        };
    }
    
    _onAddClick = () => {
        var {blacklist} = this.props;
        var input = this.state.word;
        
        if (blacklist.validate(null, input) != "success") {
            // Find the input element within the DOM.
            let element = React.findDOMNode(this.refs.input).childNodes[0];

            // Focus on the input to alert the user.
            return element.focus();
        }

        // Reset the input.
        this.setState({
            word: ""
        });

        // Add the new word to the blacklist.
        blacklist.add(input);
    }

    _onInputChange = (e) => {
        this.setState({
            word: e.target.value
        });
    }
    
    render() {
        var {blacklist} = this.props;
        var {validate} = blacklist;
        
        return (
            <div className="word clearfix create">
                <div className="controls">
                    <Button
                      className="pull-right"
                      bsStyle="success"
                      onClick={this._onAddClick}>
                        Add Word
                    </Button>
                </div>
                <div className="content">
                    <WordInput
                      ref="input"
                      type="text"
                      value={this.state.word}
                      validate={validate.bind(blacklist, null)}
                      onChange={this._onInputChange}
                      onEnter={this._onAddClick}
                    />
                </div>
            </div>
        );
    }
    
}

export default NewWord;

