import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShareIcon from '@material-ui/icons/Share';
import Chip from '@material-ui/core/Chip';
import ChatIcon from '@material-ui/icons/Chat';
import GradeIcon from '@material-ui/icons/Grade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import ActivityMenu from '../navigation/ActivityMenu';

const active = '#987000';
const inactive = '#a9a9a9';
const actions = '#afadaa';
const content = 'textSecondary';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#2b2c2d00',
            marginBottom: '20px',
            borderRadius: 0,
            maxWidth: 'auto',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
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
        avatar: {
            backgroundColor: grey[700],
        },
    }),
);

function ActivityDetails() {
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

    const history = useHistory();

    const handleChatRoute = id => {
        history.push(`/chat/${id}`);
    }

    const classes = useStyles();

    if (loading || !activity) return <LinearProgress/>

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={`/assets/categoryImages/${activity.category}.jpeg`}
                    title={activity.category}
                />
                <CardHeader
                    avatar={
                        <AvatarGroup max={2}>
                            <Avatar alt="MILAN4WINE" src="/" className={classes.avatar} />
                        </AvatarGroup>
                    }
                    action={
                        <IconButton
                            style={{ color: actions }}
                            onClick={(e) => { 
                                handleMenuClick(e); 
                                handleSelectActivity(activity.id) 
                            }}
                            aria-label="settings"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }

                    titleTypographyProps={{ variant: 'h6' }}
                    title={activity.title}
                    subheader={`milan4wine · ${activity.city}`}
                />
                <CardContent style={{ paddingTop: 0 }}>
                    <Chip size="small" style={{
                        background: '#424242',
                        color: 'whitesmoke',
                        borderRadius: 0,
                        marginTop: '15px'
                    }}
                        label={activity.category}
                    />
                </CardContent>
                <CardContent style={{ paddingTop: 0 }}>
                    <Typography color={content}>
                        0 Interested · 0 Going
            </Typography>
                    <Typography color={content}>
                        {activity.date}
                    </Typography>
                    <Typography color={content}>
                        {activity.venue}
                    </Typography>
                </CardContent>
                <CardActions style={{ paddingTop: 0 }} disableSpacing>
                    <IconButton style={{ color: active }} aria-label="interested">
                        <GradeIcon />
                    </IconButton>
                    <IconButton style={{ color: inactive }} aria-label="going">
                        <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                        onClick={(e) => {
                            handleSelectActivity(activity.id);
                            handleChatRoute(activity.id)
                        }}
                        style={{ color: active }}
                        aria-label="chat"
                    >
                        <ChatIcon />
                    </IconButton>
                    <IconButton
                        component={Link}
                        to='/activities'
                        style={{ color: active }} aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
                <CardContent>
                    <Typography color={content}>
                        {activity.description}
                    </Typography>
                </CardContent>
            </Card>
            <ActivityMenu />
        </React.Fragment>
    )
}

export default observer(ActivityDetails)