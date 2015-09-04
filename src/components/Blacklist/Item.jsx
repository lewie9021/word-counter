import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Glyphicon, Input } from "react-bootstrap";

// TODO: Enable validation similar to the NewItem component.
// Tip: When validating, we should allow saving the value that matches this.props.word.

const CONTROLS = {
    view: [
        {style: "danger", icon: "trash", method: "onRemoveClick"},
        {style: "info", icon: "pencil", method: "onEditClick"}
    ],
    edit: [
        {style: "danger", icon: "remove", method: "onCancelClick"},
        {style: "success", icon: "ok", method: "onSaveClick"}
    ]
};

class Item extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        validate: PropTypes.func.isRequired,
        word: PropTypes.string.isRequired,
        mode: PropTypes.string
    }
    
    constructor(props) {
        super(props);
        
        this.state = {
            mode: (props.mode || "view"),
            // Contains the inline edit value.
            word: props.word
        };
    }
    
    onRemoveClick() {
        var {blacklist, word} = this.props;
        
        blacklist.del(word);
    }

    onEditClick() {
        this.setState({
            mode: "edit"
        });
    }

    onCancelClick() {
        this.setState({
            mode: "view",
            word: this.props.word
        });
    }

    onSaveClick() {
        var {word, blacklist} = this.props;
        var newWord = this.state.word;
        
        blacklist.update(word, newWord);
    }

    onInputChange(e) {
        this.setState({
            word: e.target.value
        });
    }

    renderControls() {
        var controls = CONTROLS[this.state.mode];

        // Map over the controls of the given mode.
        return controls.map((control, index) => {
            var {style, icon, method} = control;
            
            return (
                <Button
                  key={index}
                  className="pull-right"
                  bsStyle={style}
                  onClick={this[method].bind(this)}>
                    <Glyphicon glyph={icon} />
                </Button>
            );
        });
    }

    renderContent() {
        var {mode, word} = this.state;
        
        return ((mode == "view") ?
            <strong>{this.props.word}</strong> :
            <Input
              type="text"
              value={word}
              onChange={this.onInputChange.bind(this)} />
        );
    }
    
    render() {
        var {mode} = this.state;
        
        return (
            <ListGroupItem className={`word clearfix ${mode}`}>
                <div className="controls">
                    {this.renderControls()}
                </div>
                <div className="content">
                    {this.renderContent()}
                </div>
            </ListGroupItem>
        );
    }
    
}     

export default Item;
