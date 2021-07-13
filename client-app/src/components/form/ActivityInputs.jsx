import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';
import { Link, useParams, useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../utils/FormikTextInput';
import FormikTextArea from '../utils/FormikTextArea';
import FormikSelector from '../utils/FormikSelector';
import { categoryOpts } from '../../app/common/categoryOpts';
import FormikDateTimePicker from '../utils/FormikDateTimePicker';

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
    date: new Date(),
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

  let schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    date: yup.date().min(new Date(), "start date can't be before current time"),
    // endDate: yup.date().min(yup.ref('date'), "end date can't be before start date"),
    city: yup.string().required(),
    venue: yup.string().required(),
  })

  const handleFormSubmit = async (activity) => {
    if (activity.id.length !== 0) {
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
  useEffect(() => {
    console.log('real time change preview of activity object :', activity);
  }, [activity]);

  const classes = useStyles();

  if (loading) return <LinearProgress/>

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      initialValues={activity}
      onSubmit={values => handleFormSubmit(values)}
    >
      {({ handleSubmit, dirty }) => (
        <Dialog
          fullScreen
          open={true}
          onClose={() => { }}
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
                  ? <CircularProgress size={24} />
                  : <Button
                      disabled={!dirty}
                      size='large'
                      onClick={() => handleSubmit()}
                    > 
                      SUBMIT
                    </Button>
              }
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: '55px' }} maxWidth='sm'>
            <Form className={classes.root} autoComplete='off'>
              <FormikTextInput name='title' label='Title' />
              <FormikTextArea name='description' label='Description' rowsMax={4} />
              <FormikSelector name='category' label='Category' opts={categoryOpts} />
              <FormikDateTimePicker name='date' label='Start Date' />
              {/* <FormikDateTimePicker name='endDate' label='End Date' /> */}
              <FormikTextInput name='city' label='City' />
              <FormikTextInput name='venue' label='Venue' />
            </Form>
          </Container>
        </Dialog>
      )}
    </Formik>
  );
}

export default observer(ActivityInputs)