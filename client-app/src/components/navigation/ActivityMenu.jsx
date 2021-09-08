import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Typography from '@material-ui/core/Typography';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ActivityDeleteConfirm from '../modal/ActivityDeleteConfirm';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

function ActivityMenu() {
    const { commonStore, activityStore } = useStore();
    const {
        selectedActivity,
        anchorEl,
        handleMenuClose
    } = activityStore;

    const listItemIcon = { 
        minWidth: '40px', 
        color: 'whitesmoke',
    };

    return (
        <React.Fragment>
            <Menu
                PaperProps={{
                    style: {
                        color: 'whitesmoke',
                        background: 'rgba(10,10,10,0.9)',
                        boxShadow: 'none',
                        borderRadius: 0,
                    },
                }}
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
                id="settings "
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {
                    selectedActivity && !selectedActivity.isHost &&
                    <MenuItem>
                        <ListItemIcon style={listItemIcon}>
                            <BookmarkBorderIcon/>
                        </ListItemIcon>
                        <Typography>Save</Typography>
                    </MenuItem>
                }
                {
                    selectedActivity && !selectedActivity.isHost &&
                    <MenuItem>
                        <ListItemIcon style={listItemIcon}>
                            <FlagOutlinedIcon/>
                        </ListItemIcon>
                        <Typography>Report</Typography>
                    </MenuItem>
                }
                {
                    selectedActivity && selectedActivity.isHost &&
                    <MenuItem
                        component={Link}
                        to={selectedActivity && `/edit/${selectedActivity.id}`}
                    >
                        <ListItemIcon style={listItemIcon}>
                            <EditOutlinedIcon/>
                        </ListItemIcon>
                        <Typography>Edit</Typography>
                    </MenuItem>
                }
                {
                    selectedActivity && selectedActivity.isHost &&
                    <MenuItem onClick={() => commonStore.openModal(<ActivityDeleteConfirm/>)}>
                        <ListItemIcon style={listItemIcon}>
                            <DeleteOutlineIcon/>
                        </ListItemIcon>
                        <Typography>Delete</Typography>
                    </MenuItem>
                }
            </Menu>
        </React.Fragment>
    )
}

export default observer(ActivityMenu)