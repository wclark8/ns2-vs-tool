//urggggggggggggggggg
// split into playerResults model and use this on top of it, could extend player class
class PlayerComparisonResults {

    set playerOneName(playerOneName) {
        this._playerOneName = playerOneName;
    }

    set playerTwoName(playerTwoName) {
        this._playerTwoName = playerTwoName;
    }

    set playerOneWins(playerOneWins) {
        this._playerOneWins = playerOneWins;
    } 

    set playerTwoWins(playerTwoWins) {
        this._playerTwoWins = playerTwoWins;
    }

    set jointWins(jointWins) {
        this._jointWins = jointWins;
    }

    set jointLoses(jointLoses) {
        this._jointLoses = jointLoses
    }

    set draws(draws) {
        this._draws = draws;
    }


    calculateWinRateTotalVs() {
        
        let p1w = this._playerOneWins['Alien wins'] + this._playerOneWins['Marine wins'];
        let p2w = this._playerTwoWins['Alien wins'] + this._playerTwoWins['Marine wins'];
        let total = p1w + p2w;

        let p1wr = this._wrFormula(p1w, total)
        let p2wr = this._wrFormula(p2w, total)

        console.log(" ")
        console.log("---------- TOTAL WIN RATE ---------");
        console.log(this._playerOneName +"'s Total Win Rate: " + p1wr + "%");
        console.log(this._playerTwoName +"'s Total Win Rate: " + p2wr + "%");
        console.log(" ")

        return {'playerOneWinRate': p1wr, 'playerTwoWinRate': p2wr}
    }
    
    calculateWinRatesByTeamVs() {

        let p1wA = this._playerOneWins['Alien wins'] + this._playerTwoWins['Marine wins']
        let p2wA = this._playerTwoWins['Alien wins'] + this._playerOneWins['Marine wins'] 

        let p1wM = this._playerOneWins['Marine wins'] + this._playerTwoWins['Alien wins'] 
        let p2wM = this._playerTwoWins['Marine wins'] + this._playerOneWins['Alien wins']

        let p1wao = this._playerOneWins['Alien wins']
        let p2wao = this._playerTwoWins['Alien wins'] 

        let p1wmo = this._playerOneWins['Marine wins'] 
        let p2wmo = this._playerTwoWins['Marine wins'] 


        let p1Awr = this._wrFormula(p1wao, p1wA)
        let p1Mwr = this._wrFormula(p1wmo, p1wM)
        
        let p2Awr = this._wrFormula(p2wao, p2wA)
        let p2Mwr = this._wrFormula(p2wmo, p2wM)

        console.log(this._playerOneName +" team win rate");
        console.log("Alien Win Rate: " + p1Awr + "%");
        console.log("Marine Win Rate: " + p1Mwr + "%"); 
        console.log("-----------------------------");
        console.log(this._playerTwoName +" team win rate");
        console.log("Alien Win Rate: " + p2Awr + "%");
        console.log("Marine Win Rate: " + p2Mwr + "%"); 

        return {'playerOneWinRateTeam': { 'alien': p1Awr, 'marine': p1Mwr}, 'playerTwoWinRateTeam': { 'alien': p2Awr, 'marine': p2Mwr} }
    }


    calculateWinRatesCoop() {
        let coopWrT = this._jointWins['Joint Alien wins'] + this._jointWins['Joint Marine wins']  + this._jointLoses['Joint Alien losses'] + this._jointLoses['Joint Marine losses'];

        let coopWr = this._wrFormula(this._jointWins['Joint Alien wins'] + this._jointWins['Joint Marine wins'], coopWrT)
        console.log("----------------");
        console.log("Total COOP Win Rate : " + coopWr + '%');

        return {'COOPWinRate': coopWr}
    }

    calculateWinRatesByTeamCoop() {
        let coopWrTA = this._jointWins['Joint Alien wins'] + this._jointLoses['Joint Alien losses'];
        let coopWrTM = this._jointWins['Joint Marine wins'] + this._jointLoses['Joint Marine losses'];

        //NEED A CHECK FOR NO ROUNDS PLAYED VS
        let coopWrA = this._wrFormula(this._jointWins['Joint Alien wins'], coopWrTA); 
        let coopWrM = this._wrFormula(this._jointWins['Joint Marine wins'], coopWrTM);

        console.log('---------COOP WIN RATES----------');
        console.log('Alien win rate: ' + coopWrA + '%');
        console.log('Marine win rate: ' + coopWrM + '%');
        console.log('---------------------------------');

        return {'COOPAlienWinRate': coopWrA, 'COOPMarineWinRate': coopWrM}
    }
    
    _wrFormula(wins, total) {
        return (wins/total) * 100
    }
}

module.exports = PlayerComparisonResults;