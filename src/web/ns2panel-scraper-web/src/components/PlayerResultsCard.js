import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { CardActions, CardHeader } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';

export default function PlayerResultsCard(props){

    const [expanded, setExpanded] = React.useState(false);

    const result = props.result;

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return(
        result.name &&
        <Card sx={{ minWidth: 275 }} elevation={3}>
            <CardHeader
        title={result.name}
        subheader={result.elo.elo}
        avatar={
            <Avatar src={result.avatarUrl} sx={{width:70 , height: 70 }}></Avatar>
        }
      />
            <CardContent>
                <List>
                    <Divider />
                    <ListItem>
                        <ListItemText>Overall Win Rate: {Math.trunc(result.overallWinRate)}%</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Alien Win Rate: {Math.trunc(result.alienWinRate)}%</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Marine Win Rate: {Math.trunc(result.marineWinRate)}%</ListItemText>
                    </ListItem>
                </List>
            </CardContent>
                <CardActions>
                <ExpandMoreIcon expand={expanded} onClick={handleExpandClick}/>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItem>
                                <ListItemText>Total Win Count: {result.playerWinCount}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                <ListItemText>{result.elo.marineElo}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                <ListItemText>{result.elo.alienElo}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                <ListItemText>{result.accuracies.marineAcc}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                <ListItemText>{result.accuracies.alienAcc}</ListItemText>
                                </ListItem>
                            </ListItem>
                        </List>
                    </CardContent>
                    </Collapse>
        </Card>
    );
}