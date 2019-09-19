import React, { Component } from 'react';
import './FixtureTable.css';
import {findOddsValue, findProfit} from './fixtureTableHelpers';
import DreamersSelection from '../DreamersSelection';
import SingleFixture from '../SingleFixture';
import {getGameObject} from './GetGameObjects';

class FixtureTable extends Component {
    state={
        homeTeam: '',
        awayTeam: '',
        oddsHome: 0,
        oddsDraw: 0,
        oddsAway: 0,
        oddsHomeDiff: 0,
        oddsDrawDiff: 0,
        oddsAwayDiff: 0,
    };



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


        return (
            <div>
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

















    /////////////////////////////////////////////////////////////////////////////////
    // renderFixtures = () => {
    //     const fixturesArray = this.props.fixturesArray;
    //     const oddsArray = this.props.oddsArray;

    //     const getDreamersBet = (match) => {
    //         const newTeamArray = Array(match.oddsHomeDiff, match.oddsDrawDiff, match.oddsAwayDiff).sort((a, b) => a - b);
    //         const oldTeamArray = Array(this.state.oddsHomeDiff, this.state.oddsDrawDiff, this.state.oddsAwayDiff).sort((a, b) => a - b);

    //         if (newTeamArray[2] && newTeamArray[2] > oldTeamArray[2]) {
    //             this.setState({
    //                 homeTeam: match.homeTeamName,
    //                 awayTeam: match.awayTeamName,
    //                 oddsHome: match.oddsHome,
    //                 oddsDraw: match.oddsDraw,
    //                 oddsAway: match.oddsAway,
    //                 oddsHomeDiff: match.oddsHomeDiff,
    //                 oddsDrawDiff: match.oddsDrawDiff,
    //                 oddsAwayDiff: match.oddsAwayDiff,
    //             })
    //         };

    //     };

    //     return (
    //         <div>
    //         <table className="ui celled table" id="table-to-xls">
    //             <thead>
    //                 <tr>
    //                     <th>Fixture</th>
    //                     <th>Home</th>
    //                     <th>Draw</th>
    //                     <th>Away</th>
    //                     <th>*</th>
    //                     <th>Betfair home</th>
    //                     <th>Betfair draw</th>
    //                     <th>Betfair away</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //             {fixturesArray.map(item => {
    //                     const homeProbRaw = parseInt(item.prob_HW);
    //                     const awayProbRaw =  parseInt(item.prob_AW);
    //                     const drawProbRaw = parseInt(item.prob_D);
    //                     const probTotal = homeProbRaw + drawProbRaw + awayProbRaw;

    //                     const homeProb = homeProbRaw/probTotal * 100;
    //                     const drawProb = drawProbRaw/probTotal * 100;
    //                     const awayProb = awayProbRaw/probTotal * 100;

    //                     const homeOdds = (100/homeProb).toFixed(2);
    //                     const drawOdds = (100/drawProb).toFixed(2);
    //                     const awayOdds = (100/awayProb).toFixed(2);

    //                     const gameInfo = oddsArray.find(game => {

    //                     if (game.home_team.includes(item.match_hometeam_name)) {
    //                         return game
    //                     } if (game.home_team.includes(item.match_hometeam_name.substring(0,4))) {
    //                         return game
    //                     }
    //                     });
                      
    //                     const bookieOdds = gameInfo
    //                         ? gameInfo.sites.find(bookmaker => bookmaker.site_key === 'betfair' || 'skybet').odds.h2h
    //                         : [];

    //                     let homeName = '';
    //                     let awayName = '';
    //                     let homeBookieOdds = '';
    //                     let drawBookieOdds = '';
    //                     let awayBookieOdds = '';

    //                     if (gameInfo) {
    //                         const teamsArray = gameInfo.teams;
    //                         teamsArray.map((team) => {
    //                             return team === gameInfo.home_team ? homeName = team : awayName = team; 
    //                         });

    //                     };

    //                     const sortTeamsAlph = (homeTeam, awayTeam) => {
    //                         const homeSplit = homeTeam.trim().split();
    //                         const awaySplit = awayTeam.trim().split();
                            
    //                         if (homeSplit[0] < awaySplit[0]) {
    //                             homeBookieOdds = bookieOdds[0];
    //                             awayBookieOdds = bookieOdds[1];
    //                             drawBookieOdds = bookieOdds[2];
    //                         } else {
    //                             homeBookieOdds = bookieOdds[1];
    //                             awayBookieOdds = bookieOdds[0];
    //                             drawBookieOdds = bookieOdds[2];
    //                         }
    //                     }

    //                     sortTeamsAlph(homeName, awayName)


    //                     const oddsDiff = {
    //                         home: (homeBookieOdds - homeOdds).toFixed(2),
    //                         draw: (drawBookieOdds - drawOdds).toFixed(2),
    //                         away: (awayBookieOdds - awayOdds).toFixed(2),
    //                     };

    //                     const teamObject = {
    //                         homeTeamName: gameInfo ? homeName : '',
    //                         awayTeamName: gameInfo ? awayName : '',
    //                         oddsHome: homeBookieOdds,
    //                         oddsDraw: drawBookieOdds,
    //                         oddsAway: awayBookieOdds,
    //                         oddsHomeDiff: parseFloat(oddsDiff.home),
    //                         oddsDrawDiff: parseFloat(oddsDiff.draw),
    //                         oddsAwayDiff: parseFloat(oddsDiff.away),
    //                     };

    //                     const moneyWin = {
    //                         home: ((homeBookieOdds * 10) - 10).toFixed(2),
    //                         draw: ((drawBookieOdds * 10) -10).toFixed(2),
    //                         away: ((awayBookieOdds * 10) -10).toFixed(2)
    //                     }
    //                     if (!homeBookieOdds || homeOdds & awayOdds & drawOdds === '3.00') {
    //                         return ''
    //                     } else {

    //                     getDreamersBet(teamObject);

    //                     return (
    //                         <tr className="fixture-row">
    //                             <td data-label="Fixture">{`${item.match_hometeam_name || 'no team'} vs ${item.match_awayteam_name || 'no team'}`}</td>
    //                             <td data-label="home-chance">{homeOdds || '/'}</td>
    //                             <td data-label="draw-chance">{drawOdds || '/'}</td>
    //                             <td data-label="away-chance">{awayOdds || '/'}</td>
    //                             <td data-label="betting-info">Odds <br/> Diff <br/> Profit</td>
    //                             <td className={findOddsValue('home', oddsDiff)} data-label="bookie-odds-home">
    //                                 {homeBookieOdds} <br/> ({oddsDiff.home}) <br/> {findProfit('home', oddsDiff, moneyWin)}
    //                             </td>
    //                             <td className={findOddsValue('draw', oddsDiff)} data-label="bookie-odds-draw">
    //                                 {drawBookieOdds} <br/> ({oddsDiff.draw}) <br/> {findProfit('draw', oddsDiff, moneyWin)}
    //                             </td>
    //                             <td className={findOddsValue('away', oddsDiff)} data-label="bookie-odds-away">
    //                                 {awayBookieOdds} <br/> ({oddsDiff.away}) <br/> {findProfit('away', oddsDiff, moneyWin)}
    //                             </td>
    //                         </tr>
    //                     )
    //                     };
    //                 })}
    //             </tbody>
    //         </table>
    //         </div>
    //     )
    // };

    render() {
        return (
            <div>
                {/* <DreamersSelection selection = {this.state} /> */}
                {/* {this.props.fixturesArray.error !== 404 ? this.renderFixtures() : 'no content until a week before match day'} */}
                {this.renderOdds()}
            </div>
        )
    }
}

export default FixtureTable;