import React from 'react';
import photo from '../../images/noFixtures.jpeg'
import './NoFixtures.css';

class NoFixtures extends React.Component {
    render() {
        return (
            <div className="no-fixture-container">
                <div>
                    <img src={photo} style={{width: "-webkit-fill-available"}} />
                </div>
                <div className="no-fixture-content">
                    Seems there are no fixtures this gameweek, bugger.
                </div>
            </div>
        )
    }
}

export default NoFixtures;
