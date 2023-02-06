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
     addRound(roundId, winStatus) {
        this._rounds.push(new Round(roundId, winStatus));
    }

    get rounds() {
        return this._rounds;
    }

}

class Round {
    constructor (roundId, winStatus){
        this._roundId = roundId;
        this._winStatus = winStatus;
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
}

module.exports = 
    Player;