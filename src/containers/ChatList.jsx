import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import ChatComp from '../components/Chat';
import ChatList from '../components/Chat/ChatList';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';

const Chat = () => {
    const { roomId, joinRoom, sendMessage, updateMessage, getRoomList, updateRooms } = useContext(SocketContext);
    const {nickname, userId, isLogin, isChatOpen, setIsChatOpen} = useContext(UserContext);
    const [ messages, setMessages ] = useState([]);
    const [ chatrooms, setChatrooms ] = useState([]);
    
    const addMessage = (message) => {
        console.log(message);
        setMessages((prev) => prev.concat(message));
    }

    const addRoom = (room) => {
        setChatrooms((prev) => prev.concat(room));
    }
        
    useEffect(() => {
        try {
            console.log(userId,nickname);
            if (isLogin && isChatOpen && userId && nickname && messages.length <= 0) {
                // joinRoom({roomId, userId, nickname});
                // updateMessage(addMessage);
                getRoomList({roomId, userId});
                updateRooms(addRoom);
            }
        } catch (err) {
            toast.error("에러가 발생했습니다.");
            console.error(err);
        }
    }, [isLogin, isChatOpen]);
    
    // const submitMessage = (message) => {
    //     if(message.trim()) {
    //         sendMessage({roomId, userId, nickname, message});
    //     } else {
    //         toast.error("메세지를 입력해주세요.")
    //     }
        
    // }
    
    return (
        isChatOpen &&
        // <ChatComp submitMessage={submitMessage} messages={messages} myId={userId}/>
        <ChatList />
    );
}

export default Chat;
