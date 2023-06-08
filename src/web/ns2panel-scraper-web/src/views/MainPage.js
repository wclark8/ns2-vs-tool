import * as React from 'react';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
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
    
    const [submissionInProgress, setSubmissionInProgress] = React.useState(false);
    const [currentSubmissionCompleted, setCurrentSubmissionCompleted] = React.useState(false);

    const [comparisonID, setComparisonID] = React.useState();

    const [progressValue, setProgressValue] = React.useState();
    
    const [player1Results, setPlayer1Results] = React.useState();
    const [player2Results, setPlayer2Results] = React.useState();
    const [jointResults, setJointResults] = React.useState();
    const [hasVsResults, setHasVsResults] = React.useState(false);

    const [pollingLoop, setPollingLoop] = React.useState(null);

    const stopPolling = () => {
        setPollingLoop(interval => {
            clearInterval(interval);
            return null;
        })
    }

        React.useEffect(() => {
            if (submissionInProgress && !currentSubmissionCompleted) {
                setPollingLoop(setInterval(async () => {
                    const progressObj = await scraperApi.getVsProgress();
                    setProgressValue(progressObj.progressValue)
                    if (progressObj.comparisonComplete) {
                        // get results
                        const results = await scraperApi.getPlayerVsResults(comparisonID)
                        shapeAndSetResults(results);
                    }
                }, 3200));

            }
        }, [submissionInProgress, scraperApi, comparisonID, currentSubmissionCompleted])

    const triggerComparisonSubmission = async () => {
        if (player1 && player2) {
            const comparisonId = await scraperApi.comparePlayersVsAsync(player1, player2);
            setCurrentSubmissionCompleted(false);
            setSubmissionInProgress(true);
            setComparisonID(comparisonId);
        }
    }

    const shapeAndSetResults = (results) => {
        setSubmissionInProgress(false);
        const playerOneResults = {
            name: results.playerOneName,
            avatarUrl: results.playerOneAvatar,
            elo: results.playerOneElo,
            accuracies: results.playerOneAccuracies,
            overallWinRate: results.winRateVs.playerOneWinRate,
            alienWinRate: results.winRateVsTeams.playerOneWinRateTeam.alien,
            marineWinRate: results.winRateVsTeams.playerOneWinRateTeam.marine,
            playerWinCount: results.playerOneWinsCount,
            rounds: results.playerOneRoundMatches
        }
        const playerTwoResults = {
            name: results.playerTwoName,
            avatarUrl: results.playerTwoAvatar,
            elo: results.playerTwoElo,
            accuracies: results.playerTwoAccuracies,
            overallWinRate: results.winRateVs.playerTwoWinRate,
            alienWinRate: results.winRateVsTeams.playerTwoWinRateTeam.alien,
            marineWinRate:results.winRateVsTeams.playerTwoWinRateTeam.marine,
            playerWinCount: results.playerTwoWinsCount,
            rounds: results.playerTwoRoundMatches
        }
        const jointResultsObj = {
             overallCOOPWinRate: results.winRateCOOP.COOPWinRate,
             alienCOOPWinRate: results.winRateCOOPTeams.COOPAlienWinRate,
             marineCOOPWinRate: results.winRateCOOPTeams.COOPMarineWinRate,
        }
        if (playerOneResults.playerWinCount + playerTwoResults.playerWinCount > 0) {
         setHasVsResults(true);
         setPlayer1Results(playerOneResults);
         setPlayer2Results(playerTwoResults);
        }
        setJointResults(jointResultsObj);
        setCurrentSubmissionCompleted(true);
        stopPolling();
    }

    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} position='sitcky'>
                <Grid container spacing={2} columns={{ p: 5, xs: 4, md: 12 }}>
                    <Grid xs={4}>
                        <TextField id="player1-textField" label="" variant="filled" helperText="Enter player 1's ID" value={player1} onChange={(e) => { setPlayer1(e.target.value) }} />
                    </Grid>
                    <Grid xs={8} style={cardGridStyling}>
                        {hasVsResults && <PlayerResultsCard result={player1Results}></PlayerResultsCard>}
                    </Grid>
                    <Grid xs={4}>
                        <TextField id="player2-textField" label="" variant="filled" helperText="Enter player 2's ID" value={player2} onChange={(e) => { setPlayer2(e.target.value) }} />
                    </Grid>
                    <Grid xs={8} style={cardGridStyling}>
                        {hasVsResults && <PlayerResultsCard result={player2Results}></PlayerResultsCard>}
                    </Grid>
                    <Grid xs={4}>
                        <Button id="compare-button" onClick={() => {
                            triggerComparisonSubmission();
                        }}>Compare</Button>
                        {submissionInProgress && <CircularProgress variant='determinate' value={progressValue}></CircularProgress>}
                    </Grid>
                    <Grid xs={8} style={cardGridStyling}>
                        {jointResults && <JointResultsCard result={jointResults}></JointResultsCard>}
                    </Grid>
                </Grid>
                {submissionInProgress && <Alert severity="info">Please be patient...</Alert>}
                {!submissionInProgress && !hasVsResults && currentSubmissionCompleted && <Alert severity="warning">No VS Results</Alert>}
            </Container>

        </div>
    )
}