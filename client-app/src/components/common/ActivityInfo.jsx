import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import ActivityClout from '../paper/ActivityClout';
import { format } from 'date-fns'
import ActivityStatus from './ActivityStatus';

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
            <ActivityStatus activity={activity} />
            <Typography color={content}>
                <CustomBtn onClick={() => setOpenActivityClout(true)}>
                    {`-- Interested · ${activity.attendees.length} Going`}
                </CustomBtn>
                <ActivityClout activity={activity} />
            </Typography>
            <Typography color={content}>
                {format(activity.date, 'dd MMM yyyy h:mm aa')}
            </Typography>
            <Typography color={content}>
                {activity.venue}
            </Typography>
        </CardContent>
    )
}

export default observer(ActivityInfo)