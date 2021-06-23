import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActivityMenu from '../navigation/ActivityMenu';

const actions = '#afadaa';

const useStyles = makeStyles((theme) =>
    createStyles({
        avatar: {
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
                            alt="MILAN4WINE" 
                            src="/" 
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
                subheader={`milan4wine · ${activity.city}`}
            />
            <ActivityMenu menuStyle={menuStyle} />
        </React.Fragment>
    )
}
