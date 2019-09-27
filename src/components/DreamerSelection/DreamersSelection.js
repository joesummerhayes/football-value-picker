import React from 'react';
import './DreamerSelection.css';

class DreamersSelection extends React.Component {

    render() {
        const gameObj = this.props.gameObj;
        const valueArray = [gameObj.valueHome, gameObj.valueDraw, gameObj.valueAway];
        let statement;
        let price;
        let value;


        this.renderDreamersBet = () => {
            if (valueArray[0] > valueArray[1] && valueArray[0] > valueArray[2]) { //home
                statement = `${gameObj.teamNameHome} to beat ${gameObj.teamNameAway} at home`;
                price = gameObj.bookieOddsHome;
                value = gameObj.valueHome;
            } else if (valueArray[1] > valueArray[0] && valueArray[1] > valueArray[2]) { //draw
                statement = `${gameObj.teamNameHome} to draw with ${gameObj.teamNameAway}`;
                price = gameObj.bookieOddsDraw;
                value = gameObj.valueDraw;
            } else if (valueArray[2] > valueArray[0] && valueArray[2] > valueArray[1]) { //away
                statement = `${gameObj.teamNameAway} to beat ${gameObj.teamNameHome} away`;
                price = gameObj.bookieOddsAway;
                value = gameObj.valueAway
            } else {
                statement = '';
                price = '';
                value = '';
            }
    
    
            return (
                <div className="dreamer-card bet">
                    <div className="card dreamers-bet">
                        <div className="content">
                            <h3 className="header">
                                Dreamers Bet
                            </h3>
                            <div className="description">
                            {statement}
                            </div>
                            <div className="extra content">
                                <a href="https://www.betfair.com/exchange/plus/football/competition/10932509" target="none">
                                    <div className="ui basic green button">
                                        Bet Odds: {price}
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )       
        }

        this.renderLaybet = () => {
            if (valueArray[0] < valueArray[1] && valueArray[0] < valueArray[2]) {
                statement = `${gameObj.teamNameHome} to beat ${gameObj.teamNameAway} at away`;
                price = gameObj.bookieOddsHome;
                value = gameObj.valueHome;
            } else if (valueArray[1] < valueArray[0] && valueArray[1] < valueArray[2]) {
                statement = `${gameObj.teamNameHome} to draw with ${gameObj.teamNameAway}`;
                price = gameObj.bookieOddsDraw;
                value = gameObj.valueDraw;
            } else if (valueArray[2] < valueArray[0] && valueArray[2] < valueArray[1]) {
                statement = `${gameObj.teamNameAway} to beat ${gameObj.teamNameHome} at home`;
                price = gameObj.bookieOddsAway;
                value = gameObj.valueAway;
            }
            return (
                <div className="dreamer-card lay">
                    <div className="card dreamers-lay">
                        <div className="content">
                            <h3 className="header">
                                Dreamers Lay
                            </h3>
                            <div className="description">
                            {statement}
                            </div>
                            <div className="extra content">
                                <a href="https://www.betfair.com/exchange/plus/football/competition/10932509" target="none">
                                    <div className="ui negative basic button">
                                        Lay Odds: {price}
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <>{this.props.bet ? this.renderDreamersBet() : this.renderLaybet()}</>
        )

    }
}

export default DreamersSelection;