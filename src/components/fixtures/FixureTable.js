import React, { Component } from 'react';
import './FixtureTable.css';
import {getDreamersBet} from './fixtureTableHelpers';
import SingleFixture from '../SingleFixture';
import {getGameObject} from './GetGameObjects';
import DreamersSelection from '../DreamerSelection/DreamersSelection';
import Loader from 'react-loader-spinner'

class FixtureTable extends Component {

//////////////////////////////////////////////////////////////////////////////////////////
    renderOdds = () => {
        const fixturesArray = this.props.fixturesArray;
        const oddsArray = this.props.oddsArray;

    


        const oddsSpliceFrom = fixturesArray.length;
        const oddsSpliceTo = oddsArray.length;


        oddsArray.splice(oddsSpliceFrom, oddsSpliceTo);


        // fixture array has all the gameObjects in
        let fixtureArray = [];
        let singleGameObj = {};
        let dreamersBet = {};

        oddsArray.map(game => {

            fixturesArray.find(fixture => {
                if (game.home_team.includes(fixture.match_hometeam_name)) {
                    singleGameObj = getGameObject(game, fixture);
                    if (singleGameObj.predictionOddsHome !== 'n/a') fixtureArray.push(singleGameObj);

                    } else if (game.home_team.includes(fixture.match_hometeam_name.substring(0,12))) {
                        singleGameObj = getGameObject(game, fixture);
                        if (singleGameObj.predictionOddsHome !== 'n/a') fixtureArray.push(singleGameObj);  

                    } else if (game.home_team.includes(fixture.match_hometeam_name.substring(0,4))) {
                        singleGameObj = getGameObject(game, fixture);
                        if (singleGameObj.predictionOddsHome !== 'n/a') fixtureArray.push(singleGameObj); 
                    }
            })
        })
         if (fixtureArray.length) {
            dreamersBet = getDreamersBet(fixtureArray)
        }
       




        return (
            <div>
                {dreamersBet ? <DreamersSelection gameObj={dreamersBet} /> : ''}
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Fixture</th>
                        <th>Home</th>
                        <th>Draw</th>
                        <th>Away</th>
                        <th>Betfair home</th>
                        <th>Betfair draw</th>
                        <th>Betfair away</th>
                    </tr>
                </thead>
                <tbody>
                        {fixtureArray.map(game => {
                            return <SingleFixture key={game.matchId} gameInfo={game} />
                        })}
                </tbody>
            </table>
        </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.oddsArray.length
                ? this.renderOdds()
                :
                <div style={{margin: "auto", width:"11%", paddingTop:"200px"}}>
                    <Loader
                        type="TailSpin"
                        color="#1FA104"
                        height={200}
                        width={200}
                        timeout={3000} //3 secs
                    />
                </div>
                }
            </div>
        )
    }
}

export default FixtureTable;