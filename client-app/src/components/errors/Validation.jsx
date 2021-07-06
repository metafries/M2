import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorLinearProgress from '../utils/ErrorLinearProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/store/config';

function Validation({ errors }) {
    const { commonStore } = useStore();
    const { validationError } = commonStore;

    return (
        <List style={{ color: 'red' }}>
            <ErrorLinearProgress />
            <ListItem>
                <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                    <ErrorOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={`${validationError.status}: ${validationError.title}`} />
            </ListItem>
            {errors.map((err, idx) => (
                <ListItem key={idx}>
                    <ListItemText primary={err} />
                </ListItem>
            ))}
        </List>
    )
}

export default observer(Validation)