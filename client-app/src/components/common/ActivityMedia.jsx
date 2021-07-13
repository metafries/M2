import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) =>
    createStyles({
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
    }),
);

export default function ActivityMedia({category}) {
    const classes = useStyles();
    
    return (
        <CardMedia
            className={classes.media}
            image={`/assets/categoryImages/${category}.jpeg`}
            title={category}
        />
    )
}
