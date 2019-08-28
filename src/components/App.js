import React from 'react';
import Stats from './Stats';
import Odds from './Odds';
import Results from './Results';
import Fixtures from './Fixtures';

class App extends React.Component {
    render() {
        return (
            <div>
                This is my app
                <div>
                    <Fixtures />
                </div>
            </div>
        )
    }
}

export default App;
