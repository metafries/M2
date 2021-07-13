import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GradeIcon from '@material-ui/icons/Grade';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShareIcon from '@material-ui/icons/Share';
import ChatIcon from '@material-ui/icons/Chat';
import { useHistory } from 'react-router-dom';

const active = '#987000';
const inactive = '#a9a9a9';

export default function ActivityActions({
    activity,
    handleSelectActivity,
}) {
    const history = useHistory();  
    const handleChatRoute = id => {
        history.push(`/chat/${id}`);
    }

    return (
        <React.Fragment>
            <IconButton style={{ color: inactive }} aria-label="interested">
                <GradeIcon />
            </IconButton>
            <IconButton style={{ color: inactive }} aria-label="going">
                <CheckCircleIcon />
            </IconButton>
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
