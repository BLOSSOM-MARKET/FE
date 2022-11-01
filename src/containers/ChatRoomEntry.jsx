import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import style from "./ChatRoomEntry.module.scss";
import Chat from "../pages/chat";
import { SocketContext } from "../contexts/SocketContext";
import { ChattingContext } from "../contexts/ChattingContext";

const ChatRoomEntry = () => {
    const { nickname, userId } = useContext(UserContext);
    const { roomId, isChatOpen, setIsChatOpen} = useContext(ChattingContext);
    const {disconnectSocket} = useContext(SocketContext);

    const [isBackdropOn, setIsBackdropOn] = useState(false);

    useEffect(() => {
        console.log("채팅열려있음: ",isChatOpen, roomId);
        if (!isChatOpen) {
            disconnectSocket();
        } else {
            setIsBackdropOn(true);
        }
    }, [isChatOpen])

    const toggleChatPop = () => {
        setIsChatOpen(prev => !prev);
    }
    
    return (
        <>
            <Chat isOpen={isChatOpen} toggleChatPop={toggleChatPop} />
            <button className={style.chatEnterBtn} onClick={toggleChatPop}>채팅</button>
            <div className={`${style.backdrop} ${isBackdropOn ? style.show : undefined}`}
                onClick={() => {
                    setIsBackdropOn(false);
                    setIsChatOpen(false);
                }}/>
        </>
    )
}

export default ChatRoomEntry;
