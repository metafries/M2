import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStore } from '../../app/store/config'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ErrorLinearProgress from '../utils/ErrorLinearProgress';
import { history } from '../..';

function Server() {
    const { commonStore } = useStore();
    const { serverError } = commonStore;

    if (Object.entries(serverError).length === 0) history.push('/test/errors');

    return (
        <React.Fragment>
            <ErrorLinearProgress />
            <List style={{ color: 'red' }}>
                <ListItem>
                    <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                        <ErrorOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${serverError.statusCode}: ${serverError.message}`} />
                </ListItem>
                <ListItem style={{overflowWrap: 'break-word'}}>
                    <ListItemText primary={`${serverError.details}`} />
                </ListItem>
            </List>
        </React.Fragment>
    )
}

export default observer(Server)