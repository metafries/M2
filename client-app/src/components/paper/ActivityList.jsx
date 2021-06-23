import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import ActivityListItem from '../surfaces/ActivityListItem';
import ActivityClout from './ActivityClout';

const useProgressStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

function ActivityList() {
    const { activityStore } = useStore();
    const {
        activityRegistry,
        loadActivities,
        loading,
        groupedActivities,
    } = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    const progressClasses = useProgressStyles();

    if (loading) return <LinearProgress className={progressClasses.root} />

    return (
        <React.Fragment>
            {groupedActivities.map(([group, activities]) => (
                    <React.Fragment key={group}>
                        {
                            activities.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))
                        }
                    </React.Fragment>
            ))}
            <ActivityClout/>
        </React.Fragment>
    );
}

export default observer(ActivityList)