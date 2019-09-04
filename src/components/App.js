import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Fixtures from './fixtures/Fixtures';
import Nav from './navbar/Nav';




class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={Fixtures} />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;
