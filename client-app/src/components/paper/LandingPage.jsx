import React from "react";
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

const logo = { height: '33px', width: 'auto' };

export default function LandingPage() {
    return (
        <Container 
            maxWidth='xs' 
            style={{
                margin: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <IconButton 
                component={Link}
                to='/activities'
                style={{ padding: 0 }}
            >
                <img alt='icon' style={logo} src='/assets/logoIcon.png' />
                <img alt='metaFries' style={logo} src='/assets/logoText.png' />
            </IconButton>
            <Typography variant='h5' style={{ color: 'whitesmoke' }}>
                Gather up in no time!
            </Typography>
            <LinearProgress />
        </Container>
    )
}
