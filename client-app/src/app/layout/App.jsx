import React from 'react';
import { Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PersistentDrawer from '../../components/navigation/PersistentDrawer';
import ActivityList from '../../components/paper/ActivityList';
import { observer } from 'mobx-react-lite';
import LandingPage from '../../components/paper/LandingPage';
import ActivityChat from '../../components/surfaces/ActivityChat';
import ActivityInputs from '../../components/form/ActivityInputs';
import ActivityItem from '../../components/surfaces/ActivityItem';

const custom = createMuiTheme({
  palette: {
    primary: {
      main: '#2b2c2d',
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
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiThemeProvider theme={custom}>
        <CssBaseline />
        <Route exact path='/' component={LandingPage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <React.Fragment>
              <PersistentDrawer />
              <Container 
                style={{ paddingLeft: 0, paddingRight: 0 }}
                maxWidth='sm'
              >
                <Route exact path='/activities' component={ActivityList} />
                <Route path={['/create', '/edit/:id']} component={ActivityInputs} />
                <Route path='/activities/:id' component={ActivityItem} />
                <Route path='/chat/:id' component={ActivityChat} />
              </Container>
            </React.Fragment>
          )}
        />
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default observer(App);