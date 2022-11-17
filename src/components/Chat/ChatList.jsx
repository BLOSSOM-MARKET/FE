import { useState, useEffect, useRef, useContext } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Message from '../Message';
import ChatListStyle from './ChatList.module.scss';
import ChatStyle from './Chat.module.scss';

import moment from 'moment';
import { SocketContext } from '../../contexts/SocketContext';
import { UserContext } from '../../contexts/UserContext';
import { chatroomTimeformatter, chatTimeformatter } from '../../utils/formatters';
import { ChattingContext } from '../../contexts/ChattingContext';

const ChatList = ({chatrooms, moveToChatRoom, onClickChatroom}) => {
    const { isLogin, userId, nickname } = useContext(UserContext);
    const { yourNick} = useContext(ChattingContext);

    return (
        <Container maxWidth="sm" className={ChatStyle.Chat__wrapper}>
            {
            (isLogin && chatrooms.length > 0)
            ?
            <List className={ChatListStyle.Chatroom__list} > <div>
                    {chatrooms.map((rm, idx) => 
                        <div key={`chatroom-${idx}`} className={ChatListStyle.Chatroom}
                            onClick={() => onClickChatroom(
                                       { roomId : rm.roomId,
                                        yourId : userId === rm.user1 ? rm.user2 : rm.user1,
                                        myId : userId === rm.user1 ? rm.user1 : rm.user2,
                                        productId : rm.productId,
                                        productName: rm.productName,
                                        productImg: rm.productImg,
                                        myNick : nickname,
                                        yourNick : nickname === rm.name1 ? rm.name2 : rm.name1}
                                )}>
                            <div className={ChatListStyle.Chatroom__left}>
                                <div className={ChatListStyle.Chatroom__productImg__wrapper}>
                                    <img src={rm.productImg} alt="product_img" 
                                        className={ChatListStyle.Chatroom__productImg} />
                                </div>
                                <div>
                                    <div className={ChatListStyle.Chatroom__header}>
                                        <div className={ChatListStyle.Chatroom__nickname}>
                                            <div>{userId === rm.user1
                                                && rm.name2}</div>
                                            <div>{userId === rm.user2
                                                && rm.name1}</div>
                                        </div>
                                        <div className={ChatListStyle.Chatroom__productName}>
                                                {rm.productName}
                                        </div>
                                    </div>
                                    <div className={`${ChatStyle.Chat__msgbox} ${ChatListStyle.Chatroom__msgbox}`}>{rm.lastMsg}</div>
                                </div>
                            </div>
                            <div className={ChatListStyle.Chatroom__right}>
                                <div className={ChatStyle.Chat__time}>{chatroomTimeformatter(rm.lastSendTime)}</div>
                            </div>
                            
                        </div>)}
                </div>
            </List>
            : isLogin ? <div className={ChatStyle.Chat__info}>대화를 시작해보세요!</div>
            : <div className={ChatStyle.Chat__info}>로그인 후 이용해주세요</div>
            }
        </Container>
    )
}

export default ChatList;