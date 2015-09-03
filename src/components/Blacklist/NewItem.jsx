import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Input } from "react-bootstrap";

// TODO: Store the input value within state to prevent the value from clearing when a re-render happens.

class NewItem extends Component {

    // TODO: Define PropTypes.
    
    constructor(props) {
        super(props);

        this.state = {
            inputStyle: null
        };
    }
    
    onAddClick() {
        var input = this.refs.newWord.getValue();

        if (this.props.validate(input) == "error")
            return this.setState({
                inputStyle: "error"
            });
        
        this.props.blacklist.add(input);
    }

    onInputChange(e) {
        this.setState({
            inputStyle: this.props.validate(e.target.value)
        })
    }

    onInputBlur(e) {
        if (!e.target.length)
            this.setState({
                inputStyle: null
            });
    }
    
    render() {
        return (
            <ListGroupItem className="clearfix create">
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
            </ListGroupItem>
        );
    }
    
}

export default NewItem;

