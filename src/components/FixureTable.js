import React, { Component } from 'react';

class FixtureTable extends Component {

    renderFixtures = () => {
        const fixturesArray = this.props.fixturesArray;
        const oddsArray = this.props.oddsArray;
        console.log(oddsArray)


        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Fixture</th>
                        <th>Home</th>
                        <th>X</th>
                        <th>Away</th>
                        <th>Bookie home</th>
                        <th>Bookie draw</th>
                        <th>Bookie away</th>
                    </tr>
                </thead>
                <tbody>
                    {fixturesArray.map(item => {
                        //To convert from a probability to odds, divide the probability by one minus that probability
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
                            ? gameInfo.sites.find(bookmaker => bookmaker.site_key === 'betfair').odds.h2h
                            : [];


                        // order of the odds varies based on the teams alphbetical order. So ensure they are always the same.
                            if (gameInfo) {
                                if (gameInfo.home_team === gameInfo.teams[0]) {
                                    const temp = bookieOdds[1];
                                    bookieOdds[1] = bookieOdds[0];
                                    bookieOdds[0] = temp;
                                }
                            }
                            

                        return (
                            <tr className="fixture-row">
                                <td data-label="Fixture">{`${item.match_hometeam_name} vs ${item.match_awayteam_name}`}</td>
                                <td data-label="home-chance">{homeOdds}</td>
                                <td data-label="draw-chance">{drawOdds}</td>
                                <td data-label="away-chance">{awayOdds}</td>
                                <td data-label="bookie-odds-home">{bookieOdds[1]}</td>
                                <td data-label="bookie-odds-draw">{bookieOdds[2]}</td>
                                <td data-label="bookie-odds-away">{bookieOdds[0]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    };

    render() {
        return (
            <div>{this.renderFixtures()}</div>
        )
    }
}

export default FixtureTable;