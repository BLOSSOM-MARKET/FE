import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import ChatMain from "./pages/chatmain";
import Chat from "./pages/chat";
import { SocketContextProvider } from "./contexts/SocketContext";
import { UserContextProvider } from "./contexts/UserContext";
import Main from "./pages/main";
import Header from "./components/Header/Header";
import Login from "./pages/login";
import Settings from "./pages/settings";
import ItemDetail from "./pages/itemDetail";
import PostItem from "./pages/postItem";
import Search from "./pages/search";
import MyPage from "./pages/mypage";
import MyPageItems from "./pages/myPageItems";
import Uploadpage from './pages/upload';
import SignUp from "./pages/signUp";
import Footer from "./components/Footer/Footer2";
import { ChattingContextProvider } from "./contexts/ChattingContext";

const App = () => {
  return (
    <BrowserRouter>
      <ChattingContextProvider>
        <UserContextProvider>
          <SocketContextProvider>
            <Header /> {/* header & nav */}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/item/new" element={<Uploadpage />} />
              <Route path="/item/modify" element={<Uploadpage />} />
              <Route path="/item/:itemId" element={<ItemDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/:itemPage" element={<MyPageItems />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <ChatMain /> {/* chatMain */}
            <Footer />
          </SocketContextProvider>
        </UserContextProvider>
      </ChattingContextProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
