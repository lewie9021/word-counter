import React, { PropTypes, Component } from "react";
import { Panel, ListGroup, ListGroupItem, Badge } from "react-bootstrap";

class StatsBucket extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        stats: PropTypes.array.isRequired
    };
    
    renderStats() {
        return this.props.stats.map(stat => {
            return (
                <ListGroupItem>
                    <span>{stat.name}</span>
                    <Badge pullRight={true}>{stat.value}</Badge>
                </ListGroupItem>
            );
        });
    };
    
    render() {
        var stats = this.renderStats();
        
        return (
            <Panel header={this.props.title} bsStyle="info">
                <ListGroup fill>{stats}</ListGroup>
            </Panel>
        );
    }
    
}     

export default StatsBucket;
