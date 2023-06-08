import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

export default function RoundDrawer(props) {

    const rounds = props.rounds;

    const createRoundListItem = (round) => {
        return(
                <ListItem>
                    <Link href={round._roundId}>{round._roundId}</Link>
                    <ListItemText>{round._team}</ListItemText>
                    <ListItemText>{round._winStatus}</ListItemText>
                </ListItem>
        )
    }

    return (
        <Drawer anchor={props.anchor} open={props.open} onBackdropClick={props.onBackdropClick}>
            <List>
                {rounds.map((e) => {
                    return createRoundListItem(e);
                })}
            </List>
        </Drawer>
    )
}