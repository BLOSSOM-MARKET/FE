import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';

import style from './Message.module.scss';

const Message = ({userId, text, showName, showTime, myId, time, nickname}) => {
    const isMyMessage = userId === myId;
        
    return (
        <ListItem className={isMyMessage? style.Message__my__wrapper : null}>
            <Stack>
                {showName && 
                <div className={
                    `${isMyMessage? style.Message__my__name : style.Message__other__name}
                    ${style.Message__username}`
                    }>
                    {userId}
                </div>}
                <div className={isMyMessage? style.Message__my : style.Message__other}>{text}</div>
                <div className={style.Message__time}>
                    {showTime && time}
                </div>
            </Stack>
        </ListItem>
                    
    );
}

export default Message;