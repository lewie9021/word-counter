import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import BlacklistItems from "./Items";

// TODO: Retrieve items from props.
// TODO: Method for each section might be overkill?
// TODO: Remove Modal.x.
class BlacklistModal extends Component {

    
    header() {
        return (
            <Modal.Header closeButton>
                <Modal.Title>Blacklist Words</Modal.Title>
            </Modal.Header>
        );
    }

    body() {
        return (
            <Modal.Body>
                <BlacklistItems words={this.props.words}/>
            </Modal.Body>
        );
    }
    
    footer() {
        return (
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        );
    }
    
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.onHide}>
                {this.header()}
                {this.body()}
                {this.footer()}
            </Modal>
        );
    }
    
}     

export default BlacklistModal;
