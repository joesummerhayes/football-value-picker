import React from 'react';

import Request from 'superagent';

class Stats extends React.Component {
    
    fetchOdds = (data) => {
        const oddsApiKey = '2c6b7d182fa278280c13e5e5a562ea1a';
        const oddsSearch = `https://api.the-odds-api.com/v3/odds/?apiKey=${oddsApiKey}&sport=soccer_epl&region=uk&mkt=h2h`;


        if (data === 'odds') {
            Request.get(oddsSearch).then((response) => {
                console.log(response)
            })
        }

    }



    render() {
        return (
            <div>
                <button onClick={() => this.fetchOdds('odds')}>Click me</button>
            </div>
            
        )
    }
}

export default Stats;