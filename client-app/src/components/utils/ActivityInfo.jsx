import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import ActivityClout from '../paper/ActivityClout';

const content = 'textSecondary';
const CustomBtn = withStyles({
    root: {
        color: '#afadaa',
        padding: 0,
    }
})(Button);

function ActivityInfo({ activity }) {
    const { activityStore } = useStore();
    const { setOpenActivityClout } = activityStore;

    return (
        <CardContent style={{ paddingTop: 0 }}>
            <Typography color={content}>
                <CustomBtn onClick={() => setOpenActivityClout(true)}> 
                    0 Interested · 0 Going
                </CustomBtn>
                <ActivityClout/>
            </Typography>
            <Typography color={content}>
                {activity.date}
            </Typography>
            <Typography color={content}>
                {activity.venue}
            </Typography>
        </CardContent>
    )
}

export default observer(ActivityInfo)