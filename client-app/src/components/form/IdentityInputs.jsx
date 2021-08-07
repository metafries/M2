import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/store/config';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import DialogContent from '@material-ui/core/DialogContent';
import { Formik, Form } from 'formik';
import FormikTextInput from '../utils/FormikTextInput';
import { Button, CircularProgress } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import * as yup from 'yup';
import Validation from '../errors/Validation';

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function IdentityInputs() {
    const { accountStore, appStore } = useStore();
    const { openIdentityInputs, setOpenIdentityInputs } = appStore;
    const { register, login } = accountStore;

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let registerSchema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required(),
    })

    const classes = useStyles();

    return (
        <Dialog
            fullScreen
            scroll='paper'
            open={openIdentityInputs}
            onClose={() => setOpenIdentityInputs(false)}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        style={{ float: 'right' }}
                        edge="start"
                        color="inherit"
                        onClick={() => setOpenIdentityInputs(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Tabs
                        indicatorColor="primary"
                        style={{ padding: 0 }}
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label='Login' {...a11yProps(0)} />
                        <Tab label='Register' {...a11yProps(1)} />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '68px' }} maxWidth='sm'>
                <DialogContent style={{ padding: 0 }}>
                    <TabPanel value={value} index={0}>
                        <Formik
                            initialValues={{ email: '', password: '', error: null }}
                            onSubmit={(v, { setErrors }) => login(v).catch(e => setErrors({
                                error: 'Invalid email or password'
                            }))}
                        >
                            {({ handleSubmit, isSubmitting, errors }) => (
                                <Form className={classes.root} autoComplete='off'>
                                    <FormikTextInput name='email' label='Email' />
                                    <FormikTextInput name='password' label='Password' type='password' />
                                    {
                                        errors.error &&
                                        <List style={{ margin: 0, color: 'red' }}>
                                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                                                    <ErrorOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={errors.error} />
                                            </ListItem>
                                        </List>
                                    }
                                    <Button type='submit' style={{ borderRadius: 0 }} variant="outlined">
                                        {isSubmitting ? <CircularProgress size={20} /> : 'Log In'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </TabPanel>
                </DialogContent>
                <DialogContent style={{ padding: 0 }}>
                    <TabPanel value={value} index={1}>
                        <Formik
                            initialValues={{ username: '', email: '', password: '', error: null }}
                            validationSchema={registerSchema}
                            onSubmit={(v, { setErrors }) => register(v).catch(e => setErrors({error: e}))}
                        >
                            {({ handleSubmit, isSubmitting, errors }) => (
                                <Form className={classes.root} autoComplete='off'>
                                    <FormikTextInput name='username' label='Username' />
                                    <FormikTextInput name='email' label='Email' />
                                    <FormikTextInput type='password' name='password' label='Password' />
                                    { errors.error && <Validation errors={errors.error} /> }
                                    <Button type='submit' style={{ borderRadius: 0 }} variant="outlined">
                                        {isSubmitting ? <CircularProgress size={20} /> : 'Sign up'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </TabPanel>
                </DialogContent>
            </Container>
        </Dialog>
    )
}

export default observer(IdentityInputs)