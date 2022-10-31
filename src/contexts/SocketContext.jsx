import { useEffect, createContext, useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    let socket = io("localhost:3001");;
    const { isChatOpen } = useContext(UserContext);

    // if (isChatOpen) {
    //     socket = io("localhost:3001");
    //     console.log("socket connected");
    // }
    
    useEffect(()=>{
        // socket = io(process.env.REACT_APP_SERVER_URL);
        return () => {
            disconnectSocket();
        }
    }, [isChatOpen])

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
    
    const joinRoom = ({roomId, yourId, myId, productId, nickname}) => {
        console.log(socket);
        socket.emit('JOIN_ROOM', {roomId, yourId, myId, productId, nickname}); 
    }
    
    const sendMessage = ({roomId, userId, nickname, message}) => {
        socket.emit('SEND_MESSAGE', {roomId, userId, nickname, message});
    }
    
    const updateMessage = (func) => {
        socket.on('UPDATE_MESSAGE', (msg) => func(msg));
    }

    const updateRooms = (func) => {
        console.log("UPDATE ROOMS!!")
        socket.on('UPDATE_ROOMS', (room) => func(room));
    }
    
    return (
        <SocketContext.Provider value={{disconnectSocket, joinRoom, sendMessage, updateMessage, getRoomList, updateRooms}}>
            {children}
        </SocketContext.Provider>
    );
}