import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GradeIcon from '@material-ui/icons/Grade';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShareIcon from '@material-ui/icons/Share';
import ChatIcon from '@material-ui/icons/Chat';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/store/config';
import { CircularProgress } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';

const active = '#987000';
const inactive = '#a9a9a9';

function ActivityActions({
    activity,
    handleSelectActivity,
}) {
    const history = useHistory();  
    const handleChatRoute = id => {
        history.push(`/chat/${id}`);
    }
    const isGoing = activity.isGoing ? active : inactive;
    const isCancelled = activity.isCancelled ? active : inactive;
    const { 
        activityStore: { 
            cancelActivity, 
            selectedActivity, 
            updateAttendance, 
            submitting,
        },
    } = useStore();

    return (
        <React.Fragment>
            {
                activity.isHost &&
                <IconButton 
                    onClick={() => {
                        handleSelectActivity(activity.id);
                        cancelActivity();
                    }}  
                    style={{ color: isCancelled }} 
                    aria-label="cancel"
                >
                    {
                        submitting && (selectedActivity.id === activity.id)
                            ? <CircularProgress size={20} /> 
                            : <BlockIcon />
                    }
                 </IconButton>
            }
            {
                !activity.isHost &&
                <IconButton style={{ color: inactive }} aria-label="interested">
                    <GradeIcon />
                </IconButton>
            }
            {
                !activity.isHost && !activity.isCancelled &&
                <IconButton
                    onClick={() => {
                        handleSelectActivity(activity.id);
                        updateAttendance();
                    }}
                    style={{ color: isGoing }}
                    aria-label="going"
                >
                    {
                        submitting && (selectedActivity.id === activity.id)
                            ? <CircularProgress size={20} /> 
                            : <CheckCircleIcon />
                    }
                </IconButton>
            }
            <IconButton
                onClick={(e) => {
                    handleSelectActivity(activity.id);
                    handleChatRoute(activity.id)
                }}
                style={{ color: active }}
                aria-label="chat"
            >
                <ChatIcon />
            </IconButton>
            <IconButton style={{ color: inactive }} aria-label="share">
                <ShareIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default observer(ActivityActions)