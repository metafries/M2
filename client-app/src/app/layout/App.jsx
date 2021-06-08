import React, { useEffect } from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import grey from '@material-ui/core/colors/grey';
import PersistentDrawer from '../../components/navigation/PersistentDrawer';
import ActivityCards from '../../components/surfaces/ActivityCards';
import { useStore } from '../store/config';
import { observer } from 'mobx-react-lite';

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
  const { activityStore } = useStore();
  const { loading } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={custom}>
      <CssBaseline />
      <PersistentDrawer/>
      <Container style={{ marginTop: '100px' }} maxWidth='sm'>
        {
          loading
            ? <LinearProgress className={classes.root} />
            : <ActivityCards/>
        }
      </Container>
    </MuiThemeProvider>
  );
}

export default observer(App);