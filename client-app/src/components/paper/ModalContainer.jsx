import { makeStyles, Modal } from '@material-ui/core';
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../app/store/config'

function getModalStyle() {
    const top = 50
    const left = 50
  
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 'auto',
      backdropFilter: 'blur(20px)',
      border: '1px solid #16161680',
      boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      padding: theme.spacing(2, 1, 0, 1),
    },
}));

function ModalContainer() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const { commonStore } = useStore();
            
    return (
        <Modal 
            open={commonStore.modal.open} 
            onClose={commonStore.closeModal}
        >
            <div style={modalStyle} className={classes.paper}>
                {commonStore.modal.body} 
            </div>
        </Modal>
    )
}

export default observer(ModalContainer)