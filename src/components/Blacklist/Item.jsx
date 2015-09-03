import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Glyphicon, Input } from "react-bootstrap";

class BlacklistItem extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            mode: (props.mode || "view"),
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
        })
    }

    renderControls() {
        var {mode} = this.state;

        switch(mode) {
            case "view":
                return [
                    <Button
                      className="pull-right"
                      bsStyle="danger"
                      onClick={this.onRemoveClick.bind(this)}>
                        <Glyphicon glyph="trash" />
                    </Button>,
                    <Button
                      className="pull-right"
                      bsStyle="info"
                      onClick={this.onEditClick.bind(this)}>
                        <Glyphicon glyph="pencil" />
                    </Button>
                ];
            case "edit":
                return [
                    <Button
                      className="pull-right"
                      bsStyle="danger"
                      onClick={this.onCancelClick.bind(this)}>
                        <Glyphicon glyph="remove" />
                    </Button>,
                    <Button
                      className="pull-right"
                      bsStyle="success"
                      onClick={this.onSaveClick.bind(this)}>
                        <Glyphicon glyph="ok" />
                    </Button>
                ];
        }
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
            <ListGroupItem className={`clearfix ${mode}`}>
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

export default BlacklistItem;
