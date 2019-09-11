import React from 'react';
import {kMaxLength} from 'buffer';

class DreamersSelection extends React.Component {

    render() {
        console.log(this.props)
        const {homeTeam, awayTeam, oddsAway, oddsDraw, oddsHome, oddsAwayDiff, oddsDrawDiff, oddsHomeDiff} = this.props.selection;
        let sitch;
        let odds;




        if (oddsHomeDiff > oddsDrawDiff &&  oddsHomeDiff > oddsAwayDiff) {
            sitch = `${homeTeam} to beat ${awayTeam} at home`;
            odds = oddsHome;

        } else if (oddsDrawDiff > oddsHomeDiff && oddsDrawDiff > oddsAwayDiff) {
            sitch = `${homeTeam} to draw with ${awayTeam}`;
            odds = oddsDraw;
        } else {
            sitch = `${awayTeam} to beat ${homeTeam} away`;
            odds = oddsAway;
        }




        return (
            <div className="ui cards">
                <div className="ui card">
                    <div className="content">
                        <div className="header">
                            Dreamers Selection
                        </div>
                        <div className="description">
                            {`price: ${odds}`}
                        </div>
                        <div className="description">
                            {sitch}
                        </div>
                        <div className="meta">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DreamersSelection;