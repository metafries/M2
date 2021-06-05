import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import ActivityInputs from '../form/ActivityInputs';

const drawerWidth = '100%';
const bodyBg = '#1e1e1f';
const appBarBg = '#ffff00';

const logo = { height: '25px', width: 'auto' };
const closeDrawerBtn = { color: appBarBg, fontSize: 35 };
const drawerOpts = { color: appBarBg };
const divider = { height: '3px' };

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            background: appBarBg,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth})`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        },
        title: {
            flexGrow: 1,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            background: 'rgba(124,124,0,0.9)',
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginRight: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        },
    }),
);

export default function PersistentDrawer({
    submitting,
    handleClickOpen,
    handleClose,
    showActivityInputs,
    openPersistentDrawer,
}) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openPersistentDrawer,
                })}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        <img alt='icon' style={logo} src='/assets/logoIcon.png' />
                        <img alt='metaFries' style={logo} src='/assets/logoText.png' />
                    </Typography>
                    <IconButton
                        style={{ color: bodyBg }}
                        aria-label="open drawer"
                        edge="end"
                        onClick={() => handleClickOpen('persistentDrawer')}
                        className={clsx(openPersistentDrawer && classes.hide)}
                    >
                        <MenuIcon style={{ height: '30px', width: 'auto' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={openPersistentDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => handleClose('persistentDrawer')}>
                        {
                            theme.direction === 'rtl'
                                ? <ChevronLeftIcon style={closeDrawerBtn} />
                                : <ChevronRightIcon style={closeDrawerBtn} />
                        }
                    </IconButton>
                </div>
                <Divider style={divider} />
                <List style={drawerOpts}>
                    <ListItem button>
                        <ListItemIcon><ViewListIcon style={drawerOpts} /></ListItemIcon>
                        <ListItemText primary='DISCOVER ACTIVITIES' />
                    </ListItem>
                </List>
                <Divider style={divider} />
                <List style={drawerOpts}>
                    <ListItem onClick={() => handleClickOpen('activityInputs')} button>
                        <ListItemIcon><PostAddIcon style={drawerOpts} /></ListItemIcon>
                        <ListItemText primary='CREATE NEW ACTIVITY' />
                    </ListItem>
                </List>
            </Drawer>
            <ActivityInputs
                submitting={submitting}
                selectedActivity={{}}
                open={showActivityInputs}
                handleClose={handleClose}
            />
        </div>

    )
}