import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ActivityInputs from '../form/ActivityInputs';

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

export default function ActivityMenu({
    handleClose,
    showActivityInputs,
    selectedActivity,
    anchorEl,
    handleMenuClose,
    handleClickOpen,
    handleCreateOrEditActivity,
    handleDeleteActivity,
}) {
    return (
        <React.Fragment>
            <StyledMenu
                id="settings "
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleClickOpen('activityInputs')}>
                    <ListItemIcon style={{ minWidth: '40px' }}>
                        <BookmarkBorderIcon style={{ color: 'whitesmoke' }} />
                    </ListItemIcon>
                    <Typography>Save</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleClickOpen('activityInputs') }}>
                    <ListItemIcon style={{ minWidth: '40px' }}>
                        <EditIcon style={{ color: 'whitesmoke' }} />
                    </ListItemIcon>
                    <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleDeleteActivity(selectedActivity.id);
                    handleMenuClose();
                }}>
                    <ListItemIcon style={{ minWidth: '40px' }}>
                        <DeleteForeverIcon style={{ color: 'whitesmoke' }} />
                    </ListItemIcon>
                    <Typography>Delete</Typography>
                </MenuItem>
            </StyledMenu>
            <ActivityInputs
                selectedActivity={selectedActivity}
                open={showActivityInputs}
                handleClose={handleClose}
                handleCreateOrEditActivity={handleCreateOrEditActivity}
                handleMenuClose={handleMenuClose}
            />
        </React.Fragment>
    )
}
