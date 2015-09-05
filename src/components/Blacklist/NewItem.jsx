import React, { PropTypes, Component } from "react";
import { Button } from "react-bootstrap";
import Input from "./Input";

// TODO: Fix tab indexing.

class NewItem extends Component {

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
    
    onAddClick() {
        var {validate, blacklist} = this.props;
        var input = this.state.word;

        if (validate(input) != "success") {
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

    onInputChange(e) {
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
                      onClick={this.onAddClick.bind(this)}>
                        Add Word
                    </Button>
                </div>
                <div className="content">
                    <Input
                      ref="input"
                      type="text"
                      value={this.state.word}
                      validate={validate.bind(blacklist, null)}
                      onChange={this.onInputChange.bind(this)}
                      onEnter={this.onAddClick.bind(this)}
                    />
                </div>
            </div>
        );
    }
    
}

export default NewItem;

