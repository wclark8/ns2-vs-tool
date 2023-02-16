import * as React from 'react';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PlayerResultsCard from '../components/PlayerResultsCard';
import JointResultsCard from '../components/JointResultsCard';

export default function MainPage(props) {

    const cardGridStyling = {
        paddingBottom: '40px',
    }

    const scraperApi = props.scraperApi;

    const [player1, setPlayer1] = React.useState("");
    const [player2, setPlayer2] = React.useState("");

    const [submissionInProgress, setSubmissionProgress] = React.useState(false);

    const [player1Results, setPlayer1Results] = React.useState();
    const [player2Results, setPlayer2Results] = React.useState();
    const [jointResults, setJointResults] = React.useState();

    const handleCompareSubmission = async () => {
        // check steam id
        if (player1 && player2) {
            setSubmissionProgress(true);
            const results = await scraperApi.comparePlayersVs(player1, player2);
            if(results) {
                setSubmissionProgress(false);
                   // check returned obj
                   const playerOneResults = {
                       name: results.playerOneName,
                       overallWinRate: results.winRateVs.playerOneWinRate,
                       alienWinRate: results.winRateVsTeams.playerOneWinRateTeam.alien,
                       marineWinRate: results.winRateVsTeams.playerOneWinRateTeam.marine,
                       playerWinCount: results.playerOneWinsCount
                   }
                   const playerTwoResults = {
                       name: results.playerTwoName,
                       overallWinRate: results.winRateVs.playerTwoWinRate,
                       alienWinRate: results.winRateVsTeams.playerTwoWinRateTeam.alien,
                       marineWinRate:results.winRateVsTeams.playerTwoWinRateTeam.marine,
                       playerWinCount: results.playerTwoWinsCount
                   }
                   const jointResultsObj = {
                        overallCOOPWinRate: results.winRateCOOP.COOPWinRate,
                        alienCOOPWinRate: results.winRateCOOPTeams.COOPAlienWinRate, //if null
                        marineCOOPWinRate: results.winRateCOOPTeams.COOPMarineWinRate,
                   }
                   setPlayer1Results(playerOneResults);
                   setPlayer2Results(playerTwoResults);
                   setJointResults(jointResultsObj);
                   // "winRateCOOP":{"COOPWinRate":57.49999999999999},
                  // "winRateCOOPTeams":{"COOPAlienWinRate":null,"COOPMarineWinRate":57.49999999999999}}
               }
        }

    }

    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} position='sitcky'>
                <Grid container spacing={2} columns={{ p: 5, xs: 4, md: 12 }}>
                    <Grid xs={4}>
                        <TextField id="player1-textField" label="" variant="filled" helperText="Enter player 1's ID" value={player1} onChange={(e) => { setPlayer1(e.target.value) }} />
                    </Grid>
                    <Grid xs={8} style={cardGridStyling}>
                        {player1Results && <PlayerResultsCard result={player1Results}></PlayerResultsCard>}
                    </Grid>
                    <Grid xs={4}>
                        <TextField id="player2-textField" label="" variant="filled" helperText="Enter player 2's ID" value={player2} onChange={(e) => { setPlayer2(e.target.value) }} />
                    </Grid>
                    <Grid xs={8} style={cardGridStyling}>
                        {player2Results && <PlayerResultsCard result={player2Results}></PlayerResultsCard>}
                    </Grid>
                    <Grid xs={4}>
                        <Button id="compare-button" onClick={() => {
                            handleCompareSubmission();
                        }}>Compare</Button>
                        {submissionInProgress && <CircularProgress></CircularProgress>}
                    </Grid>
                    <Grid xs={8} style={cardGridStyling}>
                        {jointResults && <JointResultsCard result={jointResults}></JointResultsCard>}
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
        }

/*
sort out the bullshit styling
*/