import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import PremData from './PremData';
import Nav from './navbar/Nav';
import LeagueOneData from './LeagueOneData';
import LeagueTwoData from './LeagueTwoData';
import ChampionshipData from './ChampionshipData';
import HomePage from './HomePage';




class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/prem" exact component={PremData} />
                        <Route path="/championship" exact component={ChampionshipData} />
                        <Route path="/one" exact component={LeagueOneData} />
                        <Route path="/two" exact component={LeagueTwoData} />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;
