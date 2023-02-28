const PlayerComparisonResults = require('../../models/PlayerComparisonResults');

function playerMatchup(playerOne, playerTwo) {
    
    function updateVsPlayerWin(team, player) {
        if (team === 'Aliens' && player === 1) {
            playerOneVsWins['Alien wins']++
        } else if (team === 'Marines' && player === 1) {
            playerOneVsWins['Marine wins']++
        }else if (team === 'Aliens' && player === 2) {
            playerTwoVsWins['Alien wins']++
        } else if (team === 'Marines' && player === 2) {
            playerTwoVsWins['Marine wins']++
        }
    }

    function updateCoopPlayerWin(team) {
        team === 'Aliens' ? playerCoopWins['Joint Alien wins']++ : playerCoopWins['Joint Marine wins']++ 
    }
    
    function updateCoopPlayerLosses(team) {
        team === 'Aliens' ? playerCoopLosses['Joint Alien losses']++ : playerCoopLosses['Joint Marine losses']++ 
    }

    const playerOneRounds = playerOne.rounds;
    const playerTwoRounds = playerTwo.rounds;
    
    let playerOneVsWins = {
        'Alien wins': 0,
        'Marine wins': 0
    }
    let playerTwoVsWins = {
        'Alien wins': 0,
        'Marine wins': 0
    }
    let playerCoopWins = {
        'Joint Alien wins': 0,
        'Joint Marine wins': 0
    }
    let playerCoopLosses = {
        'Joint Alien losses': 0,
        'Joint Marine losses': 0
    }
    
    //add support for coms

    let playerOneWinsCount = 0;
    let playerTwoWinsCount = 0;
    let jointWinsCount = 0;
    let jointLosesCount = 0;
    let draws = 0;

    //very crude
    for (playerOneRound of playerOneRounds) {
        for (playerTwoRound of playerTwoRounds) {
            if(playerOneRound.roundId === playerTwoRound.roundId) {
                // match
                if (playerOneRound.winStatus === 'Win' && playerOneRound.winStatus === playerTwoRound.winStatus) {
                   updateCoopPlayerWin(playerOneRound.team);
                   jointWinsCount++;
                   break;
                }
                if (playerOneRound.winStatus === 'Loss' && playerOneRound.winStatus === playerTwoRound.winStatus) {
                    updateCoopPlayerLosses(playerOneRound.team)
                    jointLosesCount++;
                    break;
                }

                if (playerOneRound.winStatus === 'Win') {
                    updateVsPlayerWin(playerOneRound.team, 1)
                    playerOneWinsCount++;
                    break;
                } else if (playerTwoRound.winStatus === 'Win') {
                    updateVsPlayerWin(playerTwoRound.team, 2)
                    playerTwoWinsCount++;
                    break;
                } else {
                    draws++;
                    break;
                }
            }
        }
    }

    // construct playerComparison Results

    const playerComparisonResults = new PlayerComparisonResults(); //constru
    playerComparisonResults.playerOneName = playerOne.name;
    playerComparisonResults.playerTwoName = playerTwo.name;
    playerComparisonResults.playerOneWins = playerOneVsWins;
    playerComparisonResults.playerTwoWins = playerTwoVsWins;
    playerComparisonResults.jointWins = playerCoopWins;
    playerComparisonResults.jointLosses = playerCoopLosses;
    playerComparisonResults.draws = draws;
    
    let winRateVs = playerComparisonResults.calculateWinRateTotalVs();
    let winRateVsTeams =playerComparisonResults.calculateWinRatesByTeamVs();

    let winRateCOOP = playerComparisonResults.calculateWinRatesCoop();
    let winRateCOOPTeams = playerComparisonResults.calculateWinRatesByTeamCoop();

    //quick fix until i can be bothered to refactor
    let playerOneName = playerOne.name
    let playerTwoName = playerTwo.name
    let playerOneElo = playerOne.elo;
    let playerTwoElo = playerTwo.elo;
    let playerOneAvatar = playerOne.avatarUrl;
    let playerTwoAvatar = playerTwo.avatarUrl;
    let playerOneAccuracies = playerOne.accuracies;
    let playerTwoAccuracies = playerTwo.accuracies;

    return {playerOneName, playerTwoName, playerOneAccuracies, playerTwoAccuracies, playerOneElo, playerTwoElo, playerOneAvatar, playerTwoAvatar, playerOneWinsCount, playerTwoWinsCount, jointWinsCount, jointLosesCount, draws, winRateVs, winRateVsTeams, winRateCOOP, winRateCOOPTeams};

}

module.exports =  playerMatchup;