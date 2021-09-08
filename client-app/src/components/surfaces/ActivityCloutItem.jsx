import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const avatar = { height: '35px', width: '35px' }

export default function ActivityCloutItem({user, hostUsername}) {
    const { username, displayName, image } = user;
    const isHost = user.username ? user.username === hostUsername : false; //

    return (
        <ListItem button>
            <ListItemAvatar>
                {                    
                    isHost
                        ?   <Badge color="secondary" badgeContent='Host' showZero>
                                <Avatar style={avatar} alt={displayName} src={image || '/'} />
                            </Badge>
                        :   <Avatar style={avatar} alt={displayName} src={image || '/'} />
                }
            </ListItemAvatar>
            <ListItemText 
                style={{ display: 'inline' }} 
                primary={username} 
                secondary={displayName} 
            />
            {
                <ListItemSecondaryAction style={{ color: '#a9a9a9' }}>
                    <PersonAddIcon />
                </ListItemSecondaryAction>
            }
        </ListItem>
    )
}
