import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/store/config';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import { KeyboardDatePicker } from "@material-ui/pickers";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import { List } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#ffff00',
    position: 'fixed',
  },
  title: {
    color: '#1e1e1f',
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ActivitySearch() {
  const { activityStore } = useStore();
  const { openActivitySearch, setOpenActivitySearch } = activityStore;

  const [filter, setFilter] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [state, setState] = useState({
    going: true,
    hosting: true,
  });

  const noChecked = () => {
    return !(state.going && state.hosting)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setFilter(true);
    } else if (noChecked()) {
      setFilter(false);
    }
  }; 

  const handleChange = (event) => {
    const checked = event.target.checked;
    setState({ ...state, [event.target.name]: checked });
    if (checked) {
      setFilter(true);
    } else if (noChecked() && !selectedDate) {
      setFilter(false);
    }
  };

  const clearCheck = {
    going: false,
    hosting: false,
  }

  const handleDelete = () => {
    setFilter(false);
    setSelectedDate(null);
    setState(clearCheck);
  };

  const classes = useStyles();

  return (
      <Dialog
        fullScreen
        open={openActivitySearch}
        onClose={(() => setOpenActivitySearch(false))}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setOpenActivitySearch(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              SEARCH
            </Typography>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '85px' }} maxWidth='sm'>          
          <KeyboardDatePicker
            clearable
            style={{ width: '100%' }}
            value={selectedDate}
            onChange={handleDateChange}
            animateYearScrolling
            format="yyyy-MM-dd"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hosting}
                onChange={handleChange}
                name="hosting"
                color="primary"
              />
            }
            label="I'm hosting"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.going}
                onChange={handleChange}
                name="going"
                color="primary"
              />
            }
            label="I'm going"
          />
        </Container>
        <div style={{ position: 'fixed', left: 0, width: '100%', bottom: 0, backgroundColor: '#afadaa' }}>
          <Container maxWidth='sm'>
            <List>
              <ListItem style={{padding:0}} >
                <FormControl fullWidth>
                  {
                    filter
                      ? <Input 
                          autoFocus 
                          startAdornment={
                            <InputAdornment position="start">
                              <Chip 
                                onDelete={handleDelete}
                                icon={<FilterListIcon/>} 
                                size="small" 
                                label="Filter" 
                              />
                            </InputAdornment>
                          }
                        />
                      : <Input autoFocus/>
                  }
                </FormControl>
                <IconButton
                  edge="start"
                  onClick={() => setOpenActivitySearch(false)}
                  aria-label="close"
                >
                  <SearchIcon style={{ color: '#000000', fontSize: 30}} />
                </IconButton>
              </ListItem>
            </List>
          </Container>
        </div>
      </Dialog>
  );
}

export default observer(ActivitySearch)