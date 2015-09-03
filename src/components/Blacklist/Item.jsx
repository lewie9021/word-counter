import React, { PropTypes, Component } from "react";
import { ListGroupItem, Button, Glyphicon, Input } from "react-bootstrap";

const CONTROLS = {
    view: [
        {icon: "trash", style: "danger"},
        {icon: "pencil", style: "info"}
    ],
    edit: [
        {icon: "ok", style: "success"},
        {icon: "remove", style: "danger"}
    ]
};

class BlacklistItem extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            mode: (props.mode || "view")
        };
    }

    renderControls() {
        var {mode} = this.state;
        
        return CONTROLS[mode].map((control) => {
            return (
                <Button className="pull-right" bsStyle={control.style}>
                    <Glyphicon glyph={control.icon} />
                </Button>
            );
        });
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
        return (
            <ListGroupItem className="clearfix ${mode}">
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
