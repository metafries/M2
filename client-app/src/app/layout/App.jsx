import React from 'react';
import { Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import grey from '@material-ui/core/colors/grey';
import PersistentDrawer from '../../components/navigation/PersistentDrawer';
import ActivityCards from '../../components/surfaces/ActivityCards';
import { observer } from 'mobx-react-lite';
import Home from '../../components/surfaces/Home';
import ActivityChat from '../../components/surfaces/ActivityChat';
import ActivityInputs from '../../components/form/ActivityInputs';
import ActivityDetails from '../../components/surfaces/ActivityDetails';

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
  return (
    <MuiThemeProvider theme={custom}>
      <CssBaseline />
      <Route exact path='/' component={Home} />
      <Route
        path={'/(.+)'}
        render={() => (
          <React.Fragment>
            <PersistentDrawer />
            <Container style={{ marginTop: '100px' }} maxWidth='sm'>
              <Route exact path='/activities' component={ActivityCards} />
              <Route path={['/create', '/edit/:id']} component={ActivityInputs} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route path='/chat/:id' component={ActivityChat}/>
            </Container>
          </React.Fragment>
        )}
      />
    </MuiThemeProvider>
  );
}

export default observer(App);