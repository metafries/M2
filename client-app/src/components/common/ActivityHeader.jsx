import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const actions = '#afadaa';

const useStyles = makeStyles((theme) =>
    createStyles({
        avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            backgroundColor: grey[700],
        },
    }),
);

export default function ActivityHeader({
    menuStyle,
    activity,
    handleMenuClick,
    handleSelectActivity,
}) {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <CardHeader
                avatar={
                    <AvatarGroup max={2}>
                        <Avatar 
                            alt={activity.host.displayName} 
                            src={activity.host.image || '/'}
                            className={classes.avatar} 
                        />
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
                subheader={`${activity.hostUsername} · ${activity.city}`}
            />
        </React.Fragment>
    )
}
