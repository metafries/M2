import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const content = 'textSecondary';

export default function ActivityDesc({description}) {
    return (
        <CardContent>
            <Typography color={content}>
                {description}
            </Typography>
        </CardContent>
    )
}
