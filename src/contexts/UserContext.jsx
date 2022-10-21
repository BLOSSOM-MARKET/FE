import { useEffect, createContext, useState } from "react";
import io from "socket.io-client";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    let socket;
    
    useEffect(()=>{
        const tmproomId = sessionStorage.getItem('roomId');
        const tmpNickName = sessionStorage.getItem('nickname');
        const tmpUserId = sessionStorage.getItem('userId');

        if (tmproomId) {
            setRoomId(tmproomId);
        }
        if (tmpNickName) {
            setNickname(tmpNickName);
        }
        if (tmpUserId) {
            setUserId(tmpUserId);
        }

        setIsLogin(true);

    }, []);
    
    const [isLogin, setIsLogin] = useState(false);
    const [roomId, setRoomId] = useState('myRooms');
    const [nickname, setNickname] = useState('defaultNick');
    const [userId, setUserId] = useState('defaultUserId');

    const [isChatOpen, setIsChatOpen] = useState(true);
    console.log(isLogin, roomId, nickname, userId)
    
    return (
        <UserContext.Provider value={{roomId, nickname, userId, isLogin, isChatOpen, setIsChatOpen}}>
            {children}
        </UserContext.Provider>
    );
}