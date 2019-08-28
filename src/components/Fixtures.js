import React from 'react';
import Request from 'superagent';
import FixtureTable from './FixureTable';

class Fixtures extends React.Component {
    state = {
        fixtures: [],
        odds: [],
    }

    componentDidMount() {

        const fromDate = new Date().toISOString().slice(0,10);
        const today = new Date();

        const toDateUnix  = today.getTime() + 604800000
        const toDate = new Date(toDateUnix).toISOString().slice(0, 10);

        const statsApiKey = '7af2d7e9641bd0322a09b5d94e4c03dd81da28e216f60929aa790d6236ed5e30';
        const fixtureRequest =
        `https://apiv2.apifootball.com/?action=get_predictions&from=${fromDate}&to=${toDate}&league_id=148&APIkey=${statsApiKey}`

        Request.get(fixtureRequest).then((response) =>{
            const fixtureArray = response.body;
            this.setState({
                fixtures: fixtureArray
            });
        });

        const oddsApiKey = '2c6b7d182fa278280c13e5e5a562ea1a';
        const oddsRequest = `https://api.the-odds-api.com/v3/odds/?apiKey=${oddsApiKey}&sport=soccer_epl&region=uk&mkt=h2h`;
        
        Request.get(oddsRequest).then((response) => {
            const oddsArray = response.body;
            this.setState({
                odds: oddsArray.data
            });
        })


    }


    render() {
        return (
            <div>
                <FixtureTable
                fixturesArray = {this.state.fixtures}
                oddsArray = {this.state.odds}
                />
            </div>
        )
    }
}

export default Fixtures;