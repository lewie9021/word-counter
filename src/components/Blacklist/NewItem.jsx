import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Input } from "react-bootstrap";

// TODO: Fix tab indexing.

class NewItem extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        validate: PropTypes.func.isRequired
    }
    
    constructor(props) {
        super(props);

        this.state = {
            word: "",
            inputStyle: null
        };
    }
    
    onAddClick() {
        var {validate, blacklist} = this.props;
        var input = this.state.word;
        var inputStyle = validate(input);

        if (inputStyle != "success")
            return this.setState({inputStyle});

        // Reset the input.
        this.setState({
            word: "",
            inputStyle: null
        });

        // Add the new word to the blacklist.
        return blacklist.add(input);
    }

    onInputChange(e) {
        var input = e.target.value;
        var {validate} = this.props;
        
        this.setState({
            word: input,
            inputStyle: (input.length ? validate(input) : null)
        });
    }

    onInputFocus() {
        var {word} = this.state;
        var {validate} = this.props;
        
        this.setState({
            inputStyle: (word.length ? validate(word) : null)
        });
    }
    
    onInputBlur(e) {
        this.setState({
            inputStyle: null
        });
    }

    onKeyUp(e) {
        if (e.which == 13)
            this.onAddClick();
    }
    
    render() {
        var {word, inputStyle} = this.state;

        return (
            <div className="word clearfix create">
                <div className="controls">
                    <Button
                      className="pull-right"
                      bsStyle="success"
                      onClick={this.onAddClick.bind(this)}>
                        Add Word
                    </Button>
                </div>
                <div className="content">
                    <Input
                      ref="newWord"
                      type="text"
                      value={word}
                      bsStyle={inputStyle}
                      onChange={this.onInputChange.bind(this)}
                      onFocus={this.onInputFocus.bind(this)}
                      onBlur={this.onInputBlur.bind(this)}
                      onKeyUp={this.onKeyUp.bind(this)}
                      hasFeedback
                    />
                </div>
            </div>
        );
    }
    
}

export default NewItem;

