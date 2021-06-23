import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

export default function ActivityTags({ category }) {
    return (
        <CardContent style={{ paddingTop: 0 }}>
            <Chip
                size="small"
                style={{
                    background: '#424242',
                    color: 'whitesmoke',
                    borderRadius: 0,
                    marginTop: '15px'
                }}
                label={category}
            />
        </CardContent>
    )
}
