import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';

const StyledMenu = withStyles({
    paper: {
        color: 'whitesmoke',
        background: 'rgba(28,28,28,0.9)',
        boxShadow: 'none',
        borderRadius: 0,
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
));

function ActivityMenu({
    handleDeleteActivity,
}) {
    const { activityStore } = useStore();
    const { 
        submitting,
        deleteActivity,
        selectedActivity, 
        anchorEl, 
        handleMenuClose 
    } = activityStore;

    const history = useHistory();

    handleDeleteActivity = async id => {
        await deleteActivity(selectedActivity.id);
        history.push('/activities');
    }

    return (
        <React.Fragment>
            <StyledMenu
                id="settings "
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {}}>
                    <ListItemIcon style={{ minWidth: '40px' }}>
                        <BookmarkBorderIcon style={{ color: 'whitesmoke' }} />
                    </ListItemIcon>
                    <Typography>Save</Typography>
                </MenuItem>
                <MenuItem 
                    component={Link} 
                    to = {selectedActivity && `/edit/${selectedActivity.id}`}
                    onClick={() => {}}
                >
                    <ListItemIcon style={{ minWidth: '40px' }}>
                        <EditIcon style={{ color: 'whitesmoke' }} />
                    </ListItemIcon>
                    <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleDeleteActivity(selectedActivity.id)
                }}>
                    <ListItemIcon style={{ minWidth: '40px' }}>
                        {
                            submitting 
                                ? <CircularProgress size={20} /> 
                                : <DeleteForeverIcon style={{ color: 'whitesmoke' }} />
                        }
                    </ListItemIcon>
                    <Typography>Delete</Typography>
                </MenuItem>
            </StyledMenu>
        </React.Fragment>
    )
}

export default observer(ActivityMenu)