import { useEffect, createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();
export const SocketContextProvider = ({children}) => {
    
    // if (!socket) {
        
        //     socket = io("localhost:3001");
        // }
        const { isChatOpen, setMessages } = useContext(UserContext);
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

    const addMessage = (message, roomId) => {
        console.log("addMESSAGEE:::", message);
        setMessages((prev) => {
            if (!(roomId in prev)) {
                prev[roomId] = [];
            }
            prev[roomId].concat(message)
        });
        // setMessages(message);
    }

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
    
    const updateMessage = (func, roomId) => {
        socket.on('UPDATE_MESSAGE', (msg) => func(msg, roomId));
    }

    const updateRooms = (func) => {
        console.log("UPDATE ROOMS!!")
        socket.on('UPDATE_ROOMS', (room) => func(room));
    }
    
    return (
        <SocketContext.Provider value={{disconnectSocket, joinRoom, sendMessage, updateMessage, getRoomList, updateRooms, addMessage}}>
            {children}
        </SocketContext.Provider>
    );
}