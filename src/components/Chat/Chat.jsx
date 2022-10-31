import { useState, useEffect, useRef, useContext } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import "bootstrap-icons/font/bootstrap-icons.css";

import Message from '../Message';
import style from './Chat.module.scss';
import { chatTimeformatter } from '../../utils/formatters';
import { UserContext } from '../../contexts/UserContext';

const Chat = ({messages, submitMessage, myId, yourNick, onClickBackBtn}) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const {roomId} = useContext(UserContext);

    console.log("!!!!!!!Chat messages:", messages)

    const onChange = (e) => {
        setInput(e.currentTarget.value);
    }
    
    const onClick = () => {
        submitMessage(input);
        setInput('');
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const showTime = (prevMsg, thisMsg, nextMsg) => {
        if (!nextMsg) return true;

        const [prevMin, thisMin] = [prevMsg ? chatTimeformatter(prevMsg.sendTime) : null, chatTimeformatter(thisMsg.sendTime)];
        
        const [thisUserId, nextUserId] = [thisMsg.userId, nextMsg.userId];

        if (thisUserId !== nextUserId) {
            return true;
        }

        const nextMin = chatTimeformatter(nextMsg.sendTime);
        if (thisMin !== nextMin) return true;

        return false;
    }

    return (
        <Container maxWidth="sm" className={style.Chat__wrapper}>
            <div className={style.Chat__header}>
                <button className={`btn btn-light ${style.Chat__header__backBtn}`}
                    onClick={onClickBackBtn}
                >
                    {"<"}
                </button>
                <div>
                    <div>{yourNick}</div>
                    <div>상품정보</div>
                </div>
            </div>
            <List className={style.Chat__list} >
                {
                    (messages !== undefined && roomId in messages) &&
                messages[roomId].map(({userId, targetNick, message, sendTime}, index) => 
                              <Message 
                                  key={`${userId}_${index}`}
                                  userId={userId}
                                  myId={myId}
                                  nickname={targetNick}
                                  text={message}
                                  showName={!index || messages[index - 1].userId !== userId}
                                  showTime={showTime(messages[index-1], messages[index], messages[index+1])}
                                  time={chatTimeformatter(sendTime)}
                              />
                             )}
            <div ref={messagesEndRef} />
            </List>
            <Stack direction="row" className={style.Chat__input}>
                <TextField 
                    className={style.Chat__input__textfield}
                    onChange={onChange} 
                    value={input} 
                    placeholder="메시지를 입력하세요." 
                    onKeyPress={(e) => (e.key === "Enter" ? onClick() : null)}
                />
                <Button onClick={onClick} variant="outlined" className={style.Chat__input__button}>전송</Button>
            </Stack>
        </Container>
    )
}

export default Chat;