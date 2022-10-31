import { useEffect, createContext, useState } from "react";
import io from "socket.io-client";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  let socket;

  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin"));
  const [roomId, setRoomId] = useState("myRooms");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("defaultUserId");

  const [yourId, setYourId] = useState(null);
  const [yourNick, setYourNick] = useState(null);
  const [productId, setProductId] = useState(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInChatroom, setIsInChatroom] = useState(false);

  const [ messages, setMessages ] = useState({});
  const [ chatrooms, setChatrooms ] = useState([]);

  useEffect(() => {
    const tmproomId = sessionStorage.getItem("roomId");
    const tmpNickName = sessionStorage.getItem("nickname");
    const tmpUserId = sessionStorage.getItem("userId");

    if (!isLogin && (tmproomId || tmpNickName || tmpUserId)) {
      sessionStorage.clear();
    }

    if (tmproomId !== undefined && tmproomId !== null) {
      console.log("set room Id: ", roomId);
      setRoomId(tmproomId);
    }
    if (tmpNickName !== undefined && tmpNickName !== null) {
      setNickname(tmpNickName);
    }
    if (tmpUserId !== undefined && tmpUserId !== null) {
      setUserId(tmpUserId);
    }

    console.log("isLogin:", isLogin);
    // setIsLogin(false);
  }, []);

  const Logout = () => {
    console.log("usercontext logout");
    setIsLogin(false);
    setNickname("");
    setUserId("defaultUserId");
    setYourNick(null);
    setRoomId("myRooms");
    setIsChatOpen(false);
    setIsInChatroom(false);
    sessionStorage.clear();
  };

  console.log(isLogin, roomId, nickname, userId);

  return (
    <UserContext.Provider
      value={{
        Logout,
        roomId,
        setRoomId,
        nickname,
        setNickname,
        userId,
        setUserId,
        isLogin,
        setIsLogin,
        isChatOpen,
        setIsChatOpen,
        isInChatroom,
        setIsInChatroom,
        yourNick,
        setYourNick,
        messages, 
        setMessages,
        chatrooms, 
        setChatrooms,
        yourId, 
        setYourId, 
        productId,
        setProductId, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
