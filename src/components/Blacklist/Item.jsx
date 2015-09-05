import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Glyphicon } from "react-bootstrap";
import Input from "./Input";

const CONTROLS = {
    view: [
        {style: "danger", icon: "trash", method: "onRemoveClick"},
        {style: "info", icon: "pencil", method: "onEditClick"}
    ],
    edit: [
        {style: "danger", icon: "remove", method: "onCancel"},
        {style: "success", icon: "ok", method: "onSaveClick"}
    ]
};

class Item extends Component {

    static propTypes = {
        blacklist: PropTypes.object.isRequired,
        onEdit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        word: PropTypes.string.isRequired,
        mode: PropTypes.string.isRequired
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

    focusInput() {
        // Find the input element within the DOM.
        var input = React.findDOMNode(this.refs.input).childNodes[0];

        // Focus on the input to alert the user.
        input.focus();
    }
    
    onInputChange(e) {
        this.setState({
            word: e.target.value
        });
    }

    onEditClick() {
        this.props.onEdit(() => {
            this.focusInput();
        });
    }
    
    onRemoveClick() {
        var {blacklist, word} = this.props;
        
        blacklist.del(word);
    }

    onSaveClick() {
        var {blacklist, word} = this.props;
        var newWord = this.state.word;
        
        if (blacklist.validate(word, newWord) == "success")
            return blacklist.update(word, newWord);

        this.focusInput();
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
        var {mode, word, blacklist} = this.props;
        var {validate} = blacklist;
        
        return ((mode == "view") ?
            <strong>{word}</strong> :
            <Input
              type="text"
              ref="input"
              value={this.state.word}
              validate={validate.bind(blacklist, word)}
              onChange={this.onInputChange.bind(this)}
              onEnter={this.onSaveClick.bind(this)}
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
