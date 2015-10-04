import React, { PropTypes, Component } from "react";
import { Panel, ListGroup, ListGroupItem, Badge } from "react-bootstrap";

class StatsBucket extends Component {

    static displayName = "StatsBucket"
    
    static propTypes = {
        title: PropTypes.string.isRequired,
        stats: PropTypes.array.isRequired
    }
    
    _renderStats = (stats) => {
        if (!Array.isArray(stats))
            throw new Error("You must provide an array of stats");
        
        // Map over each stat object and return a list item element.
        // Note: We use a 'key' property to help React identify a stat easier during reconciliation.
        return stats.map((stat) => {
            var {key, name, value} = stat;
            
            return (
                <ListGroupItem key={key}>
                    <Badge pullRight={true}>{value}</Badge>
                    <div className="name">{name}</div>
                </ListGroupItem>
            );
        });
    }
    
    render() {
        var {title, stats} = this.props;
        
        return (
            <Panel header={title} bsStyle="info">
                <ListGroup fill>
                    {this._renderStats(stats)}
                </ListGroup>
            </Panel>
        );
    }
    
}

export default StatsBucket;
