import React, { useState } from 'react';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Button, ButtonGroup } from '@material-ui/core';
import Validation from '../errors/Validation';
import ErrorLinearProgress from '../utils/ErrorLinearProgress';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const custom = createMuiTheme({
    palette: {
        primary: {
            main: '#fc4000',
        },
    },
    typography: {
        fontFamily: 'Oswald, sans-serif'
    },
});

export default function Errors() {
    const baseUrl = 'http://localhost:5000/api/';

    const [errors, setErrors] = useState(null);
    const [badReq, setBadReq] = useState(null);
    const [auth, setAuth] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => {
            console.log(err.response);
            setBadReq(err.response.data);
            setAuth(null);
            setErrors(null);
        });
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => {
            console.log(err.response);
            setAuth(err.response.data);
            setBadReq(null);
            setErrors(null);
        });
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => {
            setErrors(err);
            setBadReq(null);
            setAuth(null);
        });
    }

    return (
        <MuiThemeProvider theme={custom}>
            <ButtonGroup color='primary' variant="text" aria-label="text primary button group">
                <Button onClick={handleNotFound}>Not Found</Button>
                <Button onClick={handleBadRequest}>Bad Request</Button>
                <Button onClick={handleValidationError}>Validation Error</Button>
                <Button onClick={handleServerError}>Server Error</Button>
                <Button onClick={handleUnauthorised}>Unauthorised</Button>
                <Button onClick={handleBadGuid}>Bad Guid</Button>
            </ButtonGroup>
            {
                badReq &&
                <List style={{ color: 'red' }}>
                    <ErrorLinearProgress />
                    <ListItem>
                        <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                            <ErrorOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${badReq.status}: ${badReq.title}`} />
                    </ListItem>
                </List>
            }
            { errors && <Validation errors={errors} />}
            {
                auth &&
                <List style={{ color: 'red' }}>
                    <ErrorLinearProgress />
                    <ListItem>
                        <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                            <ErrorOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${auth.status}: ${auth.title}`} />
                    </ListItem>
                </List>
            }
        </MuiThemeProvider>
    )
}
