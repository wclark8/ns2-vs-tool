import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


export default function PlayerResultsCard(props){

    const result = props.result;

    return(
        result.name &&
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {result.name}
                </Typography>
                <List>
                    <Divider />
                    <ListItem>
                        <ListItemText>Overall Win Rate: {result.overallWinRate}</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Alien Win Rate: {result.alienWinRate}</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Marine Win Rate: {result.marineWinRate}</ListItemText>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}