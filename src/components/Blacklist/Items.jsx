import React, { PropTypes, Component } from "react";
import { ListGroup, ListGroupItem, Button, Glyphicon, Input } from "react-bootstrap";

// TODO: Create a list item that can handle inline editing.
class BlacklistItems extends Component {
    
    renderItem(name) {
        return (
            <ListGroupItem className="clearfix">
                <div className="controls">
                    <Button className="pull-right" bsStyle="danger">
                        <Glyphicon glyph="trash" />
                    </Button>
                    <Button className="pull-right" bsStyle="info">
                        <Glyphicon glyph="pencil" />
                    </Button>
                </div>
                <div className="content">
                    <strong>{name}</strong>
                </div>
            </ListGroupItem>
        );
    }

    renderEditItem() {
        return (
            <ListGroupItem className="clearfix edit">
                <div className="controls">
                    <Button className="pull-right" bsStyle="success">
                        <Glyphicon glyph="ok" />
                    </Button>
                    <Button className="pull-right" bsStyle="danger">
                        <Glyphicon glyph="remove" />
                    </Button>
                </div>
                <div className="content">
                    <Input type="text" value="that" />
                </div>
            </ListGroupItem>
        );
    }

    renderAddItem() {
        return (
            <ListGroupItem className="clearfix create">
                <div className="controls">
                    <Button className="pull-right" bsStyle="success">
                        Add Word
                    </Button>
                </div>
                <div className="content">
                    <Input type="text" />
                </div>
            </ListGroupItem>
        );
    }
    
    render() {
        var items = this.props.items.map((name) => {
            return this.renderItem(name);
        });
        
        return (
            <ListGroup className="blacklist">
                {items}
                {this.renderEditItem()}
                {this.renderAddItem()}
            </ListGroup>
        );
    }
    
}     

export default BlacklistItems;
