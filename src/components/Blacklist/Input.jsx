import React, { PropTypes, Component } from "react";
import { Input } from "react-bootstrap";

class WordInput extends Component {

    static PropTypes = {
        value: PropTypes.string.isRequired,
        validate: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onEnter: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            style: null
        };
    }

    _onChange = (e) => {
        var input = e.target.value;
        var {validate, onChange} = this.props;

        this.setState({
            style: (input.length ? validate(input) : null)
        });

        // Apparently this doesn't work. 'arguments' isn't the value you would expect.
        // onChange.apply(null, arguments);
        
        onChange(e);
    }

    _onFocus = () => {
        var {value, validate} = this.props;
        
        this.setState({
            style: (value.length ? validate(value) : null)
        });
    }
    
    _onBlur = () => {
        this.setState({
            style: null
        });
    }

    _onKeyUp = (e) => {
        if (e.which != 13)
            return;
        
        this.props.onEnter.apply(null, arguments);
    }

    render() {
        return (
            <Input
              type="text"
              bsStyle={this.state.style}
              value={this.props.value}
              onChange={this._onChange}
              onFocus={this._onFocus}
              onBlur={this._onBlur}
              onKeyUp={this._onKeyUp}
              hasFeedback
            />
        );
    }
    
}

export default WordInput;
