import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Input } from "react-bootstrap";

// TODO: Store the input value within state to prevent the value from clearing when a re-render happens.
// TODO: When enter is clicked, the onAddClick method is triggered.
// TODO: Fix tab indexing.

class NewItem extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        validate: PropTypes.func.isRequired
    }
    
    constructor(props) {
        super(props);

        this.state = {
            inputStyle: null
        };
    }
    
    onAddClick() {
        // TODO: Clear value if valid.
        var input = this.refs.newWord.getValue();
        var validateStyle = this.props.validate(input);

        // Ensure the input is valid before attempting to add it.
        if (validateStyle == "success")
            return this.props.blacklist.add(input);

        this.setState({
            inputStyle: validateStyle
        });
    }

    onInputChange(e) {
        this.setState({
            inputStyle: this.props.validate(e.target.value)
        });
    }

    onInputBlur(e) {
        // If the user clicks off the input as it's empty, clear the validation styling.
        if (!e.target.length)
            this.setState({
                inputStyle: null
            });
    }
    
    render() {
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
                      bsStyle={this.state.inputStyle}
                      onChange={this.onInputChange.bind(this)}
                      onBlur={this.onInputBlur.bind(this)}
                      hasFeedback
                    />
                </div>
            </div>
        );
    }
    
}

export default NewItem;

