import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import ChatComp from '../components/Chat';
import ChatList from '../components/Chat/ChatList';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';

const Chat = () => {
    // const { roomId, userId } = useParams();
    const { joinRoom, sendMessage, updateMessage } = useContext(SocketContext);
    const {roomId, nickname, userId, isLogin, isChatOpen, setIsChatOpen} = useContext(UserContext);
    const [ messages, setMessages ] = useState([]);
    // const navigate = useNavigate();
    
    const addMessage = (message) => {
        console.log(message);
        setMessages((prev) => prev.concat(message));
    }
        
    useEffect(() => {
        try {
            console.log(userId, roomId, nickname);
            if (isLogin && isChatOpen && userId && roomId && nickname && messages.length <= 0) {
                joinRoom({roomId, userId, nickname});
                updateMessage(addMessage);
            }
        } catch (err) {
            toast.error("에러가 발생했습니다.");
            console.error(err);
        }
    }, [isLogin, isChatOpen]);
    
    const submitMessage = (message) => {
        if(message.trim()) {
            sendMessage({roomId, userId, nickname, message});
        } else {
            toast.error("메세지를 입력해주세요.")
        }
    }
    
    return (
        isChatOpen &&
        <ChatList/>
        // <ChatComp submitMessage={submitMessage} messages={messages} myId={userId}/>
    );
}

export default Chat;
