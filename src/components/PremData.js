import React from 'react';
import Request from 'superagent';
import FixtureTable from './fixtures/FixureTable';

class PremData extends React.Component {
    state = {
        fixtures: [],
        odds: [],
    }

    componentDidMount() {

        const fromDate = new Date().toISOString().slice(0,10);
        const today = new Date();

        const toDateUnix  = today.getTime() + 604800000
        //change to 2 weeks
        const toDate = new Date(toDateUnix).toISOString().slice(0, 10);

        const statsApiKey = '7af2d7e9641bd0322a09b5d94e4c03dd81da28e216f60929aa790d6236ed5e30';
        const statsApiKey2 = '3939c49147beb8182e936aa4f6de908a14d6c6ceb3b2bc52a5493988e90d8c1c';
        const fixtureRequest =
        `https://apiv2.apifootball.com/?action=get_predictions&from=${fromDate}&to=${toDate}&league_id=148&APIkey=${statsApiKey2}`;

        Request.get(fixtureRequest).then((response) =>{
            const fixtureArray = response.body;

        //make sure fixture array is matchweek fixtures only
            const spliceFrom = 10;
            const spliceTo = fixtureArray.length;
            fixtureArray.splice(spliceFrom, spliceTo);

            this.setState({
                fixtures: fixtureArray
            });
        });

        const oddsApiKey = '2c6b7d182fa278280c13e5e5a562ea1a';
        const oddsApiKey2 = 'e89aafa4faef377c025d330a58c46bc9';
        const oddsRequest = `https://api.the-odds-api.com/v3/odds/?apiKey=${oddsApiKey2}&sport=soccer_epl&region=uk&mkt=h2h`;
        const oddsRequestPrem = `https://api.the-odds-api.com/v3/odds/?apiKey=${oddsApiKey2}&sport=soccer_epl&region=uk&mkt=h2h`;
        
        Request.get(oddsRequestPrem).then((response) => {
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

export default PremData;