import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import ChatComp from '../components/Chat';
import ChatList from '../components/Chat/ChatList';
import { ChattingContext } from '../contexts/ChattingContext';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';

const Chat = () => {
    const { joinRoom, sendMessage, updateMessage, getRoomList, updateRooms, updateNewMessage } = useContext(SocketContext);
    const { nickname, userId, isLogin } = useContext(UserContext);
    const { roomId, isChatOpen, setIsChatOpen, isInChatroom, setIsInChatroom, setRoomId, 
            yourNick, setYourNick, setYourId, messages, setMessages, chatrooms, 
            setChatrooms, yourId, productId, productName, productImg, setProductId, setProductName, setProductImg } = useContext(ChattingContext);

    const myId = userId;
    
    const addMessage = (messages) => {
        console.log(messages);
        // setMessages((prev) => prev.concat(message));
        setMessages(messages);
    }

    const addNewMessage = (msg) => {
        setMessages((prev) => prev.concat(msg));
    }

    const addRoom = (room) => {
        console.log("add room:::", room)
        setChatrooms((prev) => prev.concat(room));
    }

    const moveToChatRoom = (prop) => {
        const {roomId, yourId, myId, productId, myNick, yourNick} = prop;
        if (isLogin && isChatOpen && yourId && myId && roomId && nickname) {
            joinRoom({roomId, yourId, myId, productId, nickname, yourNick});
            updateMessage(addMessage);
        }
    }

    const moveToChatList = () => {
        if (isLogin && isChatOpen && userId && nickname && chatrooms.length <= 0) {
            console.log("roomId: ", roomId)
            setMessages([]);
            joinRoom({roomId, yourId, myId, productId, nickname, yourNick});
            getRoomList({roomId, userId});
            updateRooms(addRoom);
        }
    }


    const onClickChatroom = (prop) => {
        const {roomId, yourId, myId, productId, myNick, yourNick, productName, productImg} = prop;
        setIsInChatroom(true);
        setRoomId(roomId);
        setYourId(yourId);
        setYourNick(yourNick);
        setProductId(productId);
        setProductName(productName);
        setProductImg(productImg);
    }

    const onClickBackBtn = (e) => {
        setIsInChatroom(false);
    }

        
    useEffect(() => {
        console.log("isChatOpen, isInChatroom: ", isChatOpen, isInChatroom)
        try {
            console.log(userId,nickname);
            setMessages([]);
            if (isInChatroom) {
                const myNick = nickname;
                moveToChatRoom({roomId, yourId, myId, productId, myNick, yourNick});
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
            updateNewMessage();
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
