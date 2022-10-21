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

const ChatList = ({chatrooms, moveToChatRoom}) => {
    console.log(chatrooms)
    const { joinRoom } = useContext(SocketContext);
    const { userId, roomId, setRoomId, nickname, setIsInChatroom } = useContext(UserContext);

    const onClickChatroom = (roomId) => {
        setIsInChatroom(true);
        console.log(roomId);
        setRoomId(roomId);
        // joinRoom({roomId, userId, nickname});
        moveToChatRoom(roomId);
    }


    return (
        <Container maxWidth="sm" className={ChatStyle.Chat__wrapper}>
            {
            chatrooms.length > 0
            ?
            <List className={ChatListStyle.Chatroom__list} > <div>
                    {chatrooms.map((rm, idx) => 
                        <div key={`chatroom-${idx}`} className={ChatListStyle.Chatroom}
                            onClick={() => onClickChatroom(rm.roomId)}>
                            <div className={ChatListStyle.Chatroom__header}>
                                <div>{userId === rm.user1
                                    && rm.user2}</div>
                                <div>{userId === rm.user2
                                    && rm.user1}</div>
                            </div>
                            <div className={ChatListStyle.Chatroom__body}>
                                <div>{rm.lastMsg}</div>
                                <div>{chatroomTimeformatter(rm.lastSendTime)}</div>
                            </div>
                            
                        </div>)}
                </div>
            </List>
            : <div>대화를 시작해보세요!</div>
            }
        </Container>
    )
}

export default ChatList;