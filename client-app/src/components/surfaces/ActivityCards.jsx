import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShareIcon from '@material-ui/icons/Share';
import Chip from '@material-ui/core/Chip';
import ChatIcon from '@material-ui/icons/Chat';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GradeIcon from '@material-ui/icons/Grade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActivityMenu from '../navigation/ActivityMenu';

const active = '#987000';
const inactive = '#a9a9a9';
const actions = '#afadaa';
const content = 'textSecondary';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#2B2C2D',
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

export default function ActivityCards({
    handleSelectActivity,
    handleMenuClose,
    handleMenuClick,
    selectedActivity,
    anchorEl,
    submitting,
    handleClickOpen,
    handleClose,
    showActivityInputs,
    expandIds,
    activities,
    handleCreateOrEditActivity,
    handleDeleteActivity,
}) {
    const classes = useStyles();
    const [flags, setFlags] = React.useState({ ...expandIds });
    const handleExpandClick = (id) => {
        flags[id] = !flags[id];
        setFlags({ ...flags });
    };

    return (
        <React.Fragment>
            {activities && activities.map(activity => (
                <Card className={classes.root} key={activity.id}>
                    <CardHeader
                        avatar={
                            <AvatarGroup max={2}>
                                <Avatar alt="MILAN4WINE" src="/" className={classes.avatar} />
                            </AvatarGroup>
                        }
                        action={
                            <IconButton
                                style={{ color: actions }}
                                onClick={(e) => { handleMenuClick(e); handleSelectActivity(activity.id) }}
                                aria-label="settings"
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                        titleTypographyProps={{ variant: 'h6' }}
                        title={activity.title}
                        subheader={`milan4wine · ${activity.city}`}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`/assets/categoryImages/${activity.category}.jpeg`}
                        title={activity.category}
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
                        <IconButton style={{ color: active }} aria-label="chat">
                            <ChatIcon />
                        </IconButton>
                        <IconButton style={{ color: active }} aria-label="share">
                            <ShareIcon />
                        </IconButton>
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
                        <CardContent>
                            <Typography color={content}>
                                {activity.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
            <ActivityMenu
                submitting={submitting}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                showActivityInputs={showActivityInputs}
                selectedActivity={selectedActivity}
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
                handleCreateOrEditActivity={handleCreateOrEditActivity}
                handleDeleteActivity={handleDeleteActivity}
            />
        </React.Fragment>
    );
}
