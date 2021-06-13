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
import { Link, useParams, useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

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
    loading,
    loadActivity,
    submitting,
    updateActivity,
    createActivity, 
    handleMenuClose 
  } = activityStore;
  
  const { id } = useParams();
  const history = useHistory();
  console.log('history:', history)

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });
  const [closeRoute, setCloseRoute] = useState('/');

  useEffect(() => {
    if (id) {
      setCloseRoute(`/activities/${id}`);
      loadActivity(id).then(activity => {
        setActivity(activity);
      })
    } else {
      setCloseRoute('/activities');
    }
  },[id, loadActivity]);

  const handleSubmit = async () => {
    if(activity.id.length !== 0) {
      await updateActivity(activity);
      handleMenuClose();
      history.push(`/activities/${activity.id}`)
    } else {
      const newActivity = {
        ...activity,
        id: uuidv4(),
      }
      await createActivity(newActivity);
      setOpenPersistentDrawer(false);
      history.push(`/activities/${newActivity.id}`);
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

  if (loading) return <LinearProgress/>

  return (
    <Dialog 
      fullScreen 
      open={true} 
      onClose={() => {}}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton 
            component={Link}
            to={closeRoute}
            edge="start" 
            onClick={() => {
              setOpenPersistentDrawer(false);
              handleMenuClose();
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {activity.id.length !== 0 ? 'EDIT ACTIVITY' : 'CREATE ACTIVITY'} 
          </Typography>
          {
            submitting
              ? <MuiThemeProvider theme={custom}>
                  <CircularProgress size={24} />
                </MuiThemeProvider>
              : <Button 
                  size='large' 
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  SUBMIT
                </Button>
          }
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '55px' }} maxWidth='sm'>
        <form className={classes.root} autoComplete='off'>
          <MuiThemeProvider theme={custom}>
            <FormControl>
              <FormHelperText>Title</FormHelperText>
              <Input
                value={activity.title}
                name='title'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Description</FormHelperText>
              <Input
                value={activity.description}
                name='description'
                onChange={handleChange}
                multiline={true}
                rowsMax={4}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Category</FormHelperText>
              <Input
                value={activity.category}
                name='category'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Date</FormHelperText>
              <Input
                type='date'
                value={activity.date}
                name='date'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>City</FormHelperText>
              <Input
                value={activity.city}
                name='city'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormHelperText>Venue</FormHelperText>
              <Input
                value={activity.venue}
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