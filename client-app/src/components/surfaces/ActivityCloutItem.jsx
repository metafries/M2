import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const avatar = { height: '35px', width: '35px' }

export default function ActivityCloutItem({user}) {
    const { primary, secondary, person, isHost } = user
    return (
        <ListItem button>
            <ListItemAvatar>
                {                    
                    isHost
                        ?   <Badge color="secondary" badgeContent='Host' showZero>
                                <Avatar style={avatar} alt="Profile Picture" src={person} />
                            </Badge>
                        :   <Avatar style={avatar} alt="Profile Picture" src={person} />
                }
            </ListItemAvatar>
            <ListItemText style={{ display: 'inline' }} primary={primary} secondary={secondary} />
            {
                secondary.length === 0 &&
                    <ListItemSecondaryAction style={{ color: '#a9a9a9' }}>
                        <PersonAddIcon />
                    </ListItemSecondaryAction>
            }
        </ListItem>
    )
}
