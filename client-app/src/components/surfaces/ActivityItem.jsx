import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import ActivityTags from '../utils/ActivityTags'
import ActivityHeader from '../utils/ActivityHeader';
import ActivityMedia from '../utils/ActivityMedia';
import ActivityInfo from '../utils/ActivityInfo';
import ActivityActions from '../utils/ActivityActions';
import ActivityDesc from '../utils/ActivityDesc';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#1e1e1f',
            borderRadius: 0,
            maxWidth: 'auto',
        },
    }),
);

const menuStyle = {
    color: 'whitesmoke',
    background: 'rgba(10,10,10,0.9)',
    boxShadow: 'none',
    borderRadius: 0,
}

function ActivityItem() {
    const { activityStore } = useStore();
    const {
        loading,
        loadActivity,
        handleSelectActivity,
        handleMenuClick,
        selectedActivity: activity
    } = activityStore;

    const { id } = useParams();
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    const classes = useStyles();
    console.log('selectedActivity', activity)

    if (loading || !activity) return <LinearProgress />

    return (
        <Card className={classes.root}>
            <ActivityMedia category={activity.category} />
            <ActivityHeader
                menuStyle={menuStyle}
                activity={activity}
                handleMenuClick={handleMenuClick}
                handleSelectActivity={handleSelectActivity}
            />
            <ActivityInfo activity={activity} />
            <CardActions>
                <ActivityActions
                    activity={activity}
                    handleSelectActivity={handleSelectActivity}
                />
            </CardActions>
            <ActivityTags category={activity.category} />
            <ActivityDesc description={activity.description} />
        </Card>
    )
}

export default observer(ActivityItem)