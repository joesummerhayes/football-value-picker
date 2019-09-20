import React from 'react';
import Request from 'superagent';
import FixtureTable from './fixtures/FixureTable';

class LeagueTwoData extends React.Component {
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

        //get stats variables
        const statsApiKey = '7af2d7e9641bd0322a09b5d94e4c03dd81da28e216f60929aa790d6236ed5e30';
        const statsApiKey2 = '970dd30b89c17b36e62fa91030d13628873c84d6b35971b2fff92df82e2f11ee';
        const leagueTwoFixtureRequest = 
        `https://apiv2.apifootball.com/?action=get_predictions&from=${fromDate}&to=${toDate}&league_id=151&APIkey=${statsApiKey2}`

        //get odds variables
        const oddsApiKey = '2c6b7d182fa278280c13e5e5a562ea1a';
        const oddsApiKey2 = 'e89aafa4faef377c025d330a58c46bc9';
        const oddsRequest = `https://api.the-odds-api.com/v3/odds/?apiKey=${oddsApiKey}&sport=soccer_epl&region=uk&mkt=h2h`;
        const oddsRequestLeagueTwo = `https://api.the-odds-api.com/v3/odds/?apiKey=${oddsApiKey2}&sport=soccer_england_league2&region=uk&mkt=h2h`        


        Request.get(leagueTwoFixtureRequest).then((response) =>{
            const fixtureArray = response.body;
            
            //make sure array is gameweekfixtures ONLY
            const spliceFrom = 12;
            const spliceTo = fixtureArray.length;
            fixtureArray.splice(spliceFrom, spliceTo);

            this.setState({
                fixtures: fixtureArray
            });
        }).then(() => {
            Request.get(oddsRequestLeagueTwo).then((response) => {
                const oddsArray = response.body;
                oddsArray.length ? console.log(oddsArray) : console.log('error in getting odds data')
                this.setState({
                    odds: oddsArray.data
                });
            });
        });
    };


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

export default LeagueTwoData;