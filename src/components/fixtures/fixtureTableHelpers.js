
export function findOddsValue(result, oddsDiff) {
    if (result === 'home') {
        return oddsDiff.home > 2 ? "oddsSuperValue" : oddsDiff.home > 1 ? "oddsHighValue" : oddsDiff.home > 0 ? "oddsValue" : '';
     } else if (result === 'draw') {
         return oddsDiff.draw > 2 ? "oddsSuperValue" : oddsDiff.draw > 1 ? "oddsHighValue" : oddsDiff.draw > 0 ? "oddsValue" : ''
     } else if (result === 'away') {
         return oddsDiff.away > 2 ? "oddsSuperValue" : oddsDiff.away > 1 ? "oddsHighValue" : oddsDiff.away > 0 ? "oddsValue" : ''
     }
}

export function findProfit(result, oddsDiff, moneyWin) {
    if (result === 'home') {
        return oddsDiff.home > 0 ? `£${moneyWin.home}` : ''
    } else if (result === 'draw') {
        return oddsDiff.draw > 0 ? `£${moneyWin.draw}` : ''
    } else if (result === 'away') {
        return oddsDiff.away > 0 ? `£${moneyWin.away}`: ''
    }
} 