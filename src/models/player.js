class Player {
    constructor() {
        this._rounds = [];
    }

    set name(name){
        this._name = name;
    }

    get name() {
        return this._name;
    }
/*
    get id() {
        return this.id;
    }
*/
     addRound(roundId, winStatus, team) {
        this._rounds.push(new Round(roundId, winStatus, team));
    }

    get rounds() {
        return this._rounds;
    }

}

class Round {
    constructor (roundId, winStatus, team){
        this._roundId = roundId;
        this._winStatus = winStatus;
        this._team = team;
    }

    get roundId() {
        return this._roundId
    }

    get winStatus(){
        return this._winStatus;
    }

    set roundId(roundId) {
        this._roundId = roundId
    }

    set winStatus(winStatus){
        this._winStatus = winStatus;
    }

    get team() {
        return this._team;
    }

    set team(team){
        this._team = team;
    }
}

module.exports = 
    Player;