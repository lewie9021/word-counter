import React, { PropTypes, Component } from "react";
import { Panel, ListGroup, ListGroupItem, Badge } from "react-bootstrap";

class StatsBucket extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        stats: PropTypes.array.isRequired
    }
    
    _renderStats = () => {
        // Map over each stat object and return a list item element.
        // Note: We use a 'key' property to help React identify a stat easier during reconciliation.
        // TODO: This is currently problematic as the order of the array is ultimately a result of Object.keys().
        return this.props.stats.map((stat, index) => {
            return (
                <ListGroupItem key={index}>
                    <span>{stat.name}</span>
                    <Badge pullRight={true}>{stat.value}</Badge>
                </ListGroupItem>
            );
        });
    }
    
    render() {
        return (
            <Panel header={this.props.title} bsStyle="info">
                <ListGroup fill>
                    {this._renderStats()}
                </ListGroup>
            </Panel>
        );
    }
    
}     

export default StatsBucket;
