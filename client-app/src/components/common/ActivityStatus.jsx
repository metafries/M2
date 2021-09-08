import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';

export default function ActivityStatus({ activity }) {
    return (
        <React.Fragment>
            {
                activity.isCancelled &&
                <List style={{ padding: 0 }}>
                    <ListItem style={{ color: '#fc4000', padding: 0 }}>
                        <ListItemText 
                            style={{ margin: 0, padding: 0 }} 
                            primary={'This activity has been canceled.'} 
                        />
                    </ListItem>
                </List>
            }
        </React.Fragment>
    )
}
