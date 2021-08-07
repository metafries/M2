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
      backgroundColor: '#16161680',
      backdropFilter: 'blur(10px)',
      border: '1px solid #323232',
      boxShadow: '0px 0px 1px 1px #000',
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