import React, { useEffect, useState } from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import grey from '@material-ui/core/colors/grey';
import { v4 as uuidv4 } from 'uuid';
import agent from '../api/agent';
import PersistentDrawer from '../../components/navigation/PersistentDrawer';
import ActivityCards from '../../components/surfaces/ActivityCards';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const custom = createMuiTheme({
  palette: {
    primary: {
      main: grey[600],
    },
    text: {
      secondary: "#afadaa"
    }
  },
  typography: {
    h6: {
      fontSize: '1rem',
    },
    fontFamily: 'Oswald, sans-serif'
  },
});

function App() {
  const classes = useStyles();
  const [activities, setActivities] = useState();
  const [expandIds, setExpandIds] = useState();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmittiing] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(data => {
      const flags = {};
      const activities = [];
      data.forEach(element => {
        console.log(element);
        flags[element.id] = false;
        element.date = element.date.split('T')[0];
        activities.push(element);
      });
      setExpandIds(flags);
      setActivities(activities);
      setLoading(false);
    })
  }, [])

  const [openPersistentDrawer, setOpenPersistentDrawer] = React.useState(false);
  const [showActivityInputs, setShowActivityInputs] = React.useState(false);

  const handleClickOpen = (component) => {
    switch (component) {
      case 'persistentDrawer':
        setOpenPersistentDrawer(true);
        break;
      case 'activityInputs':
        setShowActivityInputs(true);
        break;
      default:
        console.log(`error: '${component}' not found.`)
    }
  };
  const handleClose = (component) => {
    switch (component) {
      case 'persistentDrawer':
        setOpenPersistentDrawer(false);
        break;
      case 'activityInputs':
        setShowActivityInputs(false);
        break;
      default:
        setOpenPersistentDrawer(false);
        setShowActivityInputs(false);
    }
  };

  const handleCreateOrEditActivity = (activity) => {
    setSubmittiing(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSubmittiing(false);
        handleClose();
      })
    } else {
      activity.id = uuidv4();
      console.log('submit:', activity);
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSubmittiing(false);
        handleClose();
      })
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedActivity, setSelectedActivity] = useState();

  const handleSelectActivity = (id) => {
      setSelectedActivity(activities.find(x => x.id === id));
  }  
  const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
      handleSelectActivity('');
  };
  const handleDeleteActivity = (id) => {
    setSubmittiing(true);
    agent.Activities.delete(id).then(() => {
      setSubmittiing(false);
      handleMenuClose();
      setActivities([...activities.filter(x => x.id !== id)])
    })
  }

  return (
    <MuiThemeProvider theme={custom}>
      <CssBaseline />
      <PersistentDrawer
        submitting={submitting}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        showActivityInputs={showActivityInputs}
        openPersistentDrawer={openPersistentDrawer}
      />
      <Container style={{ marginTop: '100px' }} maxWidth='sm'>
        {
          loading
            ? <LinearProgress className={classes.root} />
            : <ActivityCards
                handleSelectActivity={handleSelectActivity}
                handleMenuClose={handleMenuClose}
                handleMenuClick={handleMenuClick}
                selectedActivity={selectedActivity}
                anchorEl={anchorEl}
                submitting={submitting}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                showActivityInputs={showActivityInputs}
                expandIds={expandIds}
                activities={activities}
                handleCreateOrEditActivity={handleCreateOrEditActivity}
                handleDeleteActivity={handleDeleteActivity}
              />
        }
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
