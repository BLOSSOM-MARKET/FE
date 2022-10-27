import { useNavigate } from "react-router-dom";

import ChatRoomEntryComp from '../components/ChatRoomEntry';

import Button from '@mui/material/Button';
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import style from "./ChatRoomEntry.module.scss";
import Chat from "../pages/chat";
import { SocketContext } from "../contexts/SocketContext";

const ChatRoomEntry = () => {
    // const navigate = useNavigate();
    const {chatRoomId, nickname, userId, isChatOpen, setIsChatOpen} = useContext(UserContext);
    const {disconnectSocket} = useContext(SocketContext);

    // const enterChatRoom = () => {
    //     console.log("enter ChatRoom: ", nickname, chatRoomId);
    //     // navigate(`/chatroom/${chatRoomId}/${nickname}`)
    //     toggleChatPop();
    // }

    useEffect(() => {
        console.log("채팅닫혀있음: ",isChatOpen)
        if (!isChatOpen) {
            disconnectSocket();
        }
    }, [isChatOpen])

    const toggleChatPop = () => {
        console.log("enter ChatRoom: ", nickname, chatRoomId);
        setIsChatOpen(prev => !prev);
    }
    
    // return <ChatRoomEntryComp enterChatRoom={enterChatRoom} />
    return (
        <>
            <Chat isOpen={isChatOpen} toggleChatPop={toggleChatPop} />
            <button className={style.chatEnterBtn} onClick={toggleChatPop}>채팅</button>
        </>
    )
}

export default ChatRoomEntry;
