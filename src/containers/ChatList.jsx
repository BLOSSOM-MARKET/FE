import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import ChatComp from '../components/Chat';
import ChatList from '../components/Chat/ChatList';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';

const Chat = () => {
    const { joinRoom, sendMessage, updateMessage, getRoomList, updateRooms } = useContext(SocketContext);
    const { roomId, nickname, userId, isLogin, isChatOpen, setIsChatOpen, isInChatroom, setIsInChatroom, setRoomId, yourNick, setYourNick} = useContext(UserContext);
    const [ messages, setMessages ] = useState([]);
    const [ chatrooms, setChatrooms ] = useState([]);
    
    const addMessage = (message) => {
        console.log(message);
        setMessages((prev) => prev.concat(message));
    }

    const addRoom = (room) => {
        console.log("room: ", room)
        setChatrooms((prev) => prev.concat(room));
    }

    const moveToChatRoom = (roomId) => {
        if (isLogin && isChatOpen && userId && roomId && nickname && messages.length <= 0) {
            joinRoom({roomId, userId, nickname});
            updateMessage(addMessage);
        }
    }

    const moveToChatList = () => {
        if (isLogin && isChatOpen && userId && nickname && chatrooms.length <= 0) {
            // joinRoom({roomId, userId, nickname});
            // updateMessage(addMessage);
            console.log("roomId: ", roomId)
            joinRoom({roomId, userId, nickname});
            getRoomList({roomId, userId});
            updateRooms(addRoom);
        }
    }

    const onClickChatroom = (roomId, yourNick) => {
        setIsInChatroom(true);
        console.log(roomId);
        setRoomId(roomId);
        setYourNick(yourNick);
        // joinRoom({roomId, userId, nickname});
        moveToChatRoom(roomId);
    }

    const onClickBackBtn = () => {
        setIsInChatroom(false);
    }

        
    useEffect(() => {
        console.log("isChatOpen, isInChatroom: ", isChatOpen, isInChatroom)
        try {
            console.log(userId,nickname);
            if (isInChatroom) {
                moveToChatRoom();
            } else {
                moveToChatList();
            }

        } catch (err) {
            toast.error("에러가 발생했습니다.");
            console.error(err);
        }
    }, [isLogin, isChatOpen, isInChatroom]);
    
    const submitMessage = (message) => {
        if(message.trim()) {
            sendMessage({roomId, userId, nickname, message});
        } else {
            toast.error("메세지를 입력해주세요.")
        }
        
    }
    
    return (
        isChatOpen &&
        (
            isInChatroom ?
            <ChatComp submitMessage={submitMessage} messages={messages} myId={userId} yourNick={yourNick} onClickBackBtn={onClickBackBtn} />
            :
            <ChatList chatrooms={chatrooms} moveToChatRoom={moveToChatRoom} onClickChatroom={onClickChatroom} />
        )
    );
}

export default Chat;
