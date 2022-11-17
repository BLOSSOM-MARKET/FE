import { useState, useEffect, useRef, useContext } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import "bootstrap-icons/font/bootstrap-icons.css";

import Message from '../Message';
import style from './Chat.module.scss';
import { chatDateFormatter, chatTimeformatter } from '../../utils/formatters';
import moment from 'moment/moment';
import { ChattingContext } from '../../contexts/ChattingContext';

const Chat = ({messages, submitMessage, myId, yourNick, onClickBackBtn}) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const { roomId, productId, productName, productImg } = useContext(ChattingContext);

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

    // 상품정보 가져오기
    useEffect(() => {
        

    }, []);

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

    const isSameDay = (time1, time2) => {
        return moment(time1).isSame(time2, "day");
    }

    return (
        <Container maxWidth="sm" className={style.Chat__wrapper}>
            <div className={style.Chat__header}>
                <button className={`btn btn-light ${style.Chat__header__backBtn}`}
                    onClick={onClickBackBtn}
                >
                    {"<"}
                </button>
                <div className={style.Chat__header__inner}>
                    <div className={style.Chat__header__img__wrapper}>
                        <img src={productImg} alt="product_img" className={style.Chat__header__img}/>
                    </div>
                    <div>
                        <div className={style.Chat__header__nickname}>{yourNick}</div>
                        <div className={style.Chat__header__productName}>{productName}</div>
                    </div>
                </div>
            </div>
            <List className={style.Chat__list} >
                {
                messages.map(({userId, targetNick, message, sendTime}, index) => (
                    <div key={`time_${userId}_${index}`}>
                        {
                            (messages[index-1] && !isSameDay(messages[index-1].sendTime, sendTime)) 
                            &&
                            <div className={style.Chat__daySplitter__wrapper}>
                                <div className={style.Chat__daySplitter}>
                                    {chatDateFormatter(sendTime)}
                                </div>
                            </div>
                        }
                        <Message 
                            userId={userId}
                            myId={myId}
                            nickname={targetNick}
                            text={message}
                            showName={!index || messages[index - 1].userId !== userId}
                            showTime={showTime(messages[index-1], messages[index], messages[index+1])}
                            time={chatTimeformatter(sendTime)}
                        />
                    </div>
                )
                              
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