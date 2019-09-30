
export function findOddsValue(result, oddsDiff) {
    function getClass(result) {
        return oddsDiff[result] > 2 ? "oddsSuperValue"
        : oddsDiff[result] > 1 ? "oddsHighValue"
        : oddsDiff[result] > 0.2 ? "oddsValue"
        : oddsDiff[result] < -5.5 ? "laySuperValue"
        : oddsDiff[result] < -1.5 ? "layHighValue"
        : oddsDiff[result] < -0.5 ? "layValue"
        : '';
    };

    if (result === 'home') {
        return getClass('home')
     } else if (result === 'draw') {
         return getClass('draw')
     } else if (result === 'away') {
         return getClass('away')
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

export function getDreamersLay(fixtureArray) {

    return fixtureArray.reduce((lowest, curr) => {
        let price;
        if (curr.dreamersLayType === 'home') {
            price = curr.bookieOddsHome;
        } else if (curr.dreamersLayType === 'draw') {
            price = curr.bookieOddsDraw;
        } else {price = curr.bookieOddsAway;}

        return price < 6 && curr.dreamersLay < lowest.dreamersLay
            ? curr
            : lowest;
    });
};
