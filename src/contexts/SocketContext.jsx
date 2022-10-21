import { useEffect, createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    let socket;
    
    useEffect(()=>{
        // socket = io(process.env.REACT_APP_SERVER_URL);
        socket = io("localhost:3001");
        console.log("socket connected");
        return () => {
            socket.disconnect();
            console.log("socket disconnected");
        }
    }, [])

    const getRoomList = ({roomId, userId}) => {
        console.log(socket);
        socket.emit('GET_ROOMS', {roomId, userId}); 
    }
    
    const joinRoom = ({roomId, userId, nickname}) => {
        console.log(socket);
        socket.emit('JOIN_ROOM', {roomId, userId, nickname}); 
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
        <SocketContext.Provider value={{joinRoom, sendMessage, updateMessage, getRoomList, updateRooms}}>
            {children}
        </SocketContext.Provider>
    );
}