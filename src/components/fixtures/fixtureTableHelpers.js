
export function findOddsValue(result, oddsDiff) {
    if (result === 'home') {
        return oddsDiff.home > 2 ? "oddsSuperValue" : oddsDiff.home > 1 ? "oddsHighValue" : oddsDiff.home > 0.2 ? "oddsValue" : '';
     } else if (result === 'draw') {
         return oddsDiff.draw > 2 ? "oddsSuperValue" : oddsDiff.draw > 1 ? "oddsHighValue" : oddsDiff.draw > 0.2 ? "oddsValue" : ''
     } else if (result === 'away') {
         return oddsDiff.away > 2 ? "oddsSuperValue" : oddsDiff.away > 1 ? "oddsHighValue" : oddsDiff.away > 0.2 ? "oddsValue" : ''
     }
};

export function findProfit(result, oddsDiff, moneyWin) {
    if (result === 'home') {
        return oddsDiff.home > 0 ? `£${moneyWin.home}` : ''
    } else if (result === 'draw') {
        return oddsDiff.draw > 0 ? `£${moneyWin.draw}` : ''
    } else if (result === 'away') {
        return oddsDiff.away > 0 ? `£${moneyWin.away}`: ''
    }
};

export function getDreamersBet(fixtureArray) {
    return fixtureArray.reduce((highest, curr) => {
        return curr.dreamerBet > highest.dreamerBet
            ? curr
            : highest;
    });
};

function layBetHelper(type, gameObj) {

    console.log(gameObj[type])
    if (gameObj[type] < 4 && gameObj.dreamersLay < -1) {
        console.log('1111', gameObj)
    }
}

export function getDreamersLay(fixtureArray) {
    return fixtureArray.reduce((lowest, curr) => {

        if (curr.dreamersLayType === 'home') {
            const type = 'bookieOddsHome';
            layBetHelper(type, curr)
        } else if (curr.dreamersLayType === 'draw') {
            const type = 'bookieOddsDraw';
            layBetHelper(type, curr);
        } else {
            const type = 'bookieOddsAway';
            layBetHelper(type, curr);
        }

        return curr.dreamersLay < lowest.dreamersLay
            ? curr
            : lowest;
    })
};
