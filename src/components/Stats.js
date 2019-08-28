import React from 'react';

import Request from 'superagent';

class Stats extends React.Component {
    fetchOdds = (data) => {
        const statsApiKey = '7af2d7e9641bd0322a09b5d94e4c03dd81da28e216f60929aa790d6236ed5e30';
        


        if (data === 'prem') {
            const statsSearch = `https://apiv2.apifootball.com/?action=get_events&from=2019-08-23&to=2019-08-25&league_id=148&APIkey=${statsApiKey}`;

            Request.get(statsSearch).then((response) => {
                console.log(response.body)
            })
        }

        if (data === 'champ') {
            const statsSearch = `https://apiv2.apifootball.com/?action=get_events&from=2019-08-21&to=2019-08-29&league_id=149&APIkey=${statsApiKey}`;
            Request.get(statsSearch).then((response) => {
                console.log(response);
            })

        }

    }

    render() {
        return (
            <div>
                <button onClick={() => this.fetchOdds('prem')}>Stats</button>
            </div>
            
        )
    }
}

export default Stats;