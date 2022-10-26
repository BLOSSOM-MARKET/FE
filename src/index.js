import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatMain from './pages/chatmain';
import Chat from './pages/chat';
import { SocketContextProvider } from './contexts/SocketContext';
import { UserContextProvider } from './contexts/UserContext';
import Main from './pages/main';
import Header from './components/Header/Header';
import Login from './pages/login';

const App = () => {
    return (
      <BrowserRouter>
        <SocketContextProvider>
          <UserContextProvider>
            <Header />  {/* header & nav */}

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
            </Routes>

            <ChatMain /> {/* chatMain */} 
          </UserContextProvider>
        </SocketContextProvider>
      </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
