import React, { PropTypes, Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Words from "./Words";
import NewWord from "./NewWord";

class BlacklistModal extends Component {

    static propTypes = {
        showModal: PropTypes.bool.isRequired,
        blacklist: PropTypes.object.isRequired,
        onHide: PropTypes.func.isRequired
    }
    
    render() {
        var {Header, Title, Body, Footer} = Modal;
        var {showModal, onHide, blacklist} = this.props;
        
        return (
            <Modal className="blacklist" show={showModal} onHide={onHide}>
                <Header className="clearfix">
                    <Button className="pull-right" bsSize="small" onClick={onHide}>
                        Close
                    </Button>
                    <Title>Blacklist Words</Title>
                </Header>
                <Body>
                    <Words blacklist={blacklist} />
                </Body>
                <Footer>
                    <NewWord blacklist={blacklist} />
                </Footer>
            </Modal>
        );
    }
    
}     

export default BlacklistModal;
