import React, { PropTypes, Component } from "react";
import { Panel, ListGroup, ListGroupItem, Badge } from "react-bootstrap";

class StatsBucket extends Component {

    static displayName = "StatsBucket"
    
    static propTypes = {
        title: PropTypes.string.isRequired,
        stats: PropTypes.array.isRequired
    }
    
    _renderStats = () => {
        // Map over each stat object and return a list item element.
        // Note: We use a 'key' property to help React identify a stat easier during reconciliation.
        return this.props.stats.map((stat) => {
            var {key, name, value} = stat;
            
            return (
                <ListGroupItem key={key}>
                    <span>{name}</span>
                    <Badge pullRight={true}>{value}</Badge>
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
