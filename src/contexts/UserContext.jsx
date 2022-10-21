import { useEffect, createContext, useState } from "react";
import io from "socket.io-client";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    let socket;
        
    const [isLogin, setIsLogin] = useState(false);
    const [roomId, setRoomId] = useState('myRooms');
    const [nickname, setNickname] = useState('defaultNick');
    const [userId, setUserId] = useState('defaultUserId');

    const [isChatOpen, setIsChatOpen] = useState(true);
    const [isInChatroom, setIsInChatroom] = useState(false);
    
    useEffect(()=>{
        const tmproomId = sessionStorage.getItem('roomId');
        const tmpNickName = sessionStorage.getItem('nickname');
        const tmpUserId = sessionStorage.getItem('userId');

        if (tmproomId !== undefined && tmproomId !== null) {
            console.log("set room Id: ", roomId)
            setRoomId(tmproomId);
        }
        if (tmpNickName !== undefined && tmpNickName !== null) {
            setNickname(tmpNickName);
        }
        if (tmpUserId !== undefined && tmpUserId !== null) {
            setUserId(tmpUserId);
        }

        setIsLogin(true);

    }, []);

    console.log(isLogin, roomId, nickname, userId)
    
    return (
        <UserContext.Provider value={{roomId, setRoomId, nickname, userId, isLogin, isChatOpen, setIsChatOpen, isInChatroom, setIsInChatroom}}>
            {children}
        </UserContext.Provider>
    );
}