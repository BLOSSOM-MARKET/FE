import { useEffect, createContext, useState } from "react";
import io from "socket.io-client";

export const ChattingContext = createContext();

export const ChattingContextProvider = ({ children }) => {
  let socket;

  const [roomId, setRoomId] = useState("myRooms");

  const [yourId, setYourId] = useState(null);
  const [yourNick, setYourNick] = useState(null);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInChatroom, setIsInChatroom] = useState(false);
  
  const [ messages, setMessages ] = useState([]);
  const [ chatrooms, setChatrooms ] = useState([]);

  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productImg, setProductImg] = useState(null);

  return (
    <ChattingContext.Provider
      value={{
        roomId, setRoomId,
        isChatOpen, setIsChatOpen,
        isInChatroom, setIsInChatroom,
        yourNick, setYourNick,
        messages, setMessages,
        chatrooms, setChatrooms,
        yourId, setYourId, 
        productId, setProductId, 
        productName, setProductName,
        productImg, setProductImg
      }}
    >
      {children}
    </ChattingContext.Provider>
  );
};
