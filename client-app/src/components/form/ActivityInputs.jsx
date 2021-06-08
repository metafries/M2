import React, { useEffect, useState } from 'react';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';

const custom = createMuiTheme({
  palette: {
    primary: {
      main: '#000000de',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      width: '100%',
    },
  },
  appBar: {
    color: '#1e1e1f',
    background: '#ffff00',
    position: 'fixed',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ActivityInputs() {
  const { appStore, activityStore } = useStore();
  const { setOpenPersistentDrawer } = appStore;
  const { 
    submitting,
    updateActivity,
    createActivity, 
    setShowActivityInputs, 
    showActivityInputs: open, 
    selectedActivity, 
    handleMenuClose 
  } = activityStore;
  
  console.log('selectedActivity:', selectedActivity)
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }
  const [activity, setActivity] = useState({});
  const handleSubmit = async () => {
    const finalData = {};
    for (const [k, v] of Object.entries(initialState)) {
      activity.hasOwnProperty(k) ? finalData[k] = activity[k] : finalData[k] = v;
    }
    console.log('handleSubmit:', finalData);
    if(selectedActivity && selectedActivity.hasOwnProperty('id')) {
      await updateActivity(finalData);
      setShowActivityInputs(false);
      handleMenuClose();
      setActivity({});
    } else {
      await createActivity(finalData);
      setShowActivityInputs(false);
      setOpenPersistentDrawer(false);
      setActivity({});
    }
  }
  const handleChange = event => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
  useEffect(() => {
    console.log('real time change preview of activity object :', activity);
  }, [activity]);

  const classes = useStyles();

  return (
    <Dialog 
      fullScreen 
      open={open} 
      onClose={() => {
        setShowActivityInputs(false);
        setActivity({});
      }}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" onClick={() => {
            setShowActivityInputs(false);
            setActivity({});
          }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {selectedActivity ? 'EDIT ACTIVITY' : 'CREATE ACTIVITY'} 
          </Typography>
          {
            submitting
              ? <MuiThemeProvider theme={custom}>
                  <CircularProgress size={24} />
                </MuiThemeProvider>
              : <Button size='large' autoFocus onClick={() => {
                  handleSubmit();
                }}>
                  SUBMIT
                </Button>
          }
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '55px' }} maxWidth='md'>
        <form className={classes.root} autoComplete='off'>
          <MuiThemeProvider theme={custom}>
            <FormControl>
              <FormHelperText>Title</FormHelperText>
              <Input
                value={activity.hasOwnProperty('title') ? activity.title : initialState.title}
                name='title'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Description</FormHelperText>
              <Input
                value={activity.hasOwnProperty('description') ? activity.description : initialState.description}
                name='description'
                onChange={handleChange}
                multiline={true}
                rowsMax={4}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Category</FormHelperText>
              <Input
                value={activity.hasOwnProperty('category') ? activity.category : initialState.category}
                name='category'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Date</FormHelperText>
              <Input
                type='date'
                value={activity.hasOwnProperty('date') ? activity.date : initialState.date}
                name='date'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>City</FormHelperText>
              <Input
                value={activity.hasOwnProperty('city') ? activity.city : initialState.city}
                name='city'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Venue</FormHelperText>
              <Input
                value={activity.hasOwnProperty('venue') ? activity.venue : initialState.venue}
                name='venue'
                onChange={handleChange}
              />
            </FormControl>
          </MuiThemeProvider>
        </form>
      </Container>
    </Dialog>
  );
}

export default observer(ActivityInputs)