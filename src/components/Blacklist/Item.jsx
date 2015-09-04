import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Glyphicon } from "react-bootstrap";
import Input from "./Input";

// TODO: Enable validation similar to the NewItem component.
// Tip: When validating, we should allow saving the value that matches this.props.word.

const CONTROLS = {
    view: [
        {style: "danger", icon: "trash", method: "onRemoveClick"},
        {style: "info", icon: "pencil", method: "onEdit"}
    ],
    edit: [
        {style: "danger", icon: "remove", method: "onCancel"},
        {style: "success", icon: "ok", method: "onSaveClick"}
    ]
};

class Item extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        validate: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        word: PropTypes.string.isRequired,
        mode: PropTypes.string
    }
    
    constructor(props) {
        super(props);

        this.state = {
            // Contains the inline edit value.
            word: props.word
        };
    }

    componentWillReceiveProps(props) {
        var {mode, word} = props;
        
        this.setState({mode, word});
    }

    onInputChange(e) {
        this.setState({
            word: e.target.value
        });
    }

    onRemoveClick() {
        var {blacklist, word} = this.props;
        
        blacklist.del(word);
    }

    onSaveClick() {
        var {blacklist, word} = this.props;
        var newWord = this.state.word;

        blacklist.update(word, newWord);
    }

    renderControls() {
        var controls = CONTROLS[this.props.mode];

        // Map over the controls of the given mode.
        return controls.map((control, index) => {
            var {style, icon, method} = control;
            var handler = (this[method] || this.props[method]);
            
            return (
                <Button
                  key={index}
                  className="pull-right"
                  bsStyle={style}
                  onClick={handler.bind(this)}>
                    <Glyphicon glyph={icon} />
                </Button>
            );
        });
    }

    renderContent() {
        var {mode, word, validate} = this.props;
        
        return ((mode == "view") ?
            <strong>{word}</strong> :
            <Input
              type="text"
              value={this.state.word}
              validate={validate}
              onChange={this.onInputChange.bind(this)}
            />
        );
    }
    
    render() {
        var {mode} = this.props;
        
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
