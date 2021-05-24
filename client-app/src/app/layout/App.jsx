import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { v4 as uuidv4 } from 'uuid';
import PersistentDrawer from '../../components/navigation/PersistentDrawer';
import ActivityCards from '../../components/surfaces/ActivityCards';

const custom = createMuiTheme({
  palette: {
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
  const [activities, setActivities] = useState();
  const [expandIds, setExpandIds] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      const data = response.data;
      setActivities(data);
      const flags = {};
      data.forEach(element => {
        console.log(element);
        flags[element.id] = false;
      });
      setExpandIds(flags);
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
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuidv4()}]);
  }

  const handleDeleteActivity = (id) => {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <MuiThemeProvider theme={custom}>
      <CssBaseline />
      <PersistentDrawer
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        showActivityInputs={showActivityInputs}
        openPersistentDrawer={openPersistentDrawer}
      />
      <Container style={{ marginTop: '100px' }} maxWidth='sm'>
        <ActivityCards
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          showActivityInputs={showActivityInputs}
          expandIds={expandIds}
          activities={activities}
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
