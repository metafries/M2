import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

class ErrorLinearProgress extends Component {
    render() {
        const { classes } = this.props;
        return  <LinearProgress 
                    {...this.props} 
                    classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} 
                />;
    }
}

const styles = props => ({
    colorPrimary: {
        backgroundColor: '#fc40006b',
    },
    barColorPrimary: {
        backgroundColor: 'none',
    }
});

export default withStyles(styles)(ErrorLinearProgress);