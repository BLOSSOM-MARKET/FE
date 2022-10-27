import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatMain from './pages/chatmain';
import Chat from './pages/chat';
import { SocketContextProvider } from './contexts/SocketContext';
import { UserContextProvider } from './contexts/UserContext';
import Main from './pages/main';
import Header from './components/Header/Header';
import Login from './pages/login';
import Settings from './pages/settings';
import ItemDetail from './pages/itemDetail';
import Search from './pages/search';

const App = () => {
    return (
      <BrowserRouter>
          <UserContextProvider>
        <SocketContextProvider>
            <Header />  {/* header & nav */}

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/item/:itemId" element={<ItemDetail />} />
              <Route path="/search" element={<Search />} />
            </Routes>

            <ChatMain /> {/* chatMain */} 
        </SocketContextProvider>
          </UserContextProvider>
      </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
