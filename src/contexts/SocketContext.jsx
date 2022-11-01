import { useEffect, createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { ChattingContext } from "./ChattingContext";

export const SocketContext = createContext();
export const SocketContextProvider = ({children}) => {
    
        const { isChatOpen, messages, setMessages } = useContext(ChattingContext);
        const socket = useMemo(() => {
            // console.log("memo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            return io("localhost:3001");
        }, [isChatOpen]);


    // if (isChatOpen) {
    //     socket = io("localhost:3001");
    //     console.log("socket connected");
    // }
    
    // useEffect(()=>{
    //     // socket = io(process.env.REACT_APP_SERVER_URL);
    //     if (!socket) {

    //         socket = io("localhost:3001");
    //     }
    //     return () => {
    //         disconnectSocket();
    //     }
    // }, [isChatOpen])

    // const addMessage = (message) => {
    //     console.log("addMESSAGEE:::", message.messageId, message);
    //     setMessages((prev) => prev.concat(message));
    //     if (!messages.some(m => m.messageId === message.messageId)) {
    //         // setMessages([message]);
    //     } else {
    //     }
    // }

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            console.log("socket disconnected");
        }
    }

    const getRoomList = ({roomId, userId}) => {
        console.log(socket);
        socket.emit('GET_ROOMS', {roomId, userId}); 
    }
    
    const joinRoom = ({roomId, yourId, myId, productId, nickname, yourNick}) => {
        console.log(socket);
        socket.emit('JOIN_ROOM', {roomId, yourId, myId, productId, nickname, yourNick}); 
    }
    
    const sendMessage = ({roomId, userId, nickname, message}) => {
        socket.emit('SEND_MESSAGE', {roomId, userId, nickname, message});
    }

    // useEffect(() => {
    //     console.log(">>>>>>>>>>>>>>>>>>MESSAGES CHANGE: ", messages)
    // }, [messages])
    
    const updateMessage = (func) => {
        console.log("UPDATE MESSAGE OUTER_____________")
        socket.on('UPDATE_MESSAGE', (msg) => {
            console.log("update message-----------------")
            setMessages((prev) => {
                console.log(">>>>>>prev: ", msg.msgIdx, prev)
                // return prev.concat(msg)
                return [...prev, msg]
            })
            // setMessages([msg])
        });
    }

    const updateRooms = (func) => {
        console.log("UPDATE ROOMS!!")
        socket.on('UPDATE_ROOMS', (room) => func(room));
    }
    
    return (
        <SocketContext.Provider value={{disconnectSocket, joinRoom, sendMessage, updateMessage, getRoomList, updateRooms }}>
            {children}
        </SocketContext.Provider>
    );
}