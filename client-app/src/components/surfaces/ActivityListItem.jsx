import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import ActivityTags from '../common/ActivityTags';
import ActivityHeader from '../common/ActivityHeader';
import Typography from '@material-ui/core/Typography';
import ActivityActions from '../common/ActivityActions';
import ActivityDesc from '../common/ActivityDesc';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import { format } from 'date-fns'

const actions = '#afadaa';
const content = 'textSecondary';
const menuStyle = {
    color: 'whitesmoke',
    background: 'rgba(10,10,10,0.2)',
    boxShadow: 'none',
    borderRadius: 0,
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#1e1e1f',
            marginBottom: '10px',
            borderRadius: 0,
            maxWidth: 'auto',
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        overlay: {
            height: '100%',
            width: '100%',
            bottom: 0,
            position: 'absolute', /* Position the background text */
            background: 'rgba(0, 0, 0, 0.7)', /* Black background with 0.7 opacity */
            padding: '16px', /* Some padding */
        },
    }),
);

function ActivityListItem({ activity }) {
    const { activityStore } = useStore();
    const {
        expandIds,
        handleMenuClick,
        handleSelectActivity
    } = activityStore;

    const [flags, setFlags] = React.useState({ ...expandIds });
    const handleExpandClick = (id) => {
        flags[id] = !flags[id];
        setFlags({ ...flags});
    };

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <ActivityHeader
                menuStyle={menuStyle}
                activity={activity}
                handleMenuClick={handleMenuClick}
                handleSelectActivity={handleSelectActivity}
            />
            <Link to={`/activities/${activity.id}`}>
                <div style={{ position: 'relative' }}>
                    <CardMedia
                        className={classes.media}
                        image={`/assets/categoryImages/${activity.category}.jpeg`}
                        title={activity.category}
                    />
                    <div className={classes.overlay}>
                        <div style={{ position: 'absolute', bottom: '16px' }}>
                            <Typography color={content}>
                                0 Interested · 0 Going
                            </Typography>
                            <Typography color={content}>
                                {format(activity.date, 'dd MMM yyyy h:mm aa')}
                            </Typography>
                            <Typography color={content}>
                                {activity.venue}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Link>
            <CardActions disableSpacing>
                <ActivityActions
                    activity={activity}
                    handleSelectActivity={handleSelectActivity}
                />
                <IconButton
                    style={{ color: actions }}
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: flags[activity.id],
                    })}
                    onClick={() => handleExpandClick(activity.id)}
                    aria-expanded={flags[activity.id]}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={flags[activity.id]} timeout="auto" unmountOnExit>
                <ActivityTags category={activity.category} />
                <ActivityDesc description={activity.description} />
            </Collapse>
        </Card>
    );
}

export default observer(ActivityListItem)