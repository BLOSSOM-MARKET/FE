import { useEffect, createContext, useState, useContext } from "react";
import io from "socket.io-client";
import { ChattingContext } from "./ChattingContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  let socket;

  const { setYourNick, setRoomId, setIsInChatroom, setIsChatOpen } = useContext(ChattingContext);

  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin"));
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("defaultUserId");

  useEffect(() => {
    const tmpNickName = sessionStorage.getItem("nickname");
    const tmpUserId = sessionStorage.getItem("userId");

    if (!isLogin && (tmpNickName || tmpUserId)) {
      sessionStorage.clear();
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

  console.log(isLogin, nickname, userId);

  return (
    <UserContext.Provider
      value={{
        Logout,
        nickname,
        setNickname,
        userId,
        setUserId,
        isLogin,
        setIsLogin
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
