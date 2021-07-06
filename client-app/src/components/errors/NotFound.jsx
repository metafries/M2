import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ErrorLinearProgress from '../utils/ErrorLinearProgress';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/store/config';
import { history } from '../..';

function NotFound() {
    const { commonStore } = useStore();
    const { notFoundError } = commonStore;

    if (Object.entries(notFoundError).length === 0) history.push('/test/errors');

    return (
        <React.Fragment>
            <ErrorLinearProgress />
            <List style={{ color: 'red' }}>
                <ListItem>
                    <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                        <ErrorOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${notFoundError.status}: ${notFoundError.title}`} />
                </ListItem>
                {
                    notFoundError.errors &&
                    <ListItem>
                        <ListItemText primary={notFoundError.errors.id[0]} />
                    </ListItem>
                }
            </List>
        </React.Fragment>
    )
}

export default observer(NotFound)