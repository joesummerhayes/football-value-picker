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

    gameObj.predictionOddsHome = parseFloat((100/homeProb).toFixed(2));
    gameObj.predictionOddsDraw = parseFloat((100/drawProb).toFixed(2));
    gameObj.predictionOddsAway = parseFloat((100/awayProb).toFixed(2));


    //get the value between my odds and bookies odds
    gameObj.valueHome = parseFloat((gameObj.bookieOddsHome - gameObj.predictionOddsHome).toFixed(2));
    gameObj.valueDraw = parseFloat((gameObj.bookieOddsDraw - gameObj.predictionOddsDraw).toFixed(2));
    gameObj.valueAway = parseFloat((gameObj.bookieOddsAway - gameObj.predictionOddsAway).toFixed(2));

    //get Match id to pass as key
    gameObj.matchId = statsObj.match_id;




     return gameObj
}