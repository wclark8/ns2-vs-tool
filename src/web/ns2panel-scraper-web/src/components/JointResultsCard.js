import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function JointResultsCard(props) {

    const result = props.result;

    // check if exists

    for(let wr in result) {
        if(wr == null || NaN) {
            wr = "N/A"
        }
    }

   return(
       <Card sx={{ minWidth: 275 }} elevation={3}>
            <CardContent>
            {result.overallCOOPWinRate !== 'N/A' &&
                <List>
                    <Divider />
                    <ListItem>
                        <ListItemText>Overall COOP Win Rate: {Math.trunc(result.overallCOOPWinRate)}%</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Alien COOP Win Rate: {Math.trunc(result.alienCOOPWinRate)}%</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Marine COOP Win Rate: {Math.trunc(result.marineCOOPWinRate)}%</ListItemText>
                    </ListItem>
                </List>} 
                { result.overallCOOPWinRate === 'N/A' && <Typography> No COOP Games Found </Typography>}
            </CardContent>
        </Card>)
}