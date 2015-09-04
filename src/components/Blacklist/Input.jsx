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

    onChange(e) {
        var input = e.target.value;
        var {validate, onChange} = this.props;

        this.setState({
            style: (input.length ? validate(input) : null)
        });

        onChange.apply(null, arguments);
    }

    onFocus() {
        var {value, validate} = this.props;
        
        this.setState({
            style: (value.length ? validate(value) : null)
        });
    }
    
    onBlur() {
        this.setState({
            style: null
        });
    }

    onKeyUp(e) {
        if (e.which != 13)
            return;
        
        this.props.onEnter.apply(null, arguments);
        this.setState({
            style: null
        });
    }

    render() {
        return (
            <Input
              type="text"
              bsStyle={this.state.style}
              value={this.props.value}
              onChange={this.onChange.bind(this)}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onKeyUp={this.onKeyUp.bind(this)}
              hasFeedback
            />
        );
    }
    
}

export default WordInput;
