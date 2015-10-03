import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Glyphicon } from "react-bootstrap";
import CONTROLS from "constants/Controls";
import WordInput from "./WordInput";

class Word extends Component {

    static displayName = "BlacklistWord"
    
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

    _focusInput = () => {
        // Find the input element within the DOM.
        var input = React.findDOMNode(this.refs.input).childNodes[0];

        // Focus on the input to alert the user.
        input.focus();
    }
    
    _onInputChange = (e) => {
        this.setState({
            word: e.target.value
        });
    }

    _onEditClick = () => {
        this.props.onEdit(() => {
            this._focusInput();
        });
    }
    
    _onRemoveClick = () => {
        var {blacklist, word} = this.props;
        
        blacklist.del(word);
    }

    _onSaveClick = () => {
        var {blacklist, word} = this.props;
        var newWord = this.state.word;
        
        if (blacklist.validate(word, newWord) == "success")
            return blacklist.update(word, newWord);

        this._focusInput();
    }

    _renderControls = () => {
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
                  onClick={handler}>
                    <Glyphicon glyph={icon} />
                </Button>
            );
        });
    }

    _renderContent = () => {
        var {mode, word, blacklist} = this.props;
        var {validate} = blacklist;
        
        return ((mode == "view") ?
            <strong>{word}</strong> :
            <WordInput
              type="text"
              ref="input"
              value={this.state.word}
              validate={validate.bind(blacklist, word)}
              onChange={this._onInputChange}
              onEnter={this._onSaveClick}
            />
        );
    }
    
    render() {
        var {mode} = this.props;
        
        return (
            <ListGroupItem className={`word clearfix ${mode}`}>
                <div className="controls">
                    {this._renderControls()}
                </div>
                <div className="content">
                    {this._renderContent()}
                </div>
            </ListGroupItem>
        );
    }
    
}     

export default Word;
