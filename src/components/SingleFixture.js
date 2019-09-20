import React from 'react';
import {findOddsValue, findProfit} from './fixtures/fixtureTableHelpers';

class SingleFixture extends React.Component {
    render() {
        const gameInfo = this.props.gameInfo;

        const oddsDiff = {
            home: gameInfo.valueHome,
            draw: gameInfo.valueDraw,
            away: gameInfo.valueAway,
        };

        const moneyWin = {
            home: ((gameInfo.bookieOddsHome * 10) - 10).toFixed(2),
            draw: ((gameInfo.bookieOddsDraw * 10) - 10).toFixed(2),
            away: ((gameInfo.bookieOddsAway * 10) - 10).toFixed(2),
        }

        return (
            <tr>
                <td data-label="fixture">{`${gameInfo.teamNameHome} Vs ${gameInfo.teamNameAway}`}</td>
                <td data-label="home-chance">{gameInfo.predictionOddsHome}</td>
                <td data-label="home-chance">{gameInfo.predictionOddsDraw}</td>
                <td data-label="home-chance">{gameInfo.predictionOddsAway}</td>
                <td data-label="bookie-odds-home" className={findOddsValue('home', oddsDiff)}>
                    {gameInfo.bookieOddsHome}<br/>
                    {gameInfo.valueHome}<br/>
                    {findProfit('home', oddsDiff, moneyWin)}
                </td>
                <td data-label="bookie-odds-draw" className={findOddsValue('draw', oddsDiff)}>
                    {gameInfo.bookieOddsDraw}<br/>
                    {gameInfo.valueDraw}<br/>
                    {findProfit('draw', oddsDiff, moneyWin)}
                </td>
                <td data-label="bookie-odds-away" className={findOddsValue('away', oddsDiff)}>
                    {gameInfo.bookieOddsAway}<br/>
                    {gameInfo.valueAway}<br/>
                    {findProfit('away', oddsDiff, moneyWin)}
                </td>
            </tr>
        )
    }
}

export default SingleFixture;
