import React from 'react'
import './key.css';

class Key extends React.Component {
    render() {
        return (
            <div className="ui grid">
            <div className="six column row" style={{textTransform: "capitalize"}}>
                <div className="column">low value<i class="square full icon value-low"></i></div>
                <div className="column">medium value<i class="square full icon value-med"></i></div>
                <div className="column">high value<i class="square full icon value-high"></i></div>
                <div className="column">poor value<i class="square full icon lay-low"></i></div>
                <div className="column">really poor value<i class="square full icon lay-med"></i></div>
                <div className="column">lay bet value<i class="square full icon lay-high"></i></div>
            </div>
            </div>
        )
    }
}

export default Key