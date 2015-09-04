import React, { PropTypes, Component } from "react";

class TextArea extends Component {
    
    static propTypes = {
        onChange: PropTypes.func.isRequired
    }

    onChange(e) {
        // Inform the App component about the change.
        this.props.onChange(e.target.value);
    }
    
    render() {
        return (
            <textarea
                className="form-control"
                rows="10"
                placeholder="Enter text here..."
                onChange={this.onChange.bind(this)} />
        );
    }
    
}     

export default TextArea;
