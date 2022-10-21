import React, { useState } from 'react';
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import style from './ChatRoomEntry.module.scss';

const ChatRoomEntry = ({enterChatRoom}) => {
    const [chatRoomId, setChatRoomId] = useState('');
    const [nickname, setNickname] = useState('');
    
    const isInvalidNickname = () => {
        const pattern = /^\S.{0,14}\S$/;
        const invalid = nickname.length > 16 || nickname.length < 2 || !pattern.test(nickname);
        
        return invalid;
    }
    
    const isInvalidChatRoomId = () => {
        const pattern = /^[A-Za-z0-9]*$/;
        const invalid = chatRoomId.length > 16 || chatRoomId.length < 2 || !pattern.test(chatRoomId);
        
        return invalid;
    }
    
    const onChangeChatRoomId = (e) => {
        const input = e.currentTarget.value;
        setChatRoomId(input);
    }
    
    const onChangeNickname = (e) => {
        const input = e.currentTarget.value;
        setNickname(input);
    }
    
    const onClick = () => {
        if (isInvalidNickname()) {
            toast.error("닉네임은 앞뒤 공백 없는 2~16글자만 가능합니다.");
            return;
        }
        
        if (isInvalidChatRoomId()) {
            toast.error("채팅방 아이디는 알파벳, 숫자로만 이루어진 2~16글자 문자입니다.");
            return;
        }  
        enterChatRoom({nickname, chatRoomId});
    }
    
    return (
        <Stack className={style.ChatRoomEntry} alignItems="center" spacing={2}>
            <div className={style.ChatRoomEntry__title}>GOORMEE TALK</div>
            <TextField label="CHAT ROOM ID" variant="outlined" value={chatRoomId} onChange={onChangeChatRoomId}/>
            <TextField label="NICKNAME" variant="outlined" value={nickname} onChange={onChangeNickname}/>
            <Button onClick={onClick} size="large">Enter!</Button>
        </Stack>
    );
    
}

export default ChatRoomEntry;