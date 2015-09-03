import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Glyphicon, Input } from "react-bootstrap";

class BlacklistItem extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            mode: (props.mode || "view")
        };
    }
    
    onRemoveClick() {
        console.log("onRemoveClick");
    }

    onEditClick() {
        console.log("onEditClick");
    }

    onCancelClick() {
        console.log("onCancelClick");   
    }

    onSaveClick() {
        console.log("onSaveClick");
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
        var {word} = this.props;
        var {mode} = this.state;
        
        return ((mode == "view") ?
            <strong>{word}</strong> :
            <Input type="text" value={word} />
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
