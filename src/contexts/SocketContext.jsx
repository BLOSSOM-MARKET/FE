import { useEffect, createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { ChattingContext } from "./ChattingContext";

export const SocketContext = createContext();
export const SocketContextProvider = ({children}) => {
    
        const { isChatOpen, messages, setMessages } = useContext(ChattingContext);
        const socket = useMemo(() => {
            return io("localhost:3001");
        }, [isChatOpen]);

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            // console.log("socket disconnected");
        }
    }

    const getRoomList = ({roomId, userId}) => {
        socket.emit('GET_ROOMS', {roomId, userId}); 
    }
    
    const joinRoom = ({roomId, yourId, myId, productId, nickname, yourNick}) => {
        socket.emit('JOIN_ROOM', {roomId, yourId, myId, productId, nickname, yourNick}); 
    }
    
    const sendMessage = ({roomId, userId, nickname, message}) => {
        socket.emit('SEND_MESSAGE', {roomId, userId, nickname, message});
    }

    const updateMessage = (func) => {
        socket.on('UPDATE_MESSAGE', (msgs) => func(msgs));
    }

    const updateNewMessage = () => {
        socket.on('UPDATE_NEW_MESSAGE', (msg) => setMessages(prev => {
            if (prev.some(item => item.sendTime === msg.sendTime)) {
                return prev
            } else return [...prev, msg]
        }));
    }

    const updateRooms = (func) => {
        socket.on('UPDATE_ROOMS', (room) => func(room));
    }
    
    return (
        <SocketContext.Provider value={{disconnectSocket, joinRoom, sendMessage, updateMessage, getRoomList, updateRooms, updateNewMessage }}>
            {children}
        </SocketContext.Provider>
    );
}