import React, { Component } from 'react';
import './FixtureTable.css';
import {findOddsValue, findProfit} from './fixtureTableHelpers';


class FixtureTable extends Component {

    renderFixtures = () => {
        const fixturesArray = this.props.fixturesArray;
        const oddsArray = this.props.oddsArray;
        console.log(fixturesArray)


        return (
            <div>
            <table className="ui celled table" id="table-to-xls">
                <thead>
                    <tr>
                        <th>Fixture</th>
                        <th>Home</th>
                        <th>Draw</th>
                        <th>Away</th>
                        <th>*</th>
                        <th>Betfair home</th>
                        <th>Betfair draw</th>
                        <th>Betfair away</th>
                    </tr>
                </thead>
                <tbody>
                    {fixturesArray.map(item => {
                        const homeProbRaw = parseInt(item.prob_HW);
                        const awayProbRaw =  parseInt(item.prob_AW);
                        const drawProbRaw = parseInt(item.prob_D);
                        const probTotal = homeProbRaw + drawProbRaw + awayProbRaw;


                        const homeProb = homeProbRaw/probTotal * 100;
                        const drawProb = drawProbRaw/probTotal * 100;
                        const awayProb = awayProbRaw/probTotal * 100;

                        const homeOdds = (100/homeProb).toFixed(2);
                        const drawOdds = (100/drawProb).toFixed(2);
                        const awayOdds = (100/awayProb).toFixed(2);

                        const gameInfo = oddsArray.find(game => {
                             return game.home_team.includes(item.match_hometeam_name);
                        });
                        console.log(gameInfo)


                        const bookieOdds = gameInfo
                            ? gameInfo.sites.find(bookmaker => bookmaker.site_key === 'betfair' || 'skybet').odds.h2h
                            : [];

                        //this line needs looking at to handle the case where i can't get betfair odds.


                        // order of the odds varies based on the teams alphbetical order. So ensure they are always the same.
                            if (gameInfo) {
                                if (gameInfo.home_team === gameInfo.teams[0]) {
                                    const temp = bookieOdds[1];
                                    bookieOdds[1] = bookieOdds[0];
                                    bookieOdds[0] = temp;
                                }
                            }
                        // define bookie odds
                        const homeBookieOdds = bookieOdds[1];
                        const drawBookieOdds = bookieOdds[2];
                        const awayBookieOdds = bookieOdds[0];

                        // find difference between myOdds and bookieOdds
                        const oddsDiff = {
                            home: (homeBookieOdds - homeOdds).toFixed(2),
                            draw: (drawBookieOdds - drawOdds).toFixed(2),
                            away: (awayBookieOdds - awayOdds).toFixed(2),
                        }

                        const moneyWin = {
                            home: ((homeBookieOdds * 10) - 10).toFixed(2),
                            draw: ((drawBookieOdds * 10) -10).toFixed(2),
                            away: ((awayBookieOdds * 10) -10).toFixed(2)
                        }
                            
                        return (
                            <tr className="fixture-row">
                                <td data-label="Fixture">{`${item.match_hometeam_name || 'no team'} vs ${item.match_awayteam_name || 'no team'}`}</td>
                                <td data-label="home-chance">{homeOdds || '/'}</td>
                                <td data-label="draw-chance">{drawOdds || '/'}</td>
                                <td data-label="away-chance">{awayOdds || '/'}</td>
                                <td data-label="betting-info">Odds <br/> Diff <br/> Profit</td>
                                <td class={findOddsValue('home', oddsDiff)} data-label="bookie-odds-home">
                                    {homeBookieOdds} <br/> ({oddsDiff.home}) <br/> {findProfit('home', oddsDiff, moneyWin)}
                                </td>
                                <td class={findOddsValue('draw', oddsDiff)} data-label="bookie-odds-draw">
                                    {drawBookieOdds} <br/> ({oddsDiff.draw}) <br/> {findProfit('draw', oddsDiff, moneyWin)}
                                </td>
                                <td class={findOddsValue('away', oddsDiff)} data-label="bookie-odds-away">
                                    {awayBookieOdds} <br/> ({oddsDiff.away}) <br/> {findProfit('away', oddsDiff, moneyWin)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        )
    };

    render() {
        return (
            <div>{this.props.fixturesArray.error !== 404 ? this.renderFixtures() : 'no content until a week before match day'}</div>
        )
    }
}

export default FixtureTable;