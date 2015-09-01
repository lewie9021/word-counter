import React, { PropTypes, Component } from "react";

class TextArea extends Component {
    
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        parser: PropTypes.object.isRequired
    }

    onChange(e) {
        var {parser, onChange} = this.props;

        parser.process(e.target.value);
        onChange();
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
