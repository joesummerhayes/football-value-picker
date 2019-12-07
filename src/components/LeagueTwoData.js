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
        const statsApiKey2 = '6cc76dd1321daab09166a8d28b70ef19ec2b39e397d6498a017cf4c80aa3e949';
        const leagueTwoFixtureRequest = 
        `https://apiv2.apifootball.com/?action=get_predictions&from=${fromDate}&to=${toDate}&league_id=151&APIkey=${statsApiKey2}`

        //get odds variables
        const oddsApiKey = '2c6b7d182fa278280c13e5e5a562ea1a';
        const oddsApiKey2 = 'e89aafa4faef377c025d330a58c46bc9';
        const oddsApiKey3 = '9bc928197f2353ae5df608681efb54b1';
        const oddsRequestLeagueTwo = `https://api.the-odds-api.com/v3/odds/?apiKey=${oddsApiKey3}&sport=soccer_england_league2&region=uk&mkt=h2h`        


        Request.get(leagueTwoFixtureRequest).then((response) =>{
            const fixtureArray = response.body;
            
            //make sure array is gameweekfixtures ONLY
            const spliceFrom = 12;
            const spliceTo = fixtureArray.length;
            if (fixtureArray.length) {
                fixtureArray.splice(spliceFrom, spliceTo);
            }

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