export function getGameObject(oddsObj, statsObj) {


    const teamsArray = oddsObj.teams;
    let gameObj = {
        teamNameHome: '',
        teamNameAway: '',
        bookieOddsHome: '',
        bookieOddsDraw: '',
        bookieOddsAway: '',
        predictionOddsHome: '',
        predictionOddsDraw: '',
        predictionOddsAway: '',
        valueHome: '',
        valueDraw: '',
        valueAway: '',
        matchId:'',
        dreamerBet: '',
        dreamersLay: '',
        dreamersLayType: '',
    }

    teamsArray.map((team => {
        return team === oddsObj.home_team ? gameObj.teamNameHome = team : gameObj.teamNameAway = team;
    }))
    
    const bookieOdds = oddsObj
    ? oddsObj.sites.find(bookmaker => bookmaker.site_key === 'betfair' || 'skybet').odds.h2h
    : [];

    //get the odds for the home and away sides
    const sortTeamsAlph = (homeTeam, awayTeam) => {
         const homeSplit = homeTeam.trim().split();
         const awaySplit = awayTeam.trim().split();
         
         if (homeSplit[0] < awaySplit[0]) {
             gameObj.bookieOddsHome = bookieOdds[0];
             gameObj.bookieOddsAway = bookieOdds[1];
             gameObj.bookieOddsDraw = bookieOdds[2];
         } else {
             gameObj.bookieOddsHome = bookieOdds[1];
             gameObj.bookieOddsAway = bookieOdds[0];
             gameObj.bookieOddsDraw = bookieOdds[2];
         }
     }
    sortTeamsAlph(gameObj.teamNameHome, gameObj.teamNameAway)
    


     //get the probabilities for the home and away sides
    const homeProbRaw = parseFloat(statsObj.prob_HW);
    const drawProbRaw = parseFloat(statsObj.prob_D);
    const awayProbRaw = parseFloat(statsObj.prob_AW);
    const probTotal = homeProbRaw + drawProbRaw + awayProbRaw;

    const homeProb = homeProbRaw/probTotal * 100;
    const drawProb = drawProbRaw/probTotal * 100;
    const awayProb = awayProbRaw/probTotal * 100;

    if (homeProb.toFixed(2) == 33.33 && awayProb.toFixed(2) == 33.33 && drawProb.toFixed(2) == 33.33) {
        gameObj.predictionOddsHome = 'n/a';
        gameObj.predictionOddsDraw = 'n/a';
        gameObj.predictionOddsAway = 'n/a';
    } else {
        gameObj.predictionOddsHome = parseFloat((100/homeProb).toFixed(2));
        gameObj.predictionOddsDraw = parseFloat((100/drawProb).toFixed(2));
        gameObj.predictionOddsAway = parseFloat((100/awayProb).toFixed(2));
    }


    //get the value between my odds and bookies odds
    gameObj.valueHome = parseFloat((gameObj.bookieOddsHome - gameObj.predictionOddsHome).toFixed(2));
    gameObj.valueDraw = parseFloat((gameObj.bookieOddsDraw - gameObj.predictionOddsDraw).toFixed(2));
    gameObj.valueAway = parseFloat((gameObj.bookieOddsAway - gameObj.predictionOddsAway).toFixed(2));

    //get dreamersBet value
    const valueArray = [gameObj.valueHome, gameObj.valueDraw, gameObj.valueAway];

    gameObj.dreamerBet = valueArray.reduce((acc, val) => {
        return val > acc ? acc = val : acc;
    }, 0);

    //get dreamersLay value
    gameObj.dreamersLay = valueArray.reduce((lowest, curr) => {
        return curr < lowest ? lowest = curr : lowest;
    }, 0);

    //get laybet Type (home/draw/away)
    if (gameObj.dreamersLay === gameObj.valueHome) {
        gameObj.dreamersLayType = 'home';
    } else if (gameObj.dreamersLay === gameObj.valueDraw) {
        gameObj.dreamersLayType = 'draw'
    } else {gameObj.dreamersLayType = 'away'}
    

    //get Match id to pass as key
    gameObj.matchId = statsObj.match_id;



     return gameObj
}